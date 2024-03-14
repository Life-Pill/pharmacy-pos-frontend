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
  paymentDetails: PaymentDetails;
  setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>;
  orderedMedicine: OrderedMedicine[];
  setOrderedMedicine: React.Dispatch<React.SetStateAction<OrderedMedicine[]>>;
}

interface PaymentDetails {
  paymentMethod: string;
  paymentAmount: number;
  paymentDate: Date;
  paymentType: string;
  paymentNotes: string;
  paymentDiscount: number;
  paidAmount: number;
}

export interface OrderedMedicine {
  id: string;
  name: string;
  unitPrice: number;
  amount: number;
  availableQuantity: number;
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

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: '',
    paymentAmount: 0,
    paymentDate: new Date(),
    paymentType: '',
    paymentNotes: '',
    paymentDiscount: 0,
    paidAmount: 0,
  });

  const [orderedMedicine, setOrderedMedicine] = useState<OrderedMedicine[]>([]);

  const contextValue: PaymentContextType = {
    currentComponent,
    setCurrentComponent,
    paymentDetails,
    setPaymentDetails,
    orderedMedicine,
    setOrderedMedicine,
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
        <PaymentContext.Provider value={contextValue}>
          <Medicine />

          {renderComponent()}
        </PaymentContext.Provider>
      </div>
    </div>
  );
}

export default MainCashierDashboard;
