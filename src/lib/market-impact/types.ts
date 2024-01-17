export enum Venue {
  BYBIT = "BYBIT",
}

export type Side = "Long" | "Short" | "CloseLong" | "CloseShort";

export type Credentials = {
  venue: Venue;
  apiKey: string;
  apiSecret: string;
};

export type Trade = {
  ts: number;
  symbol: string;
  side: Side;
  px: number;
  qty: number;
};

export type MarketImpactPoint = {
  ts: number;
  impact: number | undefined;
  count?: number;
};

export type MarketImpactArray = MarketImpactPoint[];

export type SingleTradeMarketImpact = {
  ts: number;
  symbol: string;
  side: Side;
  execPx: number;
  impacts: MarketImpactArray;
};

export type MarketDataPoint = {
  ts: number;
  mark: number;
};
