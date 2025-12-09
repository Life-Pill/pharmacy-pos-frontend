import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import useCashierCRUDService from '../../services/CashierCRUDService';
import LoadingSpinner from '../../../../shared/loader/LoadingSpinner';
import { IoCloseOutline } from 'react-icons/io5';

type Props = {};

function ViewCashierComponent({}: Props) {
  const { employerId } = useParams();

  const { cashierBankDetails, fetchBankDetailsById, loading: bankLoading } = useBankCRUDService();

  const {
    cashierDetails,
    fetchCashierById,
    deleteCashierById,
    loading,
    fetchImageOfEmployer,
    profileImageUrl,
  } = useCashierCRUDService();

  useEffect(() => {
    if (employerId) {
      fetchBankDetailsById(parseInt(employerId));
      fetchCashierById(parseInt(employerId));
      fetchImageOfEmployer(parseInt(employerId));
    }
  }, [employerId]);

  const deleteCashier = () => {
    if (employerId) {
      deleteCashierById(parseInt(employerId));
    }
  };

  if (loading || bankLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white p-6 font-poppins'>
      <div className='max-w-7xl mx-auto pb-8'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-white mb-2'>View Employee Details</h1>
              <p className='text-blue-100'>Employee ID: {employerId}</p>
            </div>
            <Link to='/manager-dashboard/Cashiers'>
              <button className='bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2'>
                <IoCloseOutline size={20} />
                Close
              </button>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Profile Card */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl shadow-md p-6 sticky top-8'>
              <div className='flex flex-col items-center'>
                <div className='w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 mb-4'>
                  <img
                    src={
                      profileImageUrl ||
                      'https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png'
                    }
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>
                <h2 className='text-2xl font-bold text-gray-800 text-center'>
                  {cashierDetails.employerFirstName} {cashierDetails.employerLastName}
                </h2>
                <p className='text-sm text-gray-500 mt-1'>
                  {cashierDetails.role?.toUpperCase()}
                </p>
                <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-3'>
                  ID: {cashierDetails.employerId}
                </span>
              </div>
            </div>
          </div>

          {/* Details Cards */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Personal Information Card */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 pb-2 border-b'>
                Personal Information
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>First Name</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.employerFirstName}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Last Name</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.employerLastName}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Nickname</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.employerNicName || 'N/A'}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>NIC Number</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.employerNic}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Date of Birth</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.dateOfBirth?.slice(0, 10)}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Gender</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.gender?.toUpperCase()}</p>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 pb-2 border-b'>
                Contact Information
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Email Address</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.employerEmail}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Phone Number</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.employerPhone}</p>
                </div>
                <div className='space-y-1 md:col-span-2'>
                  <label className='text-xs font-medium text-gray-500'>Address</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.employerAddress}</p>
                </div>
              </div>
            </div>

            {/* Employment Details Card */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 pb-2 border-b'>
                Employment Details
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Role</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.role}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Assigned Branch</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.branchId}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Base Salary (LKR)</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierDetails.employerSalary}</p>
                </div>
              </div>
            </div>

            {/* Bank Details Card */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 pb-2 border-b'>
                Bank Account Details
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Bank Name</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierBankDetails.bankName}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Branch Name</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierBankDetails.bankBranchName}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Account Number</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierBankDetails.bankAccountNumber}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Monthly Payment (LKR)</label>
                  <p className='text-sm text-gray-900 font-medium'>{cashierBankDetails.monthlyPayment}</p>
                </div>
                {cashierBankDetails.employerDescription && (
                  <div className='space-y-1 md:col-span-2'>
                    <label className='text-xs font-medium text-gray-500'>Additional Notes</label>
                    <p className='text-sm text-gray-900 font-medium'>{cashierBankDetails.employerDescription}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center justify-center gap-4 mt-8'>
          <Link to='/manager-dashboard/Cashiers'>
            <button
              type='button'
              className='px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors border border-gray-300'
            >
              Back to Employee List
            </button>
          </Link>
          <button
            type='button'
            className='px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors'
            onClick={deleteCashier}
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewCashierComponent;
