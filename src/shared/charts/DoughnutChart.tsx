import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface ChartData {
  branchName: string;
  orderAmount: number;
}

interface Props {
  data: ChartData[];
}

function DoughnutChart({ data }: Props) {
  // Extract branch names and order amounts
  const branchNames = data.map((item) => item.branchName);
  const orderAmounts = data.map((item) => item.orderAmount);

  // Generate random colors for each segment
  const backgroundColors = data.map(
    () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.8)`
  );

  // Construct the chart data object
  const chartData = {
    labels: branchNames,
    datasets: [
      {
        data: orderAmounts,
        backgroundColor: backgroundColors,
      },
    ],
  };

  // Define chart options
  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 10, // Reduce the size of the legend items
        },
      },
    },
  };

  return (
    <div className=' items-center justify-center flex h-[400px]'>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default DoughnutChart;
