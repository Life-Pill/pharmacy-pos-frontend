import React, { useEffect } from 'react';
import CashierRecentTransactionCard from '../components/CashierRecentTransactionCard';
import LatestTransactionDetails from '../components/LatestTransactionDetails';
import SummaryCard from '../components/SummaryCard';
import BranchDetailsCard from '../components/BranchDetailsCard';
import UseBranchService from '../../manager-dashboard/services/BranchService';
import LoadingSpinner from '../../../shared/loader/LoadingSpinner';

interface MainManagerDashboardProps {
  onNavigateToOrders?: () => void;
}

function MainManagerDashboard({ onNavigateToOrders }: MainManagerDashboardProps) {
  const { fetchBranchData, branchData } = UseBranchService();

  useEffect(() => {
    fetchBranchData();
  }, []);

  return (
    <div
      className='flex flex-col gap-6 h-full overflow-y-auto'
      data-testid='dashboard'
    >
      {branchData ? (
        <>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg flex-shrink-0'>
            <h1 className='text-2xl font-bold text-white mb-2'>Manager Dashboard</h1>
            <p className='text-blue-100 text-sm'>Overview of your branch performance and activities</p>
          </div>

          {/* Summary Cards Section */}
          <div className='flex-shrink-0'>
            <SummaryCard branchData={branchData} />
          </div>

          {/* Branch Details and Transactions Section */}
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 flex-shrink-0 pb-6'>
            <div className='bg-white rounded-xl shadow-md p-6 max-h-[600px] overflow-y-auto'>
              <BranchDetailsCard branchData={branchData} />
            </div>
            <div className='bg-white rounded-xl shadow-md p-6 max-h-[600px] overflow-y-auto'>
              <LatestTransactionDetails onNavigateToOrders={onNavigateToOrders} />
            </div>
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center h-full'>
          <LoadingSpinner size='lg' />
        </div>
      )}
    </div>
  );
}

export default MainManagerDashboard;
