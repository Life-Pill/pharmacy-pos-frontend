import { OrderedMedicine } from '../interfaces/OrderMedicine';
import { PaymentDetails } from '../interfaces/PaymentDetails';

export const addOrder = async (
  orderedMedicine: OrderedMedicine[],
  payementDetails: PaymentDetails
) => {
  console.log(orderedMedicine);
  console.log(payementDetails);
  //   try {
  //     const res = await http.post('/cashier/add-order', {
  //       orderedMedicine,
  //       payementDetails,
  //     });
  //     console.log(res);
};
