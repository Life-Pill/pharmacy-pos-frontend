import { Link } from 'react-router-dom';
import { useCashierContext, ComponentState } from '../../layout/UpdateCashier';

const UpdateCashierSummary = () => {
  const { cashierDetails, setCurrentComponent } = useCashierContext();

  const goToBack = () => {
    setCurrentComponent(ComponentState.BankDetails);
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='bg-gray-100 p-4 rounded-lg'>
        <p className='text-lg font-bold mb-2'>Personal Information</p>
        <p>
          <span className='font-semibold'>Name:</span>{' '}
          {cashierDetails.firstName} {cashierDetails.lastName}
        </p>
        <p>
          <span className='font-semibold'>Nickname:</span>{' '}
          {cashierDetails.nickname}
        </p>
        <p>
          <span className='font-semibold'>Email:</span> {cashierDetails.email}
        </p>
        <p>
          <span className='font-semibold'>Phone Number:</span>{' '}
          {cashierDetails.phoneNumber}
        </p>
        <p>
          <span className='font-semibold'>Address Line 1:</span>{' '}
          {cashierDetails.addressLine01}
        </p>
        <p>
          <span className='font-semibold'>Address Line 2:</span>{' '}
          {cashierDetails.addressLine02}
        </p>
        <p>
          <span className='font-semibold'>City:</span> {cashierDetails.city}
        </p>
        <p>
          <span className='font-semibold'>Province:</span>{' '}
          {cashierDetails.province}
        </p>
        <p>
          <span className='font-semibold'>Date of Birth:</span>{' '}
          {cashierDetails.DOB.toDateString()}
        </p>
      </div>
      <div className='bg-gray-100 p-4 rounded-lg'>
        <p className='text-lg font-bold mb-2'>Employment Details</p>
        <p>
          <span className='font-semibold'>Role:</span> {cashierDetails.role}
        </p>
        <p>
          <span className='font-semibold'>Assign Branch:</span>{' '}
          {cashierDetails.assignBranch}
        </p>
        <p>
          <span className='font-semibold'>Base Salary:</span>{' '}
          {cashierDetails.baseSalary}
        </p>
        <p>
          <span className='font-semibold'>Username:</span>{' '}
          {cashierDetails.username}
        </p>
        <p>
          <span className='font-semibold'>Bank Account Number:</span>{' '}
          {cashierDetails.bankAccountNumber}
        </p>
        <p>
          <span className='font-semibold'>Bank Name:</span>{' '}
          {cashierDetails.bankName}
        </p>
        <p>
          <span className='font-semibold'>Branch Name:</span>{' '}
          {cashierDetails.branchName}
        </p>
        <p>
          <span className='font-semibold'>Currency:</span>{' '}
          {cashierDetails.currency}
        </p>
        <p>
          <span className='font-semibold'>Additional Notes:</span>{' '}
          {cashierDetails.additionalNotes}
        </p>
      </div>
      <button
        type='button'
        className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
      >
        <Link to='/'>Confirm and Update</Link>
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
