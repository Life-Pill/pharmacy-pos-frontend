import React from 'react';
import CashierRecentTransactionCard from '../components/CashierRecentTransactionCard';
import LatestTransactionDetails from '../components/LatestTransactionDetails';
import SummaryCard from '../components/SummaryCard';

type Props = {};

function MainManagerDashboard({}: Props) {
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
}

export default MainManagerDashboard;
