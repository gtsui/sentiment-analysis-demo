import {
  Credentials,
  Trade,
  MarketImpactArray,
  MarketImpactPoint,
  SingleTradeMarketImpact,
} from "./types";
import { getHistoricalMarketData, getTradeHistory } from "./adapter";

export const aggregateImpacts = (
  impactsArray: SingleTradeMarketImpact[],
  intervalMinutes: number
) => {
  let aggregatedMarketImpact = _calculateAggregatedMarketImpact(
    impactsArray.map((x) => x.impact),
    intervalMinutes
  );
  return aggregatedMarketImpact;
};

export const getAllTradeMarketImpacts = async (
  credentials: Credentials,
  intervalMinutes: number,
  range: number
) => {
  let trades = await getTradeHistory(credentials);
  const promises = trades.map((t) =>
    getSingleTradeMarketImpact(credentials, t, intervalMinutes, range)
  );
  const impactsArray = await Promise.all(promises);
  return impactsArray;
};

export const getSingleTradeMarketImpact = async (
  credentials: Credentials,
  trade: Trade,
  intervalMinutes: number,
  range: number
) => {
  if (range % 2 !== 0) {
    throw "Error: Range must be even";
  }
  let px = trade.px;
  let ts = trade.ts;
  let side = trade.side;
  let startTimeMillis =
    ts - (intervalMinutes * 60_000 * range) / 2 - intervalMinutes * 60_000;
  let endTimeMillis = ts + (intervalMinutes * 60_000 * range) / 2;
  let historicalMarketData = await getHistoricalMarketData(
    credentials,
    trade.symbol,
    startTimeMillis,
    endTimeMillis,
    intervalMinutes
  );
  let impacts: MarketImpactPoint[] = historicalMarketData.map((d) => {
    let impact =
      side === "Long" || side === "CloseShort"
        ? _getReturn(px, d.mark)
        : _getReturn(d.mark, px);
    return {
      ts: d.ts,
      impact,
    };
  });
  // Extend the data points if necessary
  let emptyElements = range - impacts.length;
  if (emptyElements > 0) {
    let lastTs = impacts[impacts.length - 1].ts;
    for (let i = 0; i < emptyElements; i++) {
      lastTs += intervalMinutes * 60_000;
      impacts.push({ ts: lastTs, impact: undefined });
    }
  }
  let impact: SingleTradeMarketImpact = {
    ts,
    symbol: trade.symbol,
    side,
    execPx: px,
    impact: impacts,
  };
  return impact;
};

const _calculateAggregatedMarketImpact = (
  impactsList: MarketImpactArray[],
  intervalMinutes: number
) => {
  try {
    const n = impactsList[0].length;
    const sums: number[] = new Array(n).fill(0);
    const counts: number[] = new Array(n).fill(0);
    // Iterate over each subarray
    for (const subarray of impactsList) {
      // Iterate over each element of the subarray
      for (let i = 0; i < subarray.length; i++) {
        const impactValue = subarray[i].impact;
        if (impactValue !== undefined) {
          sums[i] += impactValue;
          counts[i]++;
        }
      }
    }
    // Calculate averages, handling division by zero
    let aggregatedImpacts: MarketImpactArray = sums.map((sum, index) => {
      const impact = counts[index] > 0 ? sum / counts[index] : undefined;
      const ts = intervalMinutes * (-(n - 1) / 2 + index);
      return { ts, impact, count: counts[index] };
    });
    return aggregatedImpacts;
  } catch (e) {
    return [];
  }
};

const _getReturn = (px: number, mark: number) => {
  return (mark - px) / px;
};
