import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';

ChartJS.register(CategoryScale);

interface Props {
  branchSaleDetails: { branchName: string; sales: number }[];
}

const BarGraph: React.FC<Props> = ({ branchSaleDetails }) => {
  // Extract branch names and sales amounts from the data
  const branchNames = branchSaleDetails.map((item) => item.branchName);
  const salesAmounts = branchSaleDetails.map((item) => item.sales);

  // Generate random colors for each bar
  const backgroundColors = branchNames.map(
    () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)},0.8)`
  );

  // Define chart data
  const data = {
    labels: branchNames,
    datasets: [
      {
        label: 'Sales Amount',
        data: salesAmounts,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0,
      },
    ],
  };

  // Define chart options
  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
