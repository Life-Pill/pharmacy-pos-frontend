import React, { useEffect } from 'react';
import CashierRecentTransactionCard from '../components/CashierRecentTransactionCard';
import LatestTransactionDetails from '../components/LatestTransactionDetails';
import SummaryCard from '../components/SummaryCard';
import BranchDetailsCard from '../components/BranchDetailsCard';
import UseBranchService from '../../manager-dashboard/services/BranchService';

function MainManagerDashboard() {
  const { fetchBranchData, branchData } = UseBranchService();

  useEffect(() => {
    fetchBranchData();
  }, []);

  return (
    <div
      className=' w-full max-h-screen overflow-hidden flex flex-col'
      data-testid='dashboard'
    >
      {branchData && (
        <>
          <div className=' p-4 bg-slate-200 rounded-md max-h-[300px]'>
            <SummaryCard branchData={branchData} />
          </div>
          <div className='flex flex-row gap-4 p-4 justify-between items-center'>
            <div className='p-4 bg-slate-200 rounded-md h-[500px]'>
              <BranchDetailsCard branchData={branchData} />
            </div>
            <div className=' p-4 bg-slate-200 rounded-md h-[500px]'>
              <LatestTransactionDetails />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MainManagerDashboard;
