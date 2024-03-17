import React from 'react';
import { ComponentState } from '../layout/MainCashierDashboard';
import { OrderedMedicine } from './OrderMedicine';
import { PaymentDetails } from './PaymentDetails';

export interface PaymentContextType {
  currentComponent: ComponentState;
  setCurrentComponent: React.Dispatch<React.SetStateAction<ComponentState>>;
  paymentDetails: PaymentDetails;
  setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>;
  orderedMedicine: OrderedMedicine[];
  setOrderedMedicine: React.Dispatch<React.SetStateAction<OrderedMedicine[]>>;
}
