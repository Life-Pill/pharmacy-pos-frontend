import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { BranchSalesDetails } from '../interfaces/BranchSaleDetails';
import { useUserContext } from '../../../context/UserContext';

const useSalesSummary = () => {
  const http = useAxiosInstance();
  const [loading, setLoading] = useState(false);
  const [salesSummary, setSalesSummary] = useState<BranchSalesDetails[]>([]);

  const user = useUserContext();
  const getSalesSummary = async () => {
    setLoading(true);
    try {
      const response = await http.get(
        `/branch/summary/daily-sales/${user.user?.branchId}`
      );
      console.log(response.data.data);
      // Extract dailySales array from the nested response and map to expected format
      const dailySalesData = response.data.data.dailySales.map((item: any) => ({
        date: item.date,
        orders: item.orderCount,
        sales: item.totalSales,
      }));
      setSalesSummary(dailySalesData);
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
