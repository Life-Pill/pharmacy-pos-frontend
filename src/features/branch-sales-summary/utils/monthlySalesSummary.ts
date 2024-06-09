import { BranchSalesDetails } from '../interfaces/BranchSaleDetails';
// Function to generate monthly sales summary from daily sales data
export const generateMonthlySalesSummary = (
  dailySalesSummary: BranchSalesDetails[]
): BranchSalesDetails[] => {
  const monthlySalesSummary: { [key: string]: BranchSalesDetails } = {};

  // Loop through each daily sales data
  dailySalesSummary.forEach((dailyData) => {
    const monthYear = dailyData.date.slice(0, 7); // Extract YYYY-MM from the date

    // If the month-year key does not exist, initialize it
    if (!monthlySalesSummary[monthYear]) {
      monthlySalesSummary[monthYear] = {
        date: monthYear,
        orders: 0,
        sales: 0,
      };
    }

    // Aggregate orders and sales for the month
    monthlySalesSummary[monthYear].orders += dailyData.orders;
    monthlySalesSummary[monthYear].sales += dailyData.sales;
  });

  // Convert the monthly sales summary object to an array
  const monthlySalesSummaryArray = Object.values(monthlySalesSummary);

  return monthlySalesSummaryArray;
};
