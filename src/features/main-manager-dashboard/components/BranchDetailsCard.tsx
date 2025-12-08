import React from 'react';
import UseBranchService from '../../manager-dashboard/services/BranchService';
import { IBranchData } from '../../manager-dashboard/interfaces/IBranchData';
import TableRow from '../../../shared/table_row/TableRow';

type Props = {
  branchData: IBranchData;
};

function BranchDetailsCard({ branchData }: Props) {
  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between items-center mb-6'>
        <h2 className='font-bold text-xl text-gray-800'>Branch Information</h2>
      </div>
      <div className='max-h-[500px] overflow-y-auto pr-2'>
        <div className='space-y-3'>
          <div className='grid grid-cols-2 gap-4 pb-4 border-b border-gray-200'>
            <div className='bg-green-50 p-3 rounded-lg'>
              <p className='text-xs text-gray-600 mb-1'>Total Sales</p>
              <p className='text-lg font-bold text-green-700'>
                LKR {branchData.totalSales.toFixed(2)}
              </p>
            </div>
            <div className='bg-blue-50 p-3 rounded-lg'>
              <p className='text-xs text-gray-600 mb-1'>Order Count</p>
              <p className='text-lg font-bold text-blue-700'>{branchData.orderCount}</p>
            </div>
            <div className='bg-purple-50 p-3 rounded-lg'>
              <p className='text-xs text-gray-600 mb-1'>Employee Count</p>
              <p className='text-lg font-bold text-purple-700'>{branchData.employeeCount}</p>
            </div>
            <div className='bg-yellow-50 p-3 rounded-lg'>
              <p className='text-xs text-gray-600 mb-1'>Item Count</p>
              <p className='text-lg font-bold text-yellow-700'>{branchData.itemCount}</p>
            </div>
          </div>
          
          {branchData.lowStockItemCount > 0 && (
            <div className='bg-red-50 border-l-4 border-red-500 p-3 rounded'>
              <p className='text-sm font-semibold text-red-800'>
                ⚠️ Low Stock Items: {branchData.lowStockItemCount}
              </p>
            </div>
          )}

          <div className='pt-4'>
            <table className='min-w-full'>
              <tbody className='divide-y divide-gray-200'>
                <TableRow label='Branch ID' value={branchData.branchId} />
                <TableRow label='Branch Name' value={branchData.branchName} />
                <TableRow label='Address' value={branchData.branchAddress} />
                <TableRow label='Contact' value={branchData.branchContact} />
                <TableRow label='Email' value={branchData.branchEmail} />
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    Status
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        branchData.branchStatus
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {branchData.branchStatus ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
                <TableRow label='Location' value={branchData.branchLocation} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchDetailsCard;
