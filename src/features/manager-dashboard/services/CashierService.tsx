import { useState } from 'react';
import { CashierDetailsType } from '../../cashier-management/interfaces/CashierDetailsType';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { toast } from 'react-toastify';

const useCashierService = () => {
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState<CashierDetailsType[]>([]);
  const http = useAxiosInstance();
  const [filteredCashiers, setFilteredCashiers] = useState<
    CashierDetailsType[]
  >([]);

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const res = await http.get('/employers/get-all-employers');
      console.log(res);
      const data: CashierDetailsType[] = res.data.data;
      // if (data.length === 0) return [];
      setWorkers(data);
      setFilteredCashiers(data);
      // return data;
    } catch (error) {
      console.error(error);
      toast.error('Error while fetching all employers');
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchEmployeeData,
    loading,
    workers,
    setWorkers,
    filteredCashiers,
    setFilteredCashiers,
  };
};

export default useCashierService;
