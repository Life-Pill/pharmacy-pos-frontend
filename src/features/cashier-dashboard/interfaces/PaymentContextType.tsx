import React from 'react';
import { ComponentState } from '../layout/MainCashierDashboard';
import { OrderedMedicine } from './OrderMedicine';
import { PaymentDetails } from './PaymentDetails';
import { IMedicine } from '../../../interfaces/IMedicine';

export interface PaymentContextType {
  currentComponent: ComponentState;
  setCurrentComponent: React.Dispatch<React.SetStateAction<ComponentState>>;
  paymentDetails: PaymentDetails;
  setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>;
  orderedMedicine: OrderedMedicine[];
  setOrderedMedicine: React.Dispatch<React.SetStateAction<OrderedMedicine[]>>;
  medicine: IMedicine[];
  setMedicine: React.Dispatch<React.SetStateAction<IMedicine[]>>;
}
