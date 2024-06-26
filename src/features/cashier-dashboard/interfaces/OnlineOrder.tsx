export interface OnlineOrder {
  id: string;
  customerId: number;
  prescriptionId: string;
  prescriptionImageId: string;
  availablePharmacies: { [key: number]: string };
  selectedPharmacyId: number;
  orderStatus: boolean;
  customerMessage: string;
  createdOn: string; // LocalDateTime can be represented as a string in ISO format
}
