import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type Props = {
  xData: string[];
  yData: number[];
  label: string;
};

const TimeSeriesChart = ({ xData, yData, label }: Props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const chartData = {
    labels: xData,
    datasets: [
      {
        label: label,
        data: yData,
        backgroundColor: "rgba(157, 212, 79, 0.3)",
        borderColor: "rgba(157, 212, 79, 1)",
        borderWidth: 1,
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
    plugins: {
      legend: {
        color: "#ffffff",
        display: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TimeSeriesChart;
