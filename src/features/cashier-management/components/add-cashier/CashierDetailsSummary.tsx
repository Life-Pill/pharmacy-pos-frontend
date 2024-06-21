import React from 'react';
import { ComponentState, useCashierContext } from '../../layout/AddCashier';
import { Link } from 'react-router-dom';
import TableRow from '../../../../shared/table_row/TableRow';

function CashierDetailsSummary() {
  const { cashierDetails, setCurrentComponent, cashierBankDetails } =
    useCashierContext();

  const goToBankDetails = () => {
    setCurrentComponent(ComponentState.BankDetails);
  };

  return (
    <div>
      {/* Image Section */}
      <p className='text-lg font-bold mb-2'>
        Employee {cashierDetails.employerFirstName}
      </p>

      <img
        src={cashierDetails.profileImageUrl} // Assuming profileImage is an array of strings (URLs)
        alt='Profile'
        className='h-32 w-32 rounded-full object-cover mr-2'
      />

      {/* Personal Information Section */}
      <div className='flex flex-row justify-center items-center'>
        <div>
          <p className='text-lg font-bold mb-2'>Employment Information</p>
          <table className='min-w-full divide-y divide-gray-200'>
            <tbody className='bg-white divide-y divide-gray-200'>
              <TableRow label='EmployerID' value={cashierDetails.employerId} />
              <TableRow
                label='First Name'
                value={cashierDetails.employerFirstName}
              />
              <TableRow
                label='Last Name'
                value={cashierDetails.employerLastName}
              />
              <TableRow
                label='Nic Name'
                value={cashierDetails.employerNicName}
              />
              <TableRow label='NIC Number' value={cashierDetails.employerNic} />
              <TableRow label='E-mail' value={cashierDetails.employerEmail} />
              <TableRow
                label='Phone Number'
                value={cashierDetails.employerPhone}
              />
              <TableRow
                label='Address'
                value={cashierDetails.employerAddress}
              />
              <TableRow
                label='Date of Birth'
                value={cashierDetails.dateOfBirth.toString().slice(0, 10)}
              />
              <TableRow
                label='Gender'
                value={cashierDetails.gender.toUpperCase()}
              />
              <TableRow
                label='Role'
                value={cashierDetails.role.toUpperCase()}
              />
            </tbody>
          </table>
        </div>
        <div>
          {/* Employment Details Section */}
          <p className='text-lg font-bold mb-2'>Bank Details</p>
          <table className='min-w-full divide-y divide-gray-200'>
            <tbody className='bg-white divide-y divide-gray-200'>
              <TableRow
                label='Account Number'
                value={cashierBankDetails.bankAccountNumber}
              />
              <TableRow label='Bank Name' value={cashierBankDetails.bankName} />
              <TableRow
                label='Branch Name'
                value={cashierBankDetails.bankBranchName}
              />

              <TableRow
                label='Base Salary (LKR)'
                value={cashierBankDetails.monthlyPayment}
              />
              <TableRow
                label='Additional Notes'
                value={cashierBankDetails.employerDescription}
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-center items-center'>
        <button
          type='button'
          className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
        >
          <Link to='/manager-dashboard/Cashiers'>Finish</Link>
        </button>
        <button
          type='button'
          className='text-white bg-blueDarker hover:bg-blue font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
          onClick={goToBankDetails}
        >
          Go To Bank Details
        </button>
      </div>
    </div>
  );
}

export default CashierDetailsSummary;
