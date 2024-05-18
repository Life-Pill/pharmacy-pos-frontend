import useAxiosInstance from '../../login/services/useAxiosInstance';
import { Item } from '../interfaces/Item';

const useItemService = () => {
  const http = useAxiosInstance();
  const fetchItems = async () => {
    try {
      // const res = await http.get()
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
    createItem,
    updateItem,
    deleteItem,
  };
};
