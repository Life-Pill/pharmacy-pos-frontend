import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { OrderedMedicine } from '../interfaces/OrderMedicine';
import { PaymentDetails } from '../interfaces/PaymentDetails';

const useOrderService = () => {
  const http = useAxiosInstance();
  const user = useUserContext();

  const addOrder = async (
    orderedMedicine: OrderedMedicine[],
    paymentDetails: PaymentDetails
  ) => {
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
        branchId: 3,
        orderDate: new Date(),
        total: paymentDetails.paymentAmount,
        orderDetails: orderedMedicine,
        paymentDetails: paymentDetails,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return { addOrder };
};

export default useOrderService;
