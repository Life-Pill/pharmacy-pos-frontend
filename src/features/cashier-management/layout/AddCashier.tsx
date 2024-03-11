import React, { ChangeEvent, useState, useContext, createContext } from 'react';
import CashierManagerNavBar from '../components/navbar/CashierManagerNavBar';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import CashierDetails from '../components/add-cashier/CashierDetails';
import CashierBankDetails from '../components/add-cashier/CashierBankDetails';
import CashierDetailsSummary from '../components/add-cashier/CashierDetailsSummary';

export enum ComponentState {
  BankDetails,
  Details,
  DetailsSummary,
}

interface CashierContextType {
  currentComponent: ComponentState;
  setCurrentComponent: React.Dispatch<React.SetStateAction<ComponentState>>;
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

  const contextValue: CashierContextType = {
    currentComponent,
    setCurrentComponent,
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
        <CashierManagerNavBar />
        {renderComponent()}
      </div>
    </CashierContext.Provider>
  );
};

export default AddCashier;
