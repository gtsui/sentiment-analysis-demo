import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  LineController,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { maFilter } from "@/src/lib/data-analysis/dataAnalysis";

type Props = {
  xData: string[];
  yData: number[];
  label: string;
};

const TimeSeriesChart = ({ xData, yData, label }: Props) => {
  ChartJS.register(
    BarElement,
    BarController,
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
  );

  const chartData = {
    labels: xData,
    datasets: [
      {
        type: "bar",
        label: label,
        data: yData,
        backgroundColor: "rgba(157, 212, 79, 0.3)",
        borderColor: "rgba(157, 212, 79, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "",
        data: maFilter(yData, 5),
        fill: false,
        borderColor: "red",
        borderWidth: 1,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          color: "#ffffff",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
      },
    },
    responsive: true,
  };

  return <Chart type="bar" data={chartData as any} options={options} />;
};

export default TimeSeriesChart;
