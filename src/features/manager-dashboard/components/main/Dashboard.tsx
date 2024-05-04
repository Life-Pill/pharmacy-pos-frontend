import React, { useEffect } from 'react';
import BarGraph from '../../../../shared/charts/BarGraph';
import branchSaleDetails from '../../../../assets/fakedata/branchsales';
import DoughnutChart from '../../../../shared/charts/DoughnutChart';
import branchOrderDetails from '../../../../assets/fakedata/orderdetails';
import CashierRecentTransactionCard from './CashierRecentTransactionCard';
import LatestTransactionDetails from './LatestTransactionDetails';
import UseBranchService from '../../services/BranchService';
import SummaryCard from './SummaryCard';

const Dashboard = () => {
  return (
    <div
      className=' w-full max-h-screen overflow-hidden flex flex-col'
      data-testid='dashboard'
    >
      <div className=' p-4 bg-slate-200 rounded-md max-h-[300px]'>
        <SummaryCard />
      </div>
      <div className='flex flex-row gap-4 p-4 justify-between items-center'>
        <div className='p-4 bg-slate-200 rounded-md h-[500px]'>
          <CashierRecentTransactionCard />
        </div>
        <div className=' p-4 bg-slate-200 rounded-md h-[500px]'>
          <LatestTransactionDetails />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
