import React, { useEffect } from 'react';
import {
  GiReceiveMoney,
  GiShoppingCart,
  GiWalk,
  GiFactory,
} from 'react-icons/gi';
import useBranchService from '../../manager-dashboard/services/BranchService';
import { IBranchData } from '../../manager-dashboard/interfaces/IBranchData';
import { Loader } from 'lucide-react';

type Props = {
  branchData: IBranchData;
};

function SummaryCard({ branchData }: Props) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {/* Total Sales Card */}
      <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-green-500'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-gray-500 mb-1'>Total Sales</p>
            <p className='text-2xl font-bold text-green-700'>
              {branchData ? (
                `LKR ${branchData.totalSales.toFixed(2)}`
              ) : (
                <Loader className='w-6 h-6 animate-spin' />
              )}
            </p>
          </div>
          <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
            <GiReceiveMoney className='text-green-600 text-2xl' />
          </div>
        </div>
      </div>

      {/* Total Orders Card */}
      <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-blue-500'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-gray-500 mb-1'>Total Orders</p>
            <p className='text-2xl font-bold text-blue-700'>
              {branchData ? (
                branchData.orderCount
              ) : (
                <Loader className='w-6 h-6 animate-spin' />
              )}
            </p>
          </div>
          <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
            <GiShoppingCart className='text-blue-600 text-2xl' />
          </div>
        </div>
      </div>

      {/* Total Workers Card */}
      <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-yellow-500'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-gray-500 mb-1'>Total Workers</p>
            <p className='text-2xl font-bold text-yellow-700'>
              {branchData ? (
                branchData.employeeCount
              ) : (
                <Loader className='w-6 h-6 animate-spin' />
              )}
            </p>
          </div>
          <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center'>
            <GiWalk className='text-yellow-600 text-2xl' />
          </div>
        </div>
      </div>

      {/* Branch Status Card */}
      <div className={`bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 ${
        branchData?.branchStatus ? 'border-emerald-500' : 'border-red-500'
      }`}>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-gray-500 mb-1'>Branch Status</p>
            <p className={`text-2xl font-bold ${
              branchData?.branchStatus ? 'text-emerald-700' : 'text-red-700'
            }`}>
              {branchData ? (
                branchData.branchStatus ? 'Active' : 'Inactive'
              ) : (
                <Loader className='w-6 h-6 animate-spin' />
              )}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            branchData?.branchStatus ? 'bg-emerald-100' : 'bg-red-100'
          }`}>
            <GiFactory className={`text-2xl ${
              branchData?.branchStatus ? 'text-emerald-600' : 'text-red-600'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
