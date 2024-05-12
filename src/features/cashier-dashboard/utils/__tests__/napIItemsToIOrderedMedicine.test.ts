import { IItemInterface } from '../../../../interfaces/IItemInterface';
import { OrderedMedicine } from '../../interfaces/OrderMedicine';
import { mapIItemsToIOrderedMedicine } from '../mapIItemsToIOrderedMedicine';

describe('mapIItemsToIOrderedMedicine function', () => {
  it('should map item interface to ordered medicine interface correctly', () => {
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

    const mappedOrderedMedicine: OrderedMedicine =
      mapIItemsToIOrderedMedicine(mockItem);

    expect(mappedOrderedMedicine).toEqual({
      id: '1',
      name: 'Test Medicine',
      unitPrice: 10,
      amount: 0,
      availableQuantity: 5,
    });
  });
});
