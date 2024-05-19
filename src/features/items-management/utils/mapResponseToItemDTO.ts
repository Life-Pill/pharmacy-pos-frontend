import { ItemResponseDTO } from '../interfaces/ItemResponseDTO';

// Assuming the response object is named `responseData`
export const mapResponseToItemDTO = (responseData: any): ItemResponseDTO => {
  return {
    itemId: responseData.data.itemId,
    itemName: responseData.data.itemName,
    sellingPrice: responseData.data.sellingPrice,
    itemBarCode: responseData.data.itemBarCode,
    supplyDate: responseData.data.supplyDate,
    supplierPrice: responseData.data.supplierPrice,
    itemManufacture: responseData.data.itemManufacture,
    itemQuantity: responseData.data.itemQuantity,
    measuringUnitType: responseData.data.measuringUnitType,
    manufactureDate: responseData.data.manufactureDate,
    expireDate: responseData.data.expireDate,
    purchaseDate: responseData.data.purchaseDate,
    warrantyPeriod: responseData.data.warrantyPeriod,
    rackNumber: responseData.data.rackNumber,
    discountedPrice: responseData.data.discountedPrice,
    discountedPercentage: responseData.data.discountedPercentage,
    warehouseName: responseData.data.warehouseName,
    itemImage: responseData.data.itemImage,
    itemDescription: responseData.data.itemDescription,
    itemCategoryDTO: responseData.data.itemCategoryDTO,
    supplierDTO: responseData.data.supplierDTO,
    supplierCompanyDTO: responseData.data.supplierCompanyDTO,
    freeIssued: responseData.data.freeIssued,
    discounted: responseData.data.discounted,
    specialCondition: responseData.data.specialCondition,
    stock: responseData.data.stock,
  };
};
