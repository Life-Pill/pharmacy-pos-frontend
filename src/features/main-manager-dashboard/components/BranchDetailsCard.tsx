import React from 'react';
import UseBranchService from '../../manager-dashboard/services/BranchService';
import { IBranchData } from '../../manager-dashboard/interfaces/IBranchData';
import TableRow from '../../../shared/table_row/TableRow';

type Props = {
  branchData: IBranchData;
};

function BranchDetailsCard({ branchData }: Props) {
  return (
    <div className='w-[600px]'>
      <div className='flex flex-row justify-between items-center mb-8 font-bold'>
        <p className=' font-bold text-lg'>Branch Data</p>
      </div>
      <div className='max-h-96 overflow-y-scroll'>
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='bg-white divide-y divide-gray-200'>
            <TableRow
              label='Sales'
              value={'LKR ' + branchData.sales.toFixed(2)}
            />
            <TableRow label='Orders' value={branchData.orders} />
            <TableRow label='Manager' value={branchData.manager} />
            <TableRow label='Branch ID' value={branchData.branchDTO.branchId} />
            <TableRow
              label='Branch Name'
              value={branchData.branchDTO.branchName}
            />
            <TableRow
              label='Branch Address'
              value={branchData.branchDTO.branchAddress}
            />
            <TableRow
              label='Branch Contact'
              value={branchData.branchDTO.branchContact}
            />
            <TableRow
              label='Branch Fax'
              value={branchData.branchDTO.branchFax}
            />
            <TableRow
              label='Branch Email'
              value={branchData.branchDTO.branchEmail}
            />
            <TableRow
              label='Branch Description'
              value={branchData.branchDTO.branchDescription}
            />
            <TableRow
              label='Branch Status'
              value={branchData.branchDTO.branchStatus ? 'Active' : 'Inactive'}
            />
            <TableRow
              label='Branch Location'
              value={branchData.branchDTO.branchLocation}
            />
            <TableRow
              label='Branch Created On'
              value={branchData.branchDTO.branchCreatedOn}
            />
            <TableRow
              label='Branch Created By'
              value={branchData.branchDTO.branchCreatedBy}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BranchDetailsCard;
