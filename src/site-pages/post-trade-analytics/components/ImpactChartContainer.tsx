import { MarketImpactArray } from "@/src/lib/market-impact/types";
import MarketImpactChart from "./MarketImpactChart";

type Props = {
  title: string;
  yLabel: string;
  marketImpactArray: MarketImpactArray;
};

const ImpactChartContainer = ({ title, yLabel, marketImpactArray }: Props) => {
  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const getTimescale = (mia: MarketImpactArray) => {
    if (mia.length === 0) {
      return { scaleFactor: 1, xLabel: "Time  " };
    }
    let maxRange = mia[mia.length - 1].ts;
    if (maxRange < 360) {
      return { scaleFactor: 1, xLabel: "Time (minutes)" };
    } else if (maxRange < 4320) {
      return { scaleFactor: 60, xLabel: "Time (hours)" };
    } else {
      return { scaleFactor: 1440, xLabel: "Time (days)" };
    }
  };
  const timeScale = getTimescale(marketImpactArray);

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="flex flex-col w-[90vw] max-w-[500px] place-self-center gap-2">
      <h4 className="text-h5 text-primary-500 place-self-center">{title}</h4>
      <MarketImpactChart
        xData={marketImpactArray.map((x) => x.ts / timeScale.scaleFactor)}
        yData={marketImpactArray.map((x) => x.impact ?? 0)}
        xLabel={timeScale.xLabel}
        yLabel={yLabel}
      />
    </div>
  );
};

export default ImpactChartContainer;
