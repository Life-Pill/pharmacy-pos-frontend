import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { Order } from '../interfaces/OrderDetails';
import { filterOrdersByBranch } from '../utils/filterUtils';

const useOrderManagementService = () => {
  const [loading, setLoading] = useState(false);
  const http = useAxiosInstance();
  const [orderData, setOrderData] = useState<Order[]>();
  const [filteredOrderData, setFilteredOrderData] = useState<Order[]>();
  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const res = await http.get('/order/getAllOrdersWithDetails');
      console.log(res.data.data);
      setOrderData(res.data.data);
      const filtered = orderData?.filter((order) => {
        filterOrdersByBranch(order, '3');
      });
      setFilteredOrderData(filtered);
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
