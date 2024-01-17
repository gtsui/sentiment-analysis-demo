import {
  getBybitClient,
  getHistoricalMarketData as getHistoricalMarketDataBybit,
  getTradeHistory as getTradeHistoryBybit,
} from "../bybit/bybit";
import { Credentials, Venue } from "./types";

export const getTradeHistory = async (credentials: Credentials) => {
  if (credentials.venue === Venue.BYBIT) {
    const client = getBybitClient(credentials);
    const tradeHistory = await getTradeHistoryBybit(client);
    return tradeHistory;
  } else {
    throw "Unsupported venue";
  }
};

export const getHistoricalMarketData = async (
  credentials: Credentials,
  symbol: string,
  startTimeMillis: number,
  endTimeMillis: number,
  intervalMinutes: number
) => {
  if (credentials.venue === Venue.BYBIT) {
    const client = getBybitClient(credentials);
    const historicalData = await getHistoricalMarketDataBybit(
      client,
      symbol,
      startTimeMillis,
      endTimeMillis,
      intervalMinutes
    );
    return historicalData;
  } else {
    throw "Unsupported venue";
  }
};
