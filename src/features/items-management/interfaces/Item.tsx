export interface Item {
  itemId: number;
  branchId: number;
  itemName: string;
  sellingPrice: number;
  itemBarCode: string;
  supplyDate: string; // Assuming ISO 8601 format string
  supplierPrice: number;
  itemManufacture: string;
  itemQuantity: number;
  measuringUnitType: string; // Enum type for measuring units (KG, G, MG, L, ML, PIECE, TABLET, etc.)
  manufactureDate: string; // Assuming ISO 8601 format string
  expireDate: string; // Assuming ISO 8601 format string
  purchaseDate: string; // Assuming ISO 8601 format string
  warrantyPeriod: string;
  rackNumber: string;
  discountedPrice: number;
  discountedPercentage: number;
  warehouseName: string;
  itemImage: string;
  itemDescription: string;
  categoryId: number;
  supplierId: number;
  specialCondition: boolean;
  stock: boolean;
  discounted: boolean;
  freeIssued: boolean;
}
