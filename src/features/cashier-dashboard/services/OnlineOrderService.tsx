import axios from 'axios';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';

const useOnlineOrderService = () => {
  const http = useAxiosInstance();
  const user = useUserContext();

  const getOnlineOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8081/prescriptionOrders/${user.user?.branchId}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getOnlineOrders,
  };
};

export default useOnlineOrderService;
