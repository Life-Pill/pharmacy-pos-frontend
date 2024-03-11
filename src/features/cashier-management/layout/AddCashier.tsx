import React, { ChangeEvent, useState, useContext, createContext } from 'react';
import CashierManagerNavBar from '../components/navbar/CashierManagerNavBar';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import CashierDetails from '../components/add-cashier/CashierDetails';
import CashierBankDetails from '../components/add-cashier/CashierBankDetails';

interface CashierContextType {
  showBankDetails: boolean;
  setShowBankDetails: React.Dispatch<React.SetStateAction<boolean>>;
  cashierDetailsValues: any; // Define your type for cashier details values
  handleNextButtonClick: (values: any) => void; // Define your type for the function
  handleBackButtonClick: () => void;
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
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [cashierDetailsValues, setCashierDetailsValues] = useState<any>({});

  const handleNextButtonClick = (values: any) => {
    setCashierDetailsValues(values);
    setShowBankDetails(true);
  };

  const handleBackButtonClick = () => {
    setShowBankDetails(false);
  };

  const contextValue: CashierContextType = {
    showBankDetails,
    setShowBankDetails,
    cashierDetailsValues,
    handleNextButtonClick,
    handleBackButtonClick,
  };

  return (
    <CashierContext.Provider value={contextValue}>
      <div className=' bg-indigo-100 h-screen font-poppins'>
        <CashierManagerNavBar />
        {showBankDetails ? <CashierBankDetails /> : <CashierDetails />}
      </div>
    </CashierContext.Provider>
  );
};

export default AddCashier;
