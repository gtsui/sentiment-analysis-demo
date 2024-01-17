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
  xLabel: string;
  yLabel: string;
};

const MarketImpactChart = ({ xData, yData, xLabel, yLabel }: Props) => {
  const verticalLinePlugin = {
    id: "verticalLinePlugin",
    afterDraw: (chart: any) => {
      if (chart.scales.x) {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x;
        const yPos = xAxis.getPixelForValue(0);
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(yPos, chart.chartArea.top);
        ctx.lineTo(yPos, chart.chartArea.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red"; // or any color you want
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  ChartJS.register(
    BarElement,
    BarController,
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    verticalLinePlugin
  );

  const chartData = {
    labels: xData,
    datasets: [
      {
        type: "line",
        label: "",
        data: yData.map((y) => (y === 0 ? undefined : y)),
        fill: false,
        borderColor: "#9dd44f",
        borderWidth: 1,
        tension: 0.5,
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
        type: "linear",
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          color: "#ffffff",
        },
        title: {
          display: true,
          text: xLabel,
          color: "#ffffff",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
          callback: (v: any) => {
            return (v * 100).toFixed(1) + "%";
          },
        },
        title: {
          display: true,
          text: yLabel,
          color: "#ffffff",
        },
      },
    },
    responsive: true,
  };

  return <Chart type="bar" data={chartData as any} options={options as any} />;
};

export default MarketImpactChart;
