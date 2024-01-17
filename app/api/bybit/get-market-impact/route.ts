import { NextRequest, NextResponse } from "next/server";
import { Credentials, Venue } from "@/src/lib/market-impact/types";
import {
  getAggregatedMarketImpact,
  getAllTradeMarketImpacts,
} from "@/src/lib/market-impact/impacts";

export const POST = async (req: NextRequest) => {
  try {
    const { apiKey, apiSecret } = await req.json();
    let credentials: Credentials = {
      venue: Venue.BYBIT,
      apiKey: apiKey,
      apiSecret: apiSecret,
    };
    const impactsArray = await getAllTradeMarketImpacts(credentials, 240, 60);
    const aggregatedMarketImpact = await getAggregatedMarketImpact(
      impactsArray,
      240
    );
    return NextResponse.json(aggregatedMarketImpact);
  } catch (e) {
    return NextResponse.json([]);
  }
};
