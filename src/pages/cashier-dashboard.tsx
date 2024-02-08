import React, { useState } from 'react';
import CashierNavBar from '../components/navbar/CashierNavBar';
import CashierSideBar from '../components/sidebar/CashierSideBar';
import MedicineGrid from '../components/cashier_dashboard_medicine_table/MedicineGrid';
import OrderDetailsSideBar from '../containers/cashier_dashboard_order_details_sidebar/OrderDetailsSideBar';
import Divider from '../components/divider/Divider';
import PaymentDrawer from '../containers/cashier_dashboard_payement_sidebar/PaymentDrawer';
import ConfirmPaymentPopUp from '../containers/cashier_dashboard_payment_confirm_popup/ConfirmPaymentPopUp';

type Props = {};

function CashierDashBoardPage({}: Props) {
  const [isConfirmPaymentCardVisible, setIsConfirmPaymentCardVisible] =
    useState<boolean>(false);
  return (
    <div className='flex flex-col h-screen'>
      <div className='w-full'>
        <CashierNavBar />
      </div>

      <div className='flex flex-row flex-grow'>
        <CashierSideBar />
        <Divider />
        <MedicineGrid />
        {/* 
        ! Here i used the payment method for just development there should be a way to switch between these two
         */}
        {/* <OrderDetailsSideBar /> */}

        {/* 
        // TODO: Try to use redux for this
        */}
        <PaymentDrawer
          openConfirmPayment={() => {
            setIsConfirmPaymentCardVisible(true);
          }}
        />
        <ConfirmPaymentPopUp
          isCardVisible={isConfirmPaymentCardVisible}
          onClose={() => {
            setIsConfirmPaymentCardVisible(false);
          }}
        />
      </div>
    </div>
  );
}

export default CashierDashBoardPage;
