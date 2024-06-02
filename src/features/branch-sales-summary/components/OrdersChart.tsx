import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BranchSalesDetails } from '../interfaces/BranchSaleDetails';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  salesData: BranchSalesDetails[];
}

function OrdersChart({ salesData }: Props) {
  const labels = salesData.map((data) => data.date);
  const orders = salesData.map((data) => data.orders);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        data: orders,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='max-h-[250px]'>
      <h2>Orders Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default OrdersChart;
