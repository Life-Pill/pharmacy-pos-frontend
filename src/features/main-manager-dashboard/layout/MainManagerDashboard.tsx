import React, { useEffect } from 'react';
import CashierRecentTransactionCard from '../components/CashierRecentTransactionCard';
import LatestTransactionDetails from '../components/LatestTransactionDetails';
import SummaryCard from '../components/SummaryCard';
import BranchDetailsCard from '../components/BranchDetailsCard';
import UseBranchService from '../../manager-dashboard/services/BranchService';
import { Loader } from 'lucide-react';

function MainManagerDashboard() {
  const { fetchBranchData, branchData } = UseBranchService();

  useEffect(() => {
    fetchBranchData();
  }, []);

  return (
    <div
      className='w-full h-screen overflow-y-auto bg-gray-50 p-6'
      data-testid='dashboard'
    >
      {branchData ? (
        <div className='max-w-[1600px] mx-auto space-y-6'>
          {/* Summary Cards Section */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <SummaryCard branchData={branchData} />
          </div>

          {/* Branch Details and Transactions Section */}
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <BranchDetailsCard branchData={branchData} />
            </div>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <LatestTransactionDetails />
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <Loader className='w-10 h-10 animate-spin text-blue-600' />
        </div>
      )}
    </div>
  );
}

export default MainManagerDashboard;
