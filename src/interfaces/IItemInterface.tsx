export interface IItemInterface {
  itemId: string;
  itemName: string;
  sellingPrice: number;
  itemBarCode: string;
  supplyDate: Date; // You can use Date type if you prefer
  supplierPrice: number;
  itemManufacture: string;
  itemQuantity: number;
  itemCategory: string;
  measuringUnitType: string;
  manufactureDate: Date | null; // You can use Date type if you prefer
  expireDate: Date; // You can use Date type if you prefer
  purchaseDate: Date; // You can use Date type if you prefer
  warrantyPeriod: string;
  rackNumber: string;
  discountedPrice: number;
  discountedPercentage: number;
  warehouseName: string;
  itemImage: string;
  itemDescription: string;
  specialCondition: boolean;
  freeIssued: boolean;
  discounted: boolean;
}
