import React from 'react';
import CashierManagerNavBar from '../components/navbar/CashierManagerNavBar';

type Props = {};

function UpdateCashier({}: Props) {
  return (
    <div className='bg-indigo-100 h-screen font-poppins'>
      <CashierManagerNavBar topic='Update Cashier' />
    </div>
  );
}

export default UpdateCashier;
