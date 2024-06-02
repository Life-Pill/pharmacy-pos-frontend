import React, { useEffect } from 'react';
import useSalesSummary from '../services/SalesSummaryService';
import SalesChart from '../components/SalesChart';
import OrdersChart from '../components/OrdersChart';

function BranchSalesSummary() {
  const { getSalesSummary, salesSummary } = useSalesSummary();

  useEffect(() => {
    getSalesSummary();
  }, []);

  return (
    <div className=' felx flex-col overflow-scroll min-h-screen gap-8'>
      <OrdersChart salesData={salesSummary} />

      <SalesChart salesData={salesSummary} />
    </div>
  );
}

export default BranchSalesSummary;
