import { useEffect } from 'react';
import { useCashierContext } from '../../layout/AddCashier';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import { toast } from 'react-toastify';

const CashierBankDetails = () => {
  const { cashierDetails, cashierBankDetails, setCashierBankDetails } =
    useCashierContext();

  const { updateBankDetails, loading } = useBankCRUDService();

  useEffect(() => {
    setCashierBankDetails({
      ...cashierBankDetails,
      employerId: cashierDetails.employerId,
      monthlyPayment: cashierDetails.employerSalary,
    });
  }, []);

  const goToSummary = () => {
    console.log('Summary', cashierDetails);
    if (cashierDetails && cashierDetails.employerId) {
      updateBankDetails(cashierBankDetails, cashierDetails.employerId);
    } else {
      toast.error('No cashier created yet.');
    }
  };

  return (
    <div className='w-full p-16 px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
        {/* First Column */}
        <div>
          <label
            htmlFor='bankName'
            className='block text-sm font-medium text-black mt-4'
          >
            Bank Name
          </label>
          <input
            type='text'
            id='bankName'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierBankDetails.bankName}
            onChange={(e) =>
              setCashierBankDetails({
                ...cashierBankDetails,
                bankName: e.target.value,
              })
            }
          />

          <label
            htmlFor='branchName'
            className='block text-sm font-medium text-black mt-4'
          >
            Branch Name
          </label>
          <input
            type='text'
            id='branchName'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierBankDetails.bankBranchName}
            onChange={(e) =>
              setCashierBankDetails({
                ...cashierBankDetails,
                bankBranchName: e.target.value,
              })
            }
          />

          <label
            htmlFor='accountNumber'
            className='block text-sm font-medium text-black mt-4'
          >
            Account Number
          </label>
          <input
            type='number'
            id='accountNumber'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierBankDetails.bankAccountNumber}
            onChange={(e) =>
              setCashierBankDetails({
                ...cashierBankDetails,
                bankAccountNumber: parseInt(e.target.value),
              })
            }
          />

          <label
            htmlFor='additionalNotes'
            className='block text-sm font-medium text-black mt-4'
          >
            Additional Notes
          </label>
          <textarea
            id='additionalNotes'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierBankDetails.employerDescription}
            onChange={(e) =>
              setCashierBankDetails({
                ...cashierBankDetails,
                employerDescription: e.target.value,
              })
            }
          ></textarea>

          <label
            htmlFor='baseSalary'
            className='block text-sm font-medium text-black mt-4'
          >
            Base Salary
          </label>
          <input
            type='text'
            id='baseSalary'
            className='mt-1 p-2 border-gray rounded-md w-full'
            value={cashierDetails.employerSalary}
            readOnly
          />
        </div>
      </div>
      <div className='flex items-center justify-center gap-8 w-full'>
        <button
          type='button'
          className={`text-white py-2.5 px-5 me-2 mb-2 rounded-lg ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blueDarker hover:bg-blue'
          }`}
          onClick={goToSummary}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Create Bank Details'}
        </button>
      </div>
    </div>
  );
};

export default CashierBankDetails;
