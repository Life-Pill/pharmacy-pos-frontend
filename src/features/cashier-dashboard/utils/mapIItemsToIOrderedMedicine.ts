import { IItemInterface } from '../../../interfaces/IItemInterface';
import { OrderedMedicine } from '../interfaces/OrderMedicine';

//write a mapping from iitem to ordered medicine
export const mapIItemsToIOrderedMedicine = (
  item: IItemInterface
): OrderedMedicine => {
  return {
    id: item.itemId,
    name: item.itemName,
    unitPrice: item.sellingPrice,
    amount: 0,
    availableQuantity: item.itemQuantity,
  };
};
