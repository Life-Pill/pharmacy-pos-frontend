import { Link } from 'react-router-dom';
import { ComponentState, useCashierContext } from '../../layout/AddCashier';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import useCashierCRUDService from '../../services/CashierCRUDService';

const UpdateCashierSummary = () => {
  const { setCurrentComponent } = useCashierContext();

  const goToBack = () => {
    setCurrentComponent(ComponentState.BankDetails);
  };

  //
  //
  const { cashierBankDetails } = useBankCRUDService();
  const { cashierDetails } = useCashierCRUDService();

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='bg-gray-100 p-4 rounded-lg'>
        <p className='text-lg font-bold mb-2'>Personal Information</p>
        <p>
          <span className='font-semibold'>Name:</span>{' '}
          {cashierDetails.employerFirstName} {cashierDetails.employerLastName}
        </p>
        <p>
          <span className='font-semibold'>Nickname:</span>{' '}
          {cashierDetails.employerNicName}
        </p>
        <p>
          <span className='font-semibold'>Email:</span>{' '}
          {cashierDetails.employerEmail}
        </p>
        <p>
          <span className='font-semibold'>Phone Number:</span>{' '}
          {cashierDetails.employerPhone}
        </p>
        <p>
          <span className='font-semibold'>Address:</span>{' '}
          {cashierDetails.employerAddress}
        </p>
        <p>
          <span className='font-semibold'>Date of Birth:</span>{' '}
          {cashierDetails.dateOfBirth?.slice(0, 10)}
        </p>
      </div>
      <div className='bg-gray-100 p-4 rounded-lg'>
        <p className='text-lg font-bold mb-2'>Employment Details</p>
        <p>
          <span className='font-semibold'>Role:</span> {cashierDetails.role}
        </p>
        <p>
          <span className='font-semibold'>Assign Branch:</span>{' '}
          {cashierDetails.branchId}
        </p>
        <p>
          <span className='font-semibold'>Base Salary:</span>{' '}
          {cashierDetails.employerSalary}
        </p>

        <p>
          <span className='font-semibold'>Bank Account Number:</span>{' '}
          {cashierBankDetails.bankAccountNumber}
        </p>
        <p>
          <span className='font-semibold'>Bank Name:</span>{' '}
          {cashierBankDetails.bankName}
        </p>
        <p>
          <span className='font-semibold'>Branch Name:</span>{' '}
          {cashierBankDetails.bankBranchName}
        </p>

        <p>
          <span className='font-semibold'>Additional Notes:</span>{' '}
          {cashierBankDetails.employerDescription}
        </p>

        <p>
          <span className='font-semibold'>Monthly Payment:</span>{' '}
          {cashierBankDetails.monthlyPayment}
        </p>
      </div>
      <button
        type='button'
        className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
      >
        <Link to='/manager-dashboard/Cashiers'>
          Continue to cashier manager
        </Link>
      </button>
      <button
        type='button'
        className='text-white bg-blueDarker hover:bg-blue font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
        onClick={goToBack}
      >
        Go To Bank Details
      </button>
    </div>
  );
};

export default UpdateCashierSummary;
