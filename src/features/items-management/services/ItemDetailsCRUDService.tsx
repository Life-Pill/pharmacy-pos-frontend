import { useEffect, useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { Item } from '../interfaces/Item';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import validateItem from '../utils/validation';

const useItemService = () => {
  const http = useAxiosInstance();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [shouldCreate, setShouldCreate] = useState(false); // New state to trigger item creation
  const { user } = useUserContext();
  const navigate = useNavigate();
  // const [deleting, setDeleting] = useState(false);

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
    measuringUnitType: 'PIECE', // Enum type for measuring units
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

  // const createItem = async () => {
  //   console.log('createItem', item);
  //   setCreating(true);

  //   if (!validateItem(item)) {
  //     setCreating(false);
  //     return;
  //   }

  //   try {
  //     const res = await http.post('/item/save-item', item);
  //     if (res.data.code === 201) {
  //       toast.success(res.data.message);
  //       navigate('/manager-dashboard/Items');
  //     }
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Could not create the item');
  //   } finally {
  //     setCreating(false);
  //   }
  // };

  const [itemImage, setItemImage] = useState<File | null>();

  const createItem = async () => {
    console.log('createItem', item);
    const formData = new FormData();
    formData.append('itemName', item.itemName);
    formData.append('branchId', item.branchId.toString());
    formData.append('sellingPrice', item.sellingPrice.toString());
    formData.append('itemBarCode', item.itemBarCode);
    formData.append('supplyDate', item.supplyDate.toString());
    formData.append('supplierPrice', item.supplierPrice.toString());
    formData.append('itemManufacture', item.itemManufacture);
    formData.append('itemQuantity', item.itemQuantity.toString());
    formData.append('measuringUnitType', item.measuringUnitType);
    formData.append('manufactureDate', item.manufactureDate.toString());
    formData.append('expireDate', item.expireDate.toString());
    formData.append('purchaseDate', item.purchaseDate.toString());
    formData.append('warrantyPeriod', item.warrantyPeriod);
    formData.append('rackNumber', item.rackNumber);
    formData.append('discountedPrice', item.discountedPrice.toString());
    formData.append(
      'discountedPercentage',
      item.discountedPercentage.toString()
    );
    formData.append('warehouseName', item.warehouseName);
    // Don't append itemImage as string - only file is needed
    formData.append('itemDescription', item.itemDescription);
    formData.append('categoryId', item.categoryId.toString());
    formData.append('supplierId', item.supplierId.toString());
    formData.append('specialCondition', item.specialCondition.toString());
    formData.append('stock', item.stock.toString());
    formData.append('discounted', item.discounted.toString());
    formData.append('freeIssued', item.freeIssued.toString());

    if (itemImage) {
      formData.append('file', itemImage, itemImage.name);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    setCreating(true);

    if (!validateItem(item)) {
      setCreating(false);
      return;
    }

    console.log('Sending request to:', '/item/save-item-with-image');
    console.log('FormData entries count:', Array.from(formData.entries()).length);

    try {
      const res = await http.post('/item/save-item-with-image', formData);
      if (res.data.code === 201) {
        toast.success(res.data.message);
        navigate('/manager-dashboard/Items');
      } else {
        toast.error(res.data.message || 'Failed to create item');
      }
      console.log(res);
    } catch (error: any) {
      console.error('Item creation error:', error);
      toast.error(error?.response?.data?.message || 'Could not create the item');
    } finally {
      setCreating(false);
    }
  };

  // const fetchItemByName = async (itemName: string) => {
  //   try {
  //     const res = await http.get('/item/get-by-name');
  //   } catch (error) {}
  // };

  // const updateItem = (item: Item) => {
  //   // Update item logic
  // };

  const deleteItem = async (itemId: number) => {
    // Prompt a confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete item ${itemId}?`
    );

    if (confirmed) {
      try {
        // Send delete request if user confirms
        const res = await http.delete(`/item/delete-item/${itemId}`);
        console.log(res);

        toast.success(`Item deleted successfully: ${itemId}`);
        fetchAllItems();
      } catch (error) {
        console.log(error);
        toast.error(`Could not delete item: ${itemId}`);
      }
    } else {
      // Show message if user cancels deletion
      toast.info('Deletion canceled.');
    }
  };

  const [itemString, setItemString] = useState<any>();
  const [fetchItemString, setFetchItemString] = useState<boolean>(false);
  const fetchItemImage = async (itemId: string) => {
    try {
      setFetchItemString(true);
      const res = await http.get(`/item/view-item-image/${itemId}`, {
        responseType: 'arraybuffer', // Ensure response type is set correctly
      });
      const base64String = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      console.log(res);
      setItemString(`data:image/jpeg;base64,${base64String}`);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchItemString(false);
    }
  };

  const [updatingItemImage, setUpdatingItemImage] = useState<boolean>(false);
  const updateItemImage = async (itemId: string) => {
    const itemImageFormData = new FormData();
    if (itemImage) {
      itemImageFormData.append('file', itemImage, itemImage?.name);
    } else {
      toast.error('Image is not provided');
      return;
    }

    try {
      setUpdatingItemImage(true);
      const res = await http.put(
        `/item/update-item-image/${parseInt(itemId)}`,
        itemImageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingItemImage(false);
    }
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
    deleteItem,
    setItemImage,
    itemImage,
    itemString,
    fetchItemImage,
    fetchItemString,
    updatingItemImage,
    updateItemImage,
  };
};

export default useItemService;
