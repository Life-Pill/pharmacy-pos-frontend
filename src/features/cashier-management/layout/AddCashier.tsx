import React, { ChangeEvent, useState } from 'react';
import CashierManagerNavBar from '../components/navbar/CashierManagerNavBar';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import CashierDetails from '../components/add-cashier/CashierDetails';
import CashierBankDetails from '../components/add-cashier/CashierBankDetails';

const AddCashier = () => {
  return (
    <div className=' bg-indigo-100 h-screen font-poppins'>
      <CashierManagerNavBar />
      {/* <CashierDetails /> */}
      <CashierBankDetails />
    </div>
  );
};

export default AddCashier;
