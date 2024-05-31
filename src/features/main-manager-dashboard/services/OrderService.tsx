import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { Order } from '../interfaces/OrderDetails';

const useOrderService = () => {
  const [loading, setLoading] = useState(false);
  const http = useAxiosInstance();
  const [orderData, setOrderData] = useState<Order[]>();

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const res = await http.get('/order/getAllOrdersWithDetails');
      console.log(res.data.data);
      setOrderData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(orderData);
      setLoading(false);
    }
  };

  return {
    fetchOrderData,
    orderData,
    loading,
  };
};

export default useOrderService;
