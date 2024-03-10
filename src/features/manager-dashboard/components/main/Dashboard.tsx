import React from 'react';
import BarGraph from '../../../../shared/charts/BarGraph';
import branchSaleDetails from '../../../../assets/fakedata/branchsales';
import DoughnutChart from '../../../../shared/charts/DoughnutChart';
import branchOrderDetails from '../../../../assets/fakedata/orderdetails';
import CashierRecentTransactionCard from './CashierRecentTransactionCard';
import LatestTransactionDetails from './LatestTransactionDetails';
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className=' w-full grid grid-cols-2 grid-rows-2 gap-8 max-h-screen overflow-hidden'>
      <div className='p-4'>
        <p className='text-md text-center font-bold'>Sales by Branch</p>
        <BarGraph branchSaleDetails={branchSaleDetails} />
      </div>
      <div className='p-4'>
        <p className='text-md text-center font-bold'>Order by Branch</p>
        <DoughnutChart data={branchOrderDetails} />
      </div>
      <div className='p-4'>
        <CashierRecentTransactionCard />
      </div>
      <div className=' p-4'>
        <LatestTransactionDetails />
      </div>
    </div>
  );
};

export default Dashboard;
