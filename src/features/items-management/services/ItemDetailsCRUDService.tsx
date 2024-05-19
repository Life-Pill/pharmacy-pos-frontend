import { useEffect, useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { Item } from '../interfaces/Item';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const useItemService = () => {
  const http = useAxiosInstance();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [shouldCreate, setShouldCreate] = useState(false); // New state to trigger item creation
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item>({
    itemId: 0,
    branchId: 0,
    itemName: '',
    sellingPrice: 0,
    itemBarCode: '555555555555',
    supplyDate: '', // Assuming ISO 8601 format ""
    supplierPrice: 0,
    itemManufacture: '',
    itemQuantity: 0,
    measuringUnitType: 'KILO_GRAM', // Enum type for measuring units
    manufactureDate: '', // Assuming ISO 8601 format ""
    expireDate: '', // Assuming ISO 8601 format ""
    purchaseDate: '', // Assuming ISO 8601 format ""
    warrantyPeriod: '',
    rackNumber: '',
    discountedPrice: 0,
    discountedPercentage: 0,
    warehouseName: '',
    itemImage: '',
    itemDescription: '',
    categoryId: 1,
    supplierId: 1,
    specialCondition: false,
    stock: false,
    discounted: false,
    freeIssued: false,
  });

  const fetchAllItems = async () => {
    setLoading(true);
    try {
      const res = await http.get('/item/get-all-items');
      const data: Item[] = res.data.data;
      console.log(res.data.data);
      setItems(data);
      setFilteredItems(data);
      // console.log(items);
    } catch (error) {
      console.log(error);
      toast.error('Could not fetch medicine');
    } finally {
      setLoading(false);
    }
  };
  const preSet = () => {
    let updatedItem = { ...item };

    if (updatedItem.itemQuantity > 0) {
      updatedItem.stock = true;
    }

    if (updatedItem.discountedPercentage > 0) {
      updatedItem.discounted = true;
      updatedItem.discountedPrice = parseFloat(
        (
          updatedItem.sellingPrice -
          (updatedItem.sellingPrice * updatedItem.discountedPercentage) / 100
        ).toFixed(2)
      );
    }
    if (user) {
      updatedItem.branchId = user.branchId;
    }

    setItem(updatedItem);
    setShouldCreate(true); // Trigger item creation after state update
  };

  useEffect(() => {
    if (shouldCreate) {
      createItem();
      setShouldCreate(false); // Reset the trigger
    }
  }, [shouldCreate]);

  const createItem = async () => {
    console.log('createItem', item);
    setCreating(true);
    try {
      const res = await http.post('/item/save-item', item);
      if (res.data.code === 201) {
        toast.success(res.data.message);
        navigate('/item-management-window');
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Could not create the item');
    } finally {
      setCreating(false);
    }
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
    createItem,
    item,
    setItem,
    loading,
    creating,
    preSet,
  };
};

export default useItemService;
