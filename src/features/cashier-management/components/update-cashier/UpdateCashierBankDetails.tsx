import { useEffect } from 'react';
import { ComponentState, useCashierContext } from '../../layout/AddCashier';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import useCashierCRUDService from '../../services/CashierCRUDService';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../../shared/loader/LoadingSpinner';

const UpdateCashierBankDetails = () => {
  const { employerId } = useParams();

  const { loading } = useCashierCRUDService();

  const { setCurrentComponent } = useCashierContext();

  const {
    updateBankDetails,
    setCashierBankDetails,
    cashierBankDetails,
    fetchBankDetailsById,
    loading: bankLoading,
  } = useBankCRUDService();

  const goToSummary = () => {
    updateBankDetails(cashierBankDetails, parseInt(employerId as string) || 0);
  };
  const goToBack = () => {
    setCurrentComponent(ComponentState.Details);
  };

  useEffect(() => {
    fetchBankDetailsById(parseInt(employerId as string));
  }, [employerId]);

  if (loading || bankLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-md p-8 mb-8'>
        <h1 className='text-3xl font-bold text-white'>Update Bank Account Details</h1>
        <p className='text-blue-50 mt-2'>Modify employee banking information for salary processing</p>
      </div>

      {/* Main Form Card */}
      <div className='bg-white rounded-xl shadow-md p-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Bank Information Section */}
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>Bank Information</h2>
            
            <div>
              <label htmlFor='bankName' className='block text-sm font-medium text-gray-700 mb-2'>
                Bank Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='bankName'
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                placeholder='Enter bank name'
                value={cashierBankDetails.bankName}
                onChange={(e) =>
                  setCashierBankDetails({
                    ...cashierBankDetails,
                    bankName: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor='branchName' className='block text-sm font-medium text-gray-700 mb-2'>
                Branch Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='branchName'
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                placeholder='Enter branch name'
                value={cashierBankDetails.bankBranchName}
                onChange={(e) =>
                  setCashierBankDetails({
                    ...cashierBankDetails,
                    bankBranchName: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor='accountNumber' className='block text-sm font-medium text-gray-700 mb-2'>
                Account Number <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='accountNumber'
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                placeholder='Enter account number'
                value={cashierBankDetails.bankAccountNumber || ''}
                onChange={(e) =>
                  setCashierBankDetails({
                    ...cashierBankDetails,
                    bankAccountNumber: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>

          {/* Salary & Notes Section */}
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>Salary & Additional Information</h2>
            
            <div>
              <label htmlFor='baseSalary' className='block text-sm font-medium text-gray-700 mb-2'>
                Monthly Salary
              </label>
              <input
                type='text'
                id='baseSalary'
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed'
                value={cashierBankDetails.monthlyPayment}
                readOnly
              />
              <p className='text-xs text-gray-500 mt-1'>Update this value from the employee details page</p>
            </div>

            <div>
              <label htmlFor='additionalNotes' className='block text-sm font-medium text-gray-700 mb-2'>
                Additional Notes
              </label>
              <textarea
                id='additionalNotes'
                rows={8}
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none'
                placeholder='Enter any additional notes or comments about the bank account...'
                value={cashierBankDetails.employerDescription}
                onChange={(e) =>
                  setCashierBankDetails({
                    ...cashierBankDetails,
                    employerDescription: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center justify-center gap-4 mt-8 pt-6 border-t'>
          <button
            type='button'
            className='px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all'
            onClick={goToBack}
          >
            ← Back to Details
          </button>
          <button
            type='button'
            className='px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={goToSummary}
            disabled={loading || bankLoading}
          >
            {loading || bankLoading ? 'Updating...' : 'Update & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCashierBankDetails;
