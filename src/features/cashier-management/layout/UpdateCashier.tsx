import { useState } from 'react';
import UpdateCashierBankDetails from '../components/update-cashier/UpdateCashierBankDetails';
import UpdateCashierDetails from '../components/update-cashier/UpdateCashierDetails';
import UpdateCashierSummary from '../components/update-cashier/UpdateCashierSummary';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';
import { CashierContextType } from '../context/CashierContextType';
import { CashierContext, ComponentState } from './AddCashier';

const UpdateCashier = () => {
  const [currentComponent, setCurrentComponent] = useState(
    ComponentState.Details
  );

  const [cashierDetails, setCashierDetails] = useState(
    {} as CashierDetailsType
  );

  const [cashierBankDetails, setCashierBankDetails] = useState({
    bankAccountNumber: 0,
    bankName: '',
    bankBranchName: '',
    employerDescription: '',
    employerBankDetailsId: 0,
    monthlyPayment: 0,
    monthlyPaymentStatus: false,
    employerId: 0,
  });

  const contextValue: CashierContextType = {
    currentComponent,
    setCurrentComponent,
    setCashierDetails,
    cashierDetails,
    cashierBankDetails,
    setCashierBankDetails,
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case ComponentState.BankDetails:
        return <UpdateCashierBankDetails />;
      case ComponentState.Details:
        return <UpdateCashierDetails />;
      case ComponentState.DetailsSummary:
        return <UpdateCashierSummary />;
      default:
        return null;
    }
  };

  return (
    <CashierContext.Provider value={contextValue}>
      <div className='min-h-screen font-poppins'>
        {renderComponent()}
      </div>
    </CashierContext.Provider>
  );
};

export default UpdateCashier;
