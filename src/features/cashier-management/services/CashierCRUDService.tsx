import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';

const useCashierCRUDService = () => {
  const http = useAxiosInstance();
  const user = useUserContext();
  const [loading, setLoading] = useState(false);

  const createCashier = async (employer: CashierDetailsType) => {
    setLoading(true);
    try {
      const res = await http.post('/employers/save-without-image', employer);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { createCashier, loading };
};

export default useCashierCRUDService;
