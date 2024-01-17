"use client";

import { CardDark0 } from "@/src/components/common/card/Cards";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Loading } from "@/src/components/common/loading/Loading";
import {
  MarketImpactArray,
  SingleTradeMarketImpact,
} from "@/src/lib/market-impact/types";
import MarketImpactChart from "./components/MarketImpactChart";
import HeaderText from "./components/HeaderText";
import { aggregateImpacts } from "@/src/lib/market-impact/impacts";
import ImpactChartContainer from "./components/ImpactChartContainer";

const PostTradeAnalytics = () => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rawImpacts, setRawImpacts] = useState<SingleTradeMarketImpact[]>([]);

  const overallImpact = aggregateImpacts(rawImpacts, 240);
  const longOnlyImpact = aggregateImpacts(
    rawImpacts.filter((i) => i.side === "Long"),
    240
  );
  const shortOnlyImpact = aggregateImpacts(
    rawImpacts.filter((i) => i.side === "Short"),
    240
  );
  const closeOnlyImpact = aggregateImpacts(
    rawImpacts.filter((i) => i.side === "CloseLong" || i.side === "CloseShort"),
    240
  );

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const fetchMarketImpact = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/bybit/get-market-impact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey, apiSecret }),
    });
    const data = (await res.json()) as SingleTradeMarketImpact[];
    setRawImpacts(data);
    setIsLoading(false);
    return data;
  };

  const inputHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="flex flex-col items-center">
      <CardDark0 className="flex flex-col w-[95vw] max-w-screen-xl gap-2 p-6 mt-20">
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

          <div className="grid lg:grid-cols-2 gap-y-10">
            <ImpactChartContainer
              title="Overall Market Impact"
              marketImpactArray={overallImpact}
              yLabel="PnL (%)"
            />
            <ImpactChartContainer
              title="Long Only Market Impact"
              marketImpactArray={longOnlyImpact}
              yLabel="PnL (%)"
            />
            <ImpactChartContainer
              title="Short Only Market Impact"
              marketImpactArray={shortOnlyImpact}
              yLabel="PnL (%)"
            />
            <ImpactChartContainer
              title="Close Only Market Impact"
              marketImpactArray={closeOnlyImpact}
              yLabel="PnL (%)"
            />
          </div>
        </div>
      </CardDark0>
    </div>
  );
};

export default PostTradeAnalytics;
