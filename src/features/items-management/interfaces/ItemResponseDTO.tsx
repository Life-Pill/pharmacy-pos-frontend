import { ItemCategoryDTO } from './ItemCategoryDTO';
import { SupplierCompanyDTO } from './SupplierCompanyDTO';
import { SupplierDTO } from './SupplierDTO';

export interface ItemResponseDTO {
  itemId: number;
  itemName: string;
  sellingPrice: number;
  itemBarCode: string;
  supplyDate: string;
  supplierPrice: number;
  itemManufacture: string;
  itemQuantity: number;
  measuringUnitType: string;
  manufactureDate: string;
  expireDate: string;
  purchaseDate: string;
  warrantyPeriod: string;
  rackNumber: string;
  discountedPrice: number;
  discountedPercentage: number;
  warehouseName: string;
  itemImage: string;
  itemDescription: string;
  itemCategoryDTO: ItemCategoryDTO;
  supplierDTO: SupplierDTO | null;
  supplierCompanyDTO: SupplierCompanyDTO | null;
  freeIssued: boolean;
  discounted: boolean;
  specialCondition: boolean;
  stock: boolean;
}
