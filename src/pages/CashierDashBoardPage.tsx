import React from 'react';
import CashierNavBar from '../components/navbar/CashierNavBar';
import CashierSideBar from '../components/sidebar/CashierSideBar';
import MedicineGrid from '../components/medicinetable/MedicineGrid';
import OrderDetailsSideBar from '../components/cashierOrderDetailsSideBar/OrderDetailsSideBar';
import Divider from '../components/divider/Divider';

type Props = {};

function CashierDashBoardPage({}: Props) {
  return (
    <div className='flex flex-col h-screen'>
      <div className='w-full'>
        <CashierNavBar />
      </div>

      <div className='flex flex-row flex-grow'>
        <CashierSideBar />

        <Divider />

        <MedicineGrid />

        <OrderDetailsSideBar />
      </div>
    </div>
  );
}

export default CashierDashBoardPage;
