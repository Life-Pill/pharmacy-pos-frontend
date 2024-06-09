import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { ItemResponseDTO } from '../interfaces/ItemResponseDTO';
import { mapResponseToItemDTO } from '../utils/mapResponseToItemDTO';
import mapItemResponseToItem from '../utils/mapItemDTOtoItem';
import { Item } from '../interfaces/Item';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

  const [item, setItem] = useState({} as Item);
  const navigate = useNavigate();
  const fetchItemById = async (id: number) => {
    try {
      const res = await http.get(`/item/get-item-details-by-id/${id}`);
      const data = mapResponseToItemDTO(res.data);
      console.log(data);
      console.log('data', data);
      setItemDetails(data);
      const itemData = mapItemResponseToItem(data);
      console.log('itemData', itemData);
      setItem(itemData);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(itemDetails);
    }
  };
  const [updating, setUpdating] = useState(false);
  const updateItem = async (item: Item) => {
    setUpdating(true);
    console.log('going to updated here', item);
    try {
      const res = await http.put('/item/update/', item);
      console.log(res);
      toast.success('Item updated successfully');
      navigate('/manager-dashboard/Items');
    } catch (error) {
      console.log(error);
      toast.error('Could not update the item');
    } finally {
      setUpdating(false);
    }
  };

  return {
    fetchItemById,
    itemDetails,
    setItemDetails,
    item,
    setItem,
    updateItem,
    updating,
  };
};

export default useItemUpdateService;
