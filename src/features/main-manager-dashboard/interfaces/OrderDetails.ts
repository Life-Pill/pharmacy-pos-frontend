interface OrderDetail {
  name: string;
  amount: number;
  id: number;
}

interface PaymentDetails {
  paymentMethod: string;
  paymentAmount: number;
  paymentDate: string;
  paymentNotes: string;
  paymentDiscount: number;
  payedAmount: number;
}

interface GroupedOrderDetails {
  orderDetails: OrderDetail[];
  paymentDetails: PaymentDetails;
  orderCount: number;
}

export interface Order {
  employerId: number;
  branchId: number;
  orderDate: string;
  total: number;
  groupedOrderDetails: GroupedOrderDetails;
}
