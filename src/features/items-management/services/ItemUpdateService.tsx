import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { ItemResponseDTO } from '../interfaces/ItemResponseDTO';
import { mapResponseToItemDTO } from '../utils/mapResponseToItemDTO';

const useItemUpdateService = () => {
  const http = useAxiosInstance();
  const [itemDetails, setItemDetails] = useState<ItemResponseDTO>({
    itemId: 0,
    itemName: '',
    sellingPrice: 0,
    itemBarCode: '',
    supplyDate: '',
    supplierPrice: 0,
    itemManufacture: '',
    itemQuantity: 0,
    measuringUnitType: '',
    manufactureDate: '',
    expireDate: '',
    purchaseDate: '',
    warrantyPeriod: '',
    rackNumber: '',
    discountedPrice: 0,
    discountedPercentage: 0,
    warehouseName: '',
    itemImage: '',
    itemDescription: '',
    itemCategoryDTO: {
      categoryId: 0,
      categoryName: '',
      categoryDescription: '',
      categoryImage: '',
    },
    supplierDTO: null,
    supplierCompanyDTO: null,
    freeIssued: false,
    discounted: false,
    specialCondition: false,
    stock: false,
  });
  const fetchItemById = async (id: number) => {
    try {
      const res = await http.get(`/item/get-item-details-by-id/${id}`);
      const data = mapResponseToItemDTO(res.data);
      // console.log(res.data.data);
      console.log('data', data);
      setItemDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(itemDetails);
    }
  };

  return {
    fetchItemById,
    itemDetails,
    setItemDetails,
  };
};

export default useItemUpdateService;
