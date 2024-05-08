import React, { useState, useContext, createContext } from 'react';
import CashierManagerNavBar from '../components/navbar/CashierManagerNavBar';
import CashierDetails from '../components/add-cashier/CashierDetails';
import CashierBankDetails from '../components/add-cashier/CashierBankDetails';
import CashierDetailsSummary from '../components/add-cashier/CashierDetailsSummary';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';
import { CashierContextType } from '../context/CashierContextType';

export enum ComponentState {
  BankDetails,
  Details,
  DetailsSummary,
}

const CashierContext = createContext<CashierContextType | undefined>(undefined);

export const useCashierContext = () => {
  const context = useContext(CashierContext);
  if (!context) {
    throw new Error('useCashierContext must be used within a CashierProvider');
  }
  return context;
};

const AddCashier = () => {
  const [currentComponent, setCurrentComponent] = useState(
    ComponentState.Details
  );

  const [cashierDetails, setCashierDetails] = useState({
    nickname: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    image: '',
    bankAccountNumber: '',
    bankName: '',
    branchName: '',
    currency: '',
    additionalNotes: '',
    NICnumber: '',
    DOB: new Date(),
    addressLine01: '',
    addressLine02: '',
    city: '',
    province: '',
    username: '',
    role: '',
    assignBranch: '',
    baseSalary: 0,
  } as CashierDetailsType);

  const contextValue: CashierContextType = {
    currentComponent,
    setCurrentComponent,
    setCashierDetails,
    cashierDetails,
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case ComponentState.BankDetails:
        return <CashierBankDetails />;
      case ComponentState.Details:
        return <CashierDetails />;
      case ComponentState.DetailsSummary:
        return <CashierDetailsSummary />;
      default:
        return null;
    }
  };

  return (
    <CashierContext.Provider value={contextValue}>
      <div className=' bg-indigo-100 h-screen font-poppins'>
        <CashierManagerNavBar topic='Add Cashier' />
        {renderComponent()}
      </div>
    </CashierContext.Provider>
  );
};

export default AddCashier;
