import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { BranchSalesDetails } from '../interfaces/BranchSaleDetails';

const useSalesSummary = () => {
  const http = useAxiosInstance();
  const [loading, setLoading] = useState(false);
  const [salesSummary, setSalesSummary] = useState<BranchSalesDetails[]>([]);

  const getSalesSummary = async () => {
    setLoading(true);
    try {
      const response = await http.get('/branch-summary/sales-summary/daily/3');
      console.log(response.data.data);
      setSalesSummary(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getSalesSummary,
    salesSummary,
  };
};

export default useSalesSummary;
