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
    <div className='w-full h-full'>
      <h3 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
        <span className='w-1 h-6 bg-pink-500 rounded'></span>
        Sales Analytics
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
};

export default SalesChart;
