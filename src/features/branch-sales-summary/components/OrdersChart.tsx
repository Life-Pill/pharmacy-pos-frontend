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

function OrdersChart({ salesData }: Props) {
  const labels = salesData.map((data) => data.date);
  const orders = salesData.map((data) => data.orders);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Orders',
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
    <div className='w-full h-full'>
      <h3 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
        <span className='w-1 h-6 bg-teal-500 rounded'></span>
        Orders Analytics
      </h3>
      <div className='w-full' style={{ height: '400px' }}>
        <Bar 
          data={data} 
          options={{
            ...options,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top' as const,
              },
            },
          }} 
        />
      </div>
    </div>
  );
}

export default OrdersChart;
