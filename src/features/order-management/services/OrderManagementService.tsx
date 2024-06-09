import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { Order } from '../interfaces/OrderDetails';
import { filterOrdersByBranch } from '../utils/filterUtils';
import { useUserContext } from '../../../context/UserContext';

const useOrderManagementService = () => {
  const [loading, setLoading] = useState(false);
  const http = useAxiosInstance();
  const [orderData, setOrderData] = useState<Order[]>();
  const [filteredOrderData, setFilteredOrderData] = useState<Order[]>();
  const user = useUserContext();
  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const res = await http.get(
        `/order/getOrderWithDetailsByBranchId/${user.user?.branchId}`
      );
      console.log(res.data.data);
      setOrderData(res.data.data);
      setFilteredOrderData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(orderData);
      setLoading(false);
    }
  };

  return {
    loading,
    orderData,
    fetchOrderData,
    setFilteredOrderData,
    filteredOrderData,
  };
};

export default useOrderManagementService;
