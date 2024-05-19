import { toast } from 'react-toastify';
import { Item } from '../interfaces/Item';

const validateItem = (item: Item): boolean => {
  if (!item.itemName) {
    toast.error('Item name is required');
    return false;
  }
  if (item.sellingPrice <= 0) {
    toast.error('Selling price must be greater than 0');
    return false;
  }
  if (!item.itemBarCode) {
    toast.error('Item barcode is required');
    return false;
  }
  if (!item.itemManufacture) {
    toast.error('Item manufacture is required');
    return false;
  }
  if (item.itemQuantity <= 0) {
    toast.error('Item quantity must be greater than 0');
    return false;
  }
  if (!item.measuringUnitType) {
    toast.error('Measuring unit type is required');
    return false;
  }
  if (!item.manufactureDate) {
    toast.error('Manufacture date is required');
    return false;
  }
  if (!item.expireDate) {
    toast.error('Expire date is required');
    return false;
  }
  if (!item.purchaseDate) {
    toast.error('Purchase date is required');
    return false;
  }
  if (!item.warrantyPeriod) {
    toast.error('Warranty period is required');
    return false;
  }
  if (!item.rackNumber) {
    toast.error('Rack number is required');
    return false;
  }
  if (!item.warehouseName) {
    toast.error('Warehouse name is required');
    return false;
  }
  if (!item.itemDescription) {
    toast.error('Item description is required');
    return false;
  }
  // Add more validation rules as needed
  return true;
};

export default validateItem;
