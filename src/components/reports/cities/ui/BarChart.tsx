// components/reports/ui/BarChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const legendMargin = {
  id: "legendMargin",
  beforeInit(chart: ChartJS) {
    if (!chart.legend) return;
    const legend = chart.legend;
    const originalFit = legend.fit;
    legend.fit = function () {
      originalFit.bind(this)();
      this.height += 20;
    };
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  legendMargin
);

interface BarChartProps {
  labels: string[];
  requestData: number[];
  inquiryData: number[];
}

export const BarChart: React.FC<BarChartProps> = ({
  labels,
  requestData,
  inquiryData,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "طالبات",
        data: inquiryData,
        backgroundColor: "rgb(85.88% 70.59% 34.9%)",
      },
      {
        label: "طلاب",
        data: requestData,
        backgroundColor: "rgb(21.96% 43.53% 56.47%)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        align: "start" as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (value: number | string) => `${value}%`,
        },
      },
    },
  };

  return (
    <Bar
      className="mt-6 border border-primary-500 bg-[#FAF7F2] rounded-lg font-semibold border-secondary"
      data={data}
      options={options}
    />
  );
};
