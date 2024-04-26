import { useEffect, useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { mapIItemsToIMedicine } from '../utils/mapIItemsToIMedicine';

const useItemService = () => {
  const http = useAxiosInstance();
  const [items, setItems] = useState([]);

  const getAllItems = async () => {
    try {
      const res = await http.get('/item/get-all-items');
      const data = res.data.data;
      if (data.length === 0) return [];
      const mappedItems = data.map((item: any) => mapIItemsToIMedicine(item));
      setItems(mappedItems);
      return mappedItems;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getItemById = async (id: string) => {
    try {
      const res = await http.get('/item/' + id);
      const items = res.data.data;
      const mappedItems = items.map((item: any) => mapIItemsToIMedicine(item));
      return mappedItems;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getAllItems();
  }); // Fetch items when component mounts

  return { items, getAllItems, getItemById };
};

export default useItemService;
