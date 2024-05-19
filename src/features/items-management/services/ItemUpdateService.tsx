import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { ItemResponseDTO } from '../interfaces/ItemResponseDTO';

const useItemUpdateService = () => {
  const http = useAxiosInstance();
  const [itemDetails, setItemDetails] = useState<ItemResponseDTO>();
  const fetchItemById = async (id: number) => {
    try {
      const res = await http.get(`/item/get-item-details-by-id/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchItemById,
  };
};

export default useItemUpdateService;
