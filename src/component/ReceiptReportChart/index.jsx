import { Row } from "antd";
import THEME from "../../constant/theme.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useReceiptCounting } from "../../api/MealController/index.jsx";
import LoadingIndicator from "../LoadingIndicator/index.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Tarif Raporları",
    },
  },
};

const ReceiptReportChart = () => {
  const { data: receiptCounts, isFetching } = useReceiptCounting();

  const labels = receiptCounts ? Object.keys(receiptCounts?.data) : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Adet",
        data: receiptCounts ? Object.values(receiptCounts.data) : [],
        backgroundColor: THEME.Primary,
      },
    ],
  };

  return (
    <Row style={{ width: "100%" }}>
      <LoadingIndicator visible={isFetching} />

      <Bar data={data} options={options} />
    </Row>
  );
};

export default ReceiptReportChart;
