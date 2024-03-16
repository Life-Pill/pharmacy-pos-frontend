import http from '../../../services/http-common';
import { OrderedMedicine } from '../interfaces/OrderMedicine';
import { mapIItemsToIMedicine } from '../utils/mapIItemsToIMedicine';

const getAllItems = async () => {
  try {
    const res = await http.get('/item/get-all-items');
    //console.log(res);
    const items = res.data.data;
    //map to ordered item
    const mappedItems = items.map((item: any) => mapIItemsToIMedicine(item));
    console.log(mappedItems);
    return mappedItems;
  } catch (error) {
    console.log(error);
  }
};

//get item by id
const getItemById = async (id: string) => {
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

export default getAllItems;
