import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';

const useOrderService = () => {
  const [loading, setLoading] = useState(false);
  const http = useAxiosInstance();

  const fetchOrderData = async () => {
    try {
      const res = http.get('')
    } catch (error) {
      
    }
  }

};

export default useOrderService;
