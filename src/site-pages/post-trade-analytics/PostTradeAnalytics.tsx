"use client";

import { CardDark0 } from "@/src/components/common/card/Cards";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Loading } from "@/src/components/common/loading/Loading";
import { MarketImpactArray } from "@/src/lib/market-impact/types";
import MarketImpactChart from "./components/MarketImpactChart";
import HeaderText from "./components/HeaderText";

const PostTradeAnalytics = () => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [marketImpact, setMarketImpact] = useState<MarketImpactArray>([]);

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const inputHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const fetchMarketImpact = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/bybit/get-market-impact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey, apiSecret }),
    });

    // Parse the response body as JSON
    const data = (await res.json()) as MarketImpactArray;
    setMarketImpact(data);
    setIsLoading(false);
    return data;
  };

  return (
    <div className="flex flex-col items-center">
      <CardDark0 className="flex flex-col w-[95vw] max-w-screen-lg gap-2 p-6 mt-20">
        <HeaderText />
        <div className="flex flex-col gap-2">
          <input
            className="bg-neutral-700 h-10 px-5 pr-10 w-full max-w-[300px] rounded-md text-contrast-high
         placeholder-contrast-low focus:outline-none focus:border focus:border-primary-500"
            placeholder="ByBit API Key (Read-Only)"
            value={apiKey}
            onChange={(e) => inputHandler(e, setApiKey)}
          />
          <input
            className="bg-neutral-700 h-10 px-5 pr-10 w-full max-w-[300px] rounded-md text-contrast-high
         placeholder-contrast-low focus:outline-none focus:border focus:border-primary-500"
            placeholder="ByBit API Secret (Read-Only)"
            value={apiSecret}
            onChange={(e) => inputHandler(e, setApiSecret)}
          />
          <div className="flex flex-row items-center gap-2 mb-10">
            <button
              onClick={fetchMarketImpact}
              className="btn-md btn-primary w-full max-w-[200px]"
            >
              Analyze Trades
            </button>
            {isLoading && <Loading size={24} />}
          </div>
          <div className="flex flex-col w-[90vw] max-w-[800px] place-self-center gap-2">
            <h4 className="text-h4 text-primary-500 place-self-center">
              Post-Trade Market Impact
            </h4>
            <MarketImpactChart
              xData={marketImpact.map((i) => i.ts)}
              yData={marketImpact.map((i) => i.impact ?? 0)}
              label="Impact"
            />
          </div>
        </div>
      </CardDark0>
    </div>
  );
};

export default PostTradeAnalytics;
