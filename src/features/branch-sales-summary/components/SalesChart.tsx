import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BranchSalesDetails } from '../interfaces/BranchSaleDetails';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  salesData: BranchSalesDetails[];
}

const SalesChart: React.FC<Props> = ({ salesData }) => {
  const labels = salesData.map((data) => data.date);
  const sales = salesData.map((data) => data.sales);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        data: sales,
        backgroundColor: 'rgba(255, 192, 203, 0.2)', // Pink background color
        borderColor: 'rgba(255, 192, 203, 1)', // Pink border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className=' pb-8'>
      <h2>Sales Chart</h2>
      <Bar data={data} options={options} width={1200} height={500} />
    </div>
  );
};

export default SalesChart;
