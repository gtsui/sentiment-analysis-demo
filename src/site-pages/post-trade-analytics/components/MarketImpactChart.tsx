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

type Props = {
  xData: number[];
  yData: number[];
  label: string;
};

const MarketImpactChart = ({ xData, yData, label }: Props) => {
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
        type: "line",
        label: "",
        data: yData,
        fill: false,
        borderColor: "green",
        borderWidth: 2,
        tension: 0.1,
        pointRadius: 0,
      },
      {
        type: "line",
        label: "",
        data: Array(yData.length).fill(0),
        fill: false,
        borderColor: "red",
        borderWidth: 1,
        tension: 0.1,
        pointRadius: 0,
        borderDash: [5, 5],
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

export default MarketImpactChart;
