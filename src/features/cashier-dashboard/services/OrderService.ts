import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { OrderedMedicine } from '../interfaces/OrderMedicine';
import { PaymentDetails } from '../interfaces/PaymentDetails';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useOrderService = () => {
  const http = useAxiosInstance();
  const user = useUserContext();
  const [loading, setLoading] = useState(false);

  const addOrder = async (
    orderedMedicine: OrderedMedicine[],
    paymentDetails: PaymentDetails
  ) => {
    setLoading(true);
    try {
      console.log({
        employerId: user.user?.employerId,
        branchId: user.user?.branchId,
        orderDate: new Date(),
        total: paymentDetails.paymentAmount,
        orderDetails: orderedMedicine,
        paymentDetails: paymentDetails,
      });
      const res = await http.post('/order/save', {
        employerId: user.user?.employerId,
        branchId: user.user?.branchId,
        orderDate: new Date(),
        total: paymentDetails.paymentAmount,
        orderDetails: orderedMedicine,
        paymentDetails: paymentDetails,
      });
      console.log(res);
      setLoading(false);
      // Display success toast
      toast.success('Order placed successfully!');

      //print a bill

      return res.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Error with the server: ' + (error as Error).message);

      return error;
    }
  };

  return { addOrder, loading };
};

export default useOrderService;
