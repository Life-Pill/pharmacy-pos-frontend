import { Link, useParams } from 'react-router-dom';
import { ComponentState, useCashierContext } from '../../layout/AddCashier';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import useCashierCRUDService from '../../services/CashierCRUDService';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import TableRow from '../../../../shared/table_row/TableRow';

const UpdateCashierSummary = () => {
  const { setCurrentComponent } = useCashierContext();
  const { employerId } = useParams();

  const goToBack = () => {
    setCurrentComponent(ComponentState.BankDetails);
  };

  //
  //
  const { cashierBankDetails, fetchBankDetailsById } = useBankCRUDService();
  const {
    cashierDetails,
    fetchCashierById,
    fetchImageOfEmployer,
    profileImageUrl,
  } = useCashierCRUDService();

  useEffect(() => {
    if (employerId) {
      fetchImageOfEmployer(parseInt(employerId as string));
      fetchCashierById(parseInt(employerId as string));
      fetchBankDetailsById(parseInt(employerId as string));
    } else {
      toast.error('Employer id is not found');
    }
  }, []);

  return (
    <div className='flex flex-row justify-evenly items-center max-h-screen p-2'>
      {/* Image Section */}
      <div className='flex justify-center items-center flex-col gap-2'>
        <img
          src={
            profileImageUrl ||
            'https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png'
          }
          alt='Profile'
          className='w-64 h-64 rounded-full'
        />
        <p className='text-lg font-bold mb-2'>
          Employee {cashierDetails.employerFirstName}
        </p>
        <div className='flex items-center justify-center flex-col gap-2'>
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
        <div className='flex justify-center items-center gap-4'>
          <button
            type='button'
            className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
          >
            <Link to='/manager-dashboard/Cashiers'>Continue</Link>
          </button>
          <button
            type='button'
            className='text-white bg-blueDarker hover:bg-blue font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
            onClick={goToBack}
          >
            Back
          </button>
        </div>
      </div>

      {/* Personal Information Section */}

      <div className='flex justify-center items-center flex-col gap-2'>
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
            <TableRow label='Nic Name' value={cashierDetails.employerNicName} />
            <TableRow label='NIC Number' value={cashierDetails.employerNic} />
            <TableRow label='E-mail' value={cashierDetails.employerEmail} />
            <TableRow
              label='Phone Number'
              value={cashierDetails.employerPhone}
            />
            <TableRow label='Address' value={cashierDetails.employerAddress} />
            <TableRow
              label='Date of Birth'
              value={cashierDetails.dateOfBirth.toString().slice(0, 10)}
            />
            <TableRow
              label='Gender'
              value={cashierDetails.gender.toUpperCase()}
            />
            <TableRow label='Role' value={cashierDetails.role.toUpperCase()} />
          </tbody>
        </table>
      </div>

      {/* Buttons */}
    </div>
  );
};

export default UpdateCashierSummary;
