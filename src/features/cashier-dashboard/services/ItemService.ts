import http from '../../../services/http-common';
import { OrderedMedicine } from '../interfaces/OrderMedicine';
import { mapIItemsToIMedicine } from '../utils/mapIItemsToIMedicine';

export const getAllItems = async () => {
  try {
    const res = await http.get('/item/get-all-items');
    console.log(res);
    const items = res.data.data;
    //map to ordered item
    if (items.length === 0) return [];

    const mappedItems = items.map((item: any) => mapIItemsToIMedicine(item));
    console.log(mappedItems);
    return mappedItems;
  } catch (error) {
    console.log(error);
  }
};

//get item by id
export const getItemById = async (id: string) => {
  try {
    const res = await http.get('/item/' + id);
    const items = res.data.data;
    const mappedItems = items.map((item: any) => mapIItemsToIMedicine(item));
    console.log(mappedItems);
    return mappedItems;
  } catch (error) {
    console.log(error);
  }
};

//update the items in the inventory
export const updateInventory = async (orderdMedicne: OrderedMedicine[]) => {
  orderdMedicne.forEach(async (item) => {
    // try {
    //   const res = await http.put('/item/update/', {
    //     itemId: item.id,
    //     itemQuantity: item.availableQuantity - item.amount,
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  });
};
