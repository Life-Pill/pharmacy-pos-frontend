import { ComponentState, useCashierContext } from '../../layout/AddCashier';

const CashierBankDetails = () => {
  const { setCurrentComponent, cashierDetails } = useCashierContext();
  const goToSummary = () => {
    setCurrentComponent(ComponentState.DetailsSummary); // Set the current component to Details
  };
  const goToBack = () => {
    setCurrentComponent(ComponentState.Details);
  };
  return (
    <div className='w-full p-16 px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* First Column */}
        <div>
          <label
            htmlFor='currency'
            className='block text-sm font-medium text-black'
          >
            Currency
          </label>
          <select
            id='currency'
            className='mt-1 p-2 border-gray rounded-md w-full'
            onChange={(e) => {
              cashierDetails.currency = e.target.value;
            }}
          >
            <option value='usd'>USD</option>
            <option value='eur'>EUR</option>
            <option value='gbp'>GBP</option>
            {/* Add other currency options here */}
          </select>

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
            onChange={(e) => {
              cashierDetails.bankName = e.target.value;
            }}
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
            onChange={(e) => {
              cashierDetails.branchName = e.target.value;
            }}
          />

          <label
            htmlFor='accountNumber'
            className='block text-sm font-medium text-black mt-4'
          >
            Account Number
          </label>
          <input
            type='text'
            id='accountNumber'
            className='mt-1 p-2 border-gray rounded-md w-full'
            onChange={(e) => {
              cashierDetails.bankAccountNumber = e.target.value;
            }}
          />
        </div>

        {/* Second Column */}
        <div>
          <label
            htmlFor='role'
            className='block text-sm font-medium text-black'
          >
            Role in Pharmacy
          </label>
          <select
            id='role'
            className='mt-1 p-2 border-gray rounded-md w-full'
            onChange={(e) => {
              cashierDetails.role = e.target.value;
            }}
          >
            <option value='cashier'>Cashier</option>
            <option value='manager'>Manager</option>
            <option value='cleaning'>Cleaning Staff</option>
            <option value='sales'>Sales Staff</option>
            {/* Add other role options here */}
          </select>

          <label
            htmlFor='assignBranch'
            className='block text-sm font-medium text-black mt-4'
          >
            Assign Branch
          </label>
          <select
            id='assignBranch'
            className='mt-1 p-2 border-gray rounded-md w-full'
            onChange={(e) => {
              cashierDetails.assignBranch = e.target.value;
            }}
          >
            <option value='branch1'>Branch 1</option>
            <option value='branch2'>Branch 2</option>
            <option value='branch3'>Branch 3</option>
            <option value='branch4'>Branch 4</option>
            <option value='branch5'>Branch 5</option>
            {/* Add other branch options here */}
          </select>

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
            onChange={(e) => {
              cashierDetails.baseSalary = parseFloat(e.target.value);
            }}
          />

          <label
            htmlFor='password'
            className='block text-sm font-medium text-black mt-4'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='mt-1 p-2 border-gray rounded-md w-full'
            onChange={(e) => {
              cashierDetails.password = e.target.value;
            }}
          />

          <label
            htmlFor='reenterPassword'
            className='block text-sm font-medium text-black mt-4'
          >
            Re-enter Password
          </label>
          <input
            type='password'
            id='reenterPassword'
            className='mt-1 p-2 border-gray rounded-md w-full'
            onChange={(e) => {
              cashierDetails.confirmPassword = e.target.value;
            }}
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
            onChange={(e) => {
              cashierDetails.additionalNotes = e.target.value;
            }}
          ></textarea>
        </div>
      </div>
      <div className='flex items-center justify-center gap-8 w-full'>
        <button
          type='button'
          className='text-white bg-blueDarker hover:bg-blue font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
          onClick={goToSummary}
        >
          Create & Continue
        </button>
        <button
          type='button'
          className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
          onClick={goToBack}
        >
          Back To Details Page
        </button>
      </div>
    </div>
  );
};

export default CashierBankDetails;
