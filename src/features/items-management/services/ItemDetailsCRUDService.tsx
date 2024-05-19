import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { Item } from '../interfaces/Item';

const useItemService = () => {
  const http = useAxiosInstance();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const fetchAllItems = async () => {
    try {
      const res = await http.get('/item/get-all-items');
      const data: Item[] = res.data.data;
      console.log(res.data.data);
      setItems(data);
      setFilteredItems(data);
      console.log(items);
    } catch (error) {}
  };
  const createItem = (item: Item) => {
    // Create item logic
  };

  const updateItem = (item: Item) => {
    // Update item logic
  };

  const deleteItem = (itemId: string) => {
    // Delete item logic
  };

  return {
    fetchAllItems,
    items,
    filteredItems,
    setFilteredItems,
  };
};

export default useItemService;
