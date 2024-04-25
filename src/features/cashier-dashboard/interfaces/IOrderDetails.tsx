import { OrderedMedicine } from './OrderMedicine';
import { PaymentDetails } from './PaymentDetails';

export interface IOrderDetails {
  employerId: number;
  branchId: number;
  paymentDetails: PaymentDetails;
  orderMedicines: OrderedMedicine[];
}
