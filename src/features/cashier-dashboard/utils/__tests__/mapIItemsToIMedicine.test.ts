import { IItemInterface } from '../../../../interfaces/IItemInterface';
import { IMedicine } from '../../../../interfaces/IMedicine';
import { mapIItemsToIMedicine } from '../mapIItemsToIMedicine';

describe('mapIItemsToIMedicine function', () => {
  it('should map item interface to medicine interface correctly', () => {
    const mockItem: IItemInterface = {
      itemId: '1',
      itemName: 'Test Medicine',
      sellingPrice: 10,
      itemQuantity: 5,
      itemImage: 'path/to/image.jpg',
      itemCategory: 'Category',
      itemBarCode: '',
      supplyDate: new Date(),
      supplierPrice: 0,
      itemManufacture: '',
      measuringUnitType: '',
      manufactureDate: null,
      expireDate: new Date(),
      purchaseDate: new Date(),
      warrantyPeriod: '',
      rackNumber: '',
      discountedPrice: 0,
      discountedPercentage: 0,
      warehouseName: '',
      itemDescription: '',
      specialCondition: false,
      freeIssued: false,
      discounted: false,
    };

    const mappedMedicine: IMedicine = mapIItemsToIMedicine(mockItem);

    expect(mappedMedicine).toEqual({
      id: 1,
      name: 'Test Medicine',
      price: 10,
      quantity: 5,
      status: 'In Stock',
      image: 'path/to/image.jpg',
      category: 'Category',
    });
  });

  it('should handle out of stock item correctly', () => {
    const mockItem: IItemInterface = {
      itemId: '2',
      itemName: 'Out of Stock Medicine',
      sellingPrice: 15,
      itemQuantity: 0,
      itemImage: 'path/to/image.jpg',
      itemCategory: 'Category',
      itemBarCode: '',
      supplyDate: new Date(),
      supplierPrice: 0,
      itemManufacture: '',
      measuringUnitType: '',
      manufactureDate: null,
      expireDate: new Date(),
      purchaseDate: new Date(),
      warrantyPeriod: '',
      rackNumber: '',
      discountedPrice: 0,
      discountedPercentage: 0,
      warehouseName: '',
      itemDescription: '',
      specialCondition: false,
      freeIssued: false,
      discounted: false,
    };

    const mappedMedicine: IMedicine = mapIItemsToIMedicine(mockItem);

    expect(mappedMedicine).toEqual({
      id: 2,
      name: 'Out of Stock Medicine',
      price: 15,
      quantity: 0,
      status: 'Out of Stock',
      image: 'path/to/image.jpg',
      category: 'Category',
    });
  });

  it('should handle negative price correctly', () => {
    const mockItem: IItemInterface = {
      itemId: '3',
      itemName: 'Negative Price Medicine',
      sellingPrice: -5,
      itemQuantity: 10,
      itemImage: 'path/to/image.jpg',
      itemCategory: 'Category',
      itemBarCode: '',
      supplyDate: new Date(),
      supplierPrice: 0,
      itemManufacture: '',
      measuringUnitType: '',
      manufactureDate: null,
      expireDate: new Date(),
      purchaseDate: new Date(),
      warrantyPeriod: '',
      rackNumber: '',
      discountedPrice: 0,
      discountedPercentage: 0,
      warehouseName: '',
      itemDescription: '',
      specialCondition: false,
      freeIssued: false,
      discounted: false,
    };

    const mappedMedicine: IMedicine = mapIItemsToIMedicine(mockItem);

    expect(mappedMedicine).toEqual({
      id: 3,
      name: 'Negative Price Medicine',
      price: -5,
      quantity: 10,
      status: 'In Stock',
      image: 'path/to/image.jpg',
      category: 'Category',
    });
  });

  it('should handle undefined image correctly', () => {
    const mockItem: IItemInterface = {
      itemId: '4',
      itemName: 'Medicine without Image',
      sellingPrice: 20,
      itemQuantity: 3,
      itemCategory: 'Category',
      itemBarCode: '',
      supplyDate: new Date(),
      supplierPrice: 0,
      itemManufacture: '',
      measuringUnitType: '',
      manufactureDate: null,
      expireDate: new Date(),
      purchaseDate: new Date(),
      warrantyPeriod: '',
      rackNumber: '',
      discountedPrice: 0,
      discountedPercentage: 0,
      warehouseName: '',
      itemImage: '',
      itemDescription: '',
      specialCondition: false,
      freeIssued: false,
      discounted: false,
    };

    const mappedMedicine: IMedicine = mapIItemsToIMedicine(mockItem);

    expect(mappedMedicine).toEqual({
      id: 4,
      name: 'Medicine without Image',
      price: 20,
      quantity: 3,
      status: 'In Stock',
      image: undefined,
      category: 'Category',
    });
  });

  it('should handle empty item name correctly', () => {
    const mockItem: IItemInterface = {
      itemId: '5',
      itemName: '',
      sellingPrice: 10,
      itemQuantity: 2,
      itemImage: 'path/to/image.jpg',
      itemCategory: 'Category',
      itemBarCode: '',
      supplyDate: new Date(),
      supplierPrice: 0,
      itemManufacture: '',
      measuringUnitType: '',
      manufactureDate: null,
      expireDate: new Date(),
      purchaseDate: new Date(),
      warrantyPeriod: '',
      rackNumber: '',
      discountedPrice: 0,
      discountedPercentage: 0,
      warehouseName: '',
      itemDescription: '',
      specialCondition: false,
      freeIssued: false,
      discounted: false,
    };

    const mappedMedicine: IMedicine = mapIItemsToIMedicine(mockItem);

    expect(mappedMedicine).toEqual({
      id: 5,
      name: '',
      price: 10,
      quantity: 2,
      status: 'In Stock',
      image: 'path/to/image.jpg',
      category: 'Category',
    });
  });

  it('should handle null item name correctly', () => {
    const mockItem: IItemInterface = {
      itemId: '6',
      itemName: 'null',
      sellingPrice: 15,
      itemQuantity: 1,
      itemImage: 'path/to/image.jpg',
      itemCategory: 'Category',
      itemBarCode: '',
      supplyDate: new Date(),
      supplierPrice: 0,
      itemManufacture: '',
      measuringUnitType: '',
      manufactureDate: null,
      expireDate: new Date(),
      purchaseDate: new Date(),
      warrantyPeriod: '',
      rackNumber: '',
      discountedPrice: 0,
      discountedPercentage: 0,
      warehouseName: '',
      itemDescription: '',
      specialCondition: false,
      freeIssued: false,
      discounted: false,
    };

    const mappedMedicine: IMedicine = mapIItemsToIMedicine(mockItem);

    expect(mappedMedicine).toEqual({
      id: '6',
      name: null,
      price: 15,
      quantity: 1,
      status: 'In Stock',
      image: 'path/to/image.jpg',
      category: 'Category',
    });
  });

  // Add more test cases as needed

  // For example, test cases for edge cases, special scenarios, etc.
});
