import React from 'react';
import UseBranchService from '../../manager-dashboard/services/BranchService';
import { IBranchData } from '../../manager-dashboard/interfaces/IBranchData';
import TableRow from '../../../shared/table_row/TableRow';

type Props = {
  branchData: IBranchData;
};

function BranchDetailsCard({ branchData }: Props) {
  return (
    <div className='w-full h-full flex flex-col'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2 flex-shrink-0'>
        <span className='w-1 h-6 bg-blue-500 rounded'></span>
        Branch Information
      </h2>
      
      <div className='space-y-4 overflow-y-auto flex-1'>
        {/* Quick Stats Grid */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200'>
            <p className='text-xs text-gray-600 mb-1 font-medium'>Total Sales</p>
            <p className='text-xl font-bold text-green-700'>
              LKR {branchData.totalSales.toFixed(2)}
            </p>
          </div>
          <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200'>
            <p className='text-xs text-gray-600 mb-1 font-medium'>Order Count</p>
            <p className='text-xl font-bold text-blue-700'>{branchData.orderCount}</p>
          </div>
          <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200'>
            <p className='text-xs text-gray-600 mb-1 font-medium'>Employees</p>
            <p className='text-xl font-bold text-purple-700'>{branchData.employeeCount}</p>
          </div>
          <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200'>
            <p className='text-xs text-gray-600 mb-1 font-medium'>Total Items</p>
            <p className='text-xl font-bold text-yellow-700'>{branchData.itemCount}</p>
          </div>
        </div>
        
        {branchData.lowStockItemCount > 0 && (
          <div className='bg-red-50 border-l-4 border-red-500 p-3 rounded-lg flex items-center gap-2'>
            <svg className='w-5 h-5 text-red-600 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
            </svg>
            <p className='text-sm font-semibold text-red-800'>
              Low Stock Alert: {branchData.lowStockItemCount} items
            </p>
          </div>
        )}

        {/* Branch Details */}
        <div className='bg-gray-50 rounded-lg p-4 space-y-3'>
          <div className='flex justify-between py-2 border-b border-gray-200'>
            <span className='text-sm font-medium text-gray-600'>Branch ID</span>
            <span className='text-sm font-semibold text-gray-900'>#{branchData.branchId}</span>
          </div>
          <div className='flex justify-between py-2 border-b border-gray-200'>
            <span className='text-sm font-medium text-gray-600'>Branch Name</span>
            <span className='text-sm font-semibold text-gray-900'>{branchData.branchName}</span>
          </div>
          <div className='flex justify-between py-2 border-b border-gray-200'>
            <span className='text-sm font-medium text-gray-600'>Contact</span>
            <span className='text-sm font-semibold text-gray-900'>{branchData.branchContact}</span>
          </div>
          <div className='flex justify-between py-2 border-b border-gray-200'>
            <span className='text-sm font-medium text-gray-600'>Email</span>
            <span className='text-sm font-semibold text-gray-900 truncate max-w-[200px]'>{branchData.branchEmail}</span>
          </div>
          <div className='flex justify-between py-2 border-b border-gray-200'>
            <span className='text-sm font-medium text-gray-600'>Location</span>
            <span className='text-sm font-semibold text-gray-900'>{branchData.branchLocation}</span>
          </div>
          <div className='flex justify-between py-2 border-b border-gray-200'>
            <span className='text-sm font-medium text-gray-600'>Address</span>
            <span className='text-sm font-semibold text-gray-900 text-right max-w-[200px]'>{branchData.branchAddress}</span>
          </div>
          <div className='flex justify-between py-2'>
            <span className='text-sm font-medium text-gray-600'>Status</span>
            <span
              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                branchData.branchStatus
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {branchData.branchStatus ? '● Active' : '● Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchDetailsCard;
