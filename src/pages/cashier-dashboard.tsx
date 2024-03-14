import React, { useState } from 'react';
import CashierNavBar from '../shared/navbar/CashierNavBar';
import CashierSideBar from '../features/cashier-dashboard/components/sidebar/CashierSideBar';
import MedicineGrid from '../features/cashier-dashboard/components/medicine-table/MedicineGrid';
import OrderDetailsSideBar from '../containers/cashier_dashboard_order_details_sidebar/OrderDetailsSideBar';
import Divider from '../shared/divider/Divider';
import PaymentDrawer from '../containers/cashier_dashboard_payement_sidebar/PaymentDrawer';
import ConfirmPaymentPopUp from '../containers/cashier_dashboard_payment_confirm_popup/ConfirmPaymentPopUp';
import Medicine from '../features/cashier-dashboard/components/medicine-table/Medicine';
import MainCashierDashboard from '../features/cashier-dashboard/layout/MainCashierDashboard';

type Props = {};

function CashierDashBoardPage({}: Props) {
  return (
    <div>
      <MainCashierDashboard />
    </div>
  );
}

export default CashierDashBoardPage;
