import { BranchSalesDetails } from '../interfaces/BranchSaleDetails';

const generateSalesSummary = (): BranchSalesDetails[] => {
  const salesSummary: BranchSalesDetails[] = [];
  let currentDate = new Date('2023-01-01');
  let orders = 20;
  let sales = 5000;

  for (let i = 0; i < 365; i++) {
    salesSummary.push({
      date: currentDate.toISOString().split('T')[0],
      orders: orders,
      sales: sales,
    });

    // Increment date
    currentDate.setDate(currentDate.getDate() + 1);

    // Randomly adjust orders and sales for simplicity
    orders = Math.max(1, orders + Math.floor(Math.random() * 5 - 2)); // keep orders non-negative
    sales = Math.max(100, sales + Math.floor(Math.random() * 1000 - 500)); // keep sales non-negative
  }

  return salesSummary;
};

const salesSummary = generateSalesSummary();

export default salesSummary;
