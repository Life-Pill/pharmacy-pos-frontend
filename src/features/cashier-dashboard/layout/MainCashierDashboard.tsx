import React, { useState } from 'react';
import OrderDetailsSideBar from '../../../containers/cashier_dashboard_order_details_sidebar/OrderDetailsSideBar';
import ConfirmPaymentPopUp from '../../../containers/cashier_dashboard_payment_confirm_popup/ConfirmPaymentPopUp';
import Divider from '../../../shared/divider/Divider';
import CashierNavBar from '../../../shared/navbar/CashierNavBar';
import Medicine from '../components/medicine-table/Medicine';
import CashierSideBar from '../components/sidebar/CashierSideBar';
import PaymentDrawer from '../../../containers/cashier_dashboard_payement_sidebar/PaymentDrawer';

type Props = {};

export enum ComponentState {
  OrderDetails,
  ConfirmPayment,
  PopupPayment,
}

interface PaymentContextType {
  currentComponent: ComponentState;
  setCurrentComponent: React.Dispatch<React.SetStateAction<ComponentState>>;
}

const PaymentContext = React.createContext<PaymentContextType | undefined>(
  undefined
);

export const usePaymentContext = () => {
  const context = React.useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};

function MainCashierDashboard({}: Props) {
  const [currentComponent, setCurrentComponent] = useState(
    ComponentState.OrderDetails
  );

  const contextValue: PaymentContextType = {
    currentComponent,
    setCurrentComponent,
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case ComponentState.OrderDetails:
        return <OrderDetailsSideBar />;
      case ComponentState.ConfirmPayment:
        return <PaymentDrawer />;
      case ComponentState.PopupPayment:
        return <ConfirmPaymentPopUp />;
      default:
        return <OrderDetailsSideBar />;
    }
  };

  const [isConfirmPaymentCardVisible, setIsConfirmPaymentCardVisible] =
    useState<boolean>(false);

  return (
    <div className='flex flex-col'>
      <div>
        <CashierNavBar />
      </div>

      <div className='flex flex-row'>
        <CashierSideBar />
        <Divider />
        <Medicine />

        <PaymentContext.Provider value={contextValue}>
          {renderComponent()}
        </PaymentContext.Provider>
      </div>
    </div>
  );
}

export default MainCashierDashboard;
