import { Link, useParams } from 'react-router-dom';
import CashierManagerNavBar from '../components/navbar/CashierManagerNavBar';
import useBankCRUDService from '../services/BankDetailsCRUDService';
import useCashierCRUDService from '../services/CashierCRUDService';
import { useEffect, useState } from 'react';
import { CashierContext, ComponentState } from './AddCashier';
import { CashierContextType } from '../context/CashierContextType';
import ViewCashierComponent from '../components/view-cashier/ViewCashier';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';

const ViewCashier = () => {
  const [currentComponent, setCurrentComponent] = useState(
    ComponentState.Details
  );

  const [cashierDetails, setCashierDetails] = useState({
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
  } as CashierDetailsType);

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

  return (
    <CashierContext.Provider value={contextValue}>
      <div className='bg-indigo-100 h-screen font-poppins'>
        <CashierManagerNavBar topic='View Cashier' />
        <ViewCashierComponent />
      </div>
    </CashierContext.Provider>
  );
};

export default ViewCashier;
