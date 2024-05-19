import { Item } from '../interfaces/Item';
import { ItemResponseDTO } from '../interfaces/ItemResponseDTO';

const mapItemResponseToItem = (itemResponse: ItemResponseDTO): Item => {
  return {
    itemId: itemResponse.itemId,
    branchId: 0, // Assuming default branchId
    itemName: itemResponse.itemName,
    sellingPrice: itemResponse.sellingPrice,
    itemBarCode: itemResponse.itemBarCode,
    supplyDate: itemResponse.supplyDate,
    supplierPrice: itemResponse.supplierPrice,
    itemManufacture: itemResponse.itemManufacture,
    itemQuantity: itemResponse.itemQuantity,
    measuringUnitType: itemResponse.measuringUnitType,
    manufactureDate: itemResponse.manufactureDate,
    expireDate: itemResponse.expireDate,
    purchaseDate: itemResponse.purchaseDate,
    warrantyPeriod: itemResponse.warrantyPeriod,
    rackNumber: itemResponse.rackNumber,
    discountedPrice: itemResponse.discountedPrice,
    discountedPercentage: itemResponse.discountedPercentage,
    warehouseName: itemResponse.warehouseName,
    itemImage: itemResponse.itemImage,
    itemDescription: itemResponse.itemDescription,
    categoryId: itemResponse.itemCategoryDTO.categoryId,
    supplierId: itemResponse.supplierDTO?.supplierId || 0, // Default to 0 if supplierDTO is null
    specialCondition: itemResponse.specialCondition,
    stock: itemResponse.stock,
    discounted: itemResponse.discounted,
    freeIssued: itemResponse.freeIssued,
  };
};

export default mapItemResponseToItem;
