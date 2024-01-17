import { OrderSideV5, RestClientV5, ExecutionV5 } from "bybit-api";
import { KlineIntervalV3 } from "bybit-api";
import {
  Credentials,
  MarketDataPoint,
  Side,
  Trade,
} from "../market-impact/types";

export const getBybitClient = (credentials: Credentials) => {
  const client = new RestClientV5({
    key: credentials.apiKey,
    secret: credentials.apiSecret,
  });
  return client;
};

export const getTradeHistory = async (client: RestClientV5) => {
  let executionList = await client.getExecutionList({
    category: "linear",
  });
  let res: Trade[] = executionList.result.list
    .filter((r) => r.execType === "Trade")
    .map((r) => {
      return {
        ts: Number(r.execTime),
        symbol: r.symbol,
        side: _getSide(r.side, r.closedSize),
        px: Number(r.execPrice),
        qty: Number(r.execQty),
      };
    });
  return res;
};

export const getHistoricalMarketData = async (
  client: RestClientV5,
  symbol: string,
  startTimeMillis: number,
  endTimeMillis: number,
  intervalMinutes: number
) => {
  let marketData = await client.getKline({
    category: "linear",
    symbol,
    interval: _minutesToKlineInterval(intervalMinutes),
    start: startTimeMillis,
    end: endTimeMillis,
  });
  let data: MarketDataPoint[] = marketData.result.list
    .map((d) => {
      return {
        ts: Number(d[0]),
        mark: Number(d[4]),
      };
    })
    .reverse();
  return data;
};

const _getSide = (
  bybitSide: OrderSideV5,
  closedSize: string | undefined
): Side => {
  if (bybitSide === "Buy") {
    if (closedSize && Number(closedSize) > 0) {
      return "CloseShort";
    } else {
      return "Long";
    }
  } else {
    if (closedSize && Number(closedSize) > 0) {
      return "CloseLong";
    } else {
      return "Short";
    }
  }
};

const _klineIntervalToMinutes = (interval: KlineIntervalV3) => {
  let intervalInMinutes = parseInt(interval);
  if (!Number.isNaN(intervalInMinutes)) {
    return intervalInMinutes;
  } else if (interval === "D") {
    return 60 * 24;
  } else if (interval === "M") {
    return 60 * 24 * 30;
  } else if (interval === "W") {
    return 60 * 24 * 7;
  } else {
    return 0;
  }
};

const _minutesToKlineInterval = (intervalMillis: number): KlineIntervalV3 => {
  try {
    if (intervalMillis === 60 * 24) {
      return "D";
    } else if (intervalMillis === 60 * 24 * 7) {
      return "W";
    } else if (intervalMillis === 60 * 24 * 30) {
      return "M";
    } else {
      return intervalMillis.toString() as KlineIntervalV3;
    }
  } catch {
    throw "Invalid interval";
  }
};

/*
const main = async () => {
  const client = getBybitClient();
  const tradeHistory = await getTradeHistory(client);
  const aggregatedImpacts = await getAggregatedMarketImpact(
    client,
    tradeHistory,
    1800000,
    RANGE
  );
};

(() => main())();
*/

/*
 {
    symbol: 'INJUSDT',
    orderType: 'Market',
    underlyingPrice: '',
    orderLinkId: '',
    orderId: '9b8e8bc5-b6c9-4727-b213-6a4cab05176c',
    stopOrderType: 'UNKNOWN',
    execTime: '1704910926116',
    feeCurrency: '',
    createType: 'CreateByUser',
    feeRate: '0.0004',
    tradeIv: '',
    blockTradeId: '',
    markPrice: '39.4515',
    execPrice: '39.4575',
    markIv: '',
    orderQty: '25',
    orderPrice: '41.429',
    execValue: '201.23325',
    closedSize: '0',
    execType: 'Trade',
    seq: 66379348926,
    side: 'Buy',
    indexPrice: '',
    leavesQty: '8.1',
    isMaker: false,
    execFee: '0.0804933',
    execId: '2ad18b16-16d6-59db-bb2d-f451ef258b98',
    marketUnit: '',
    execQty: '5.1'
  }
*/
