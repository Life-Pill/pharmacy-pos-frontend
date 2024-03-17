export interface PaymentDetails {
  paymentMethod: string;
  paymentAmount: number;
  paymentDate: Date;
  paymentType: string;
  paymentNotes: string;
  paymentDiscount: number;
  paidAmount: number;
}
