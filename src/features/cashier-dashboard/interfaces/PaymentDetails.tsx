export interface PaymentDetails {
  paymentMethod: string;
  paymentAmount: number;
  paymentDate: Date;

  paymentNotes: string;
  paymentDiscount: number;
  paidAmount: number;
  customerEmail?: string;
  customerName?: string;
}
