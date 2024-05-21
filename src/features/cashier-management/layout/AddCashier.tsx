import React, { useState, useContext, createContext } from 'react';
import CashierManagerNavBar from '../components/navbar/CashierManagerNavBar';
import CashierDetails from '../components/add-cashier/CashierDetails';
import CashierBankDetails from '../components/add-cashier/CashierBankDetails';
import CashierDetailsSummary from '../components/add-cashier/CashierDetailsSummary';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';
import { CashierContextType } from '../context/CashierContextType';
import { EmployerBankDetails } from '../interfaces/EmployerBankDetails';

export enum ComponentState {
  BankDetails,
  Details,
  DetailsSummary,
}

export const CashierContext = createContext<CashierContextType | undefined>(
  undefined
);

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

  const [cashierDetails, setCashierDetails] = useState<CashierDetailsType>({
    employerNicName: '',
    employerFirstName: '',
    employerLastName: '',
    employerEmail: '',
    employerPhone: '',
    employerPassword: '',
    employerConfirmPassword: '',
    profileImage: '',
    branchId: 0,
    employerNic: '',
    dateOfBirth: '',
    employerAddress: '',
    pin: 0,
    role: 'CASHIER',
    employerSalary: 0,
    gender: 'MALE',
  } as CashierDetailsType);

  const [cashierBankDetails, setCashierBankDetails] =
    useState<EmployerBankDetails>({
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
