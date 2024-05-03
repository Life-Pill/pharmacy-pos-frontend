import HorizontalDivider from '../../../../shared/divider/HorizontalDivider';
import MedicineGridPopUp from '../order-confirm/MedineGridPopUp';
import {
  ComponentState,
  usePaymentContext,
} from '../../layout/MainCashierDashboard';
import useOrderService from '../../services/OrderService';

const ConfirmPaymentPopUp = () => {
  const {
    setCurrentComponent,
    paymentDetails,
    setOrderedMedicine,
    setPaymentDetails,
    orderedMedicine,
  } = usePaymentContext();

  const cancelClick = () => {
    setCurrentComponent(ComponentState.ConfirmPayment);
  };

  const { loading, addOrder } = useOrderService();

  const confirmClick = async () => {
    //send request to backend for updating cashier,inventory and the orders
    console.log(orderedMedicine);
    console.log(paymentDetails);

    addOrder(orderedMedicine, paymentDetails);

    setCurrentComponent(ComponentState.OrderDetails);
    setOrderedMedicine([]);
    setPaymentDetails({
      paymentMethod: '',
      paymentAmount: 0,
      paymentDate: new Date(),
      paymentNotes: '',
      paymentDiscount: 0,
      paidAmount: 0,
    });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center font-poppins text-xs'>
      <div className=' w-[750px]'>
        <div className='bg-white p-8 rounded-lg'>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-sm'>Order Confirmation</p>
            <p className='font-thin text-xs'>
              Please confirm the order before payment
            </p>
          </div>

          <div>
            <MedicineGridPopUp />
          </div>

          <div className='flex flex-row justify-between items-center gap-2'>
            <div className='bg-numberpadbutton p-2 rounded-md h-max'>
              <p>Notes</p>
              <input
                className='border border-gray p-2 rounded-md'
                type='text'
                placeholder='Enter any additional note here'
              />
            </div>

            <div className='flex flex-col flex-1'>
              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>SubTotal</p>
                <p>{paymentDetails.paymentAmount}</p>
              </div>

              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>Discount Applied</p>
                <p>{paymentDetails.paymentDiscount}</p>
              </div>

              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>After Discount Reduced</p>
                <p>
                  {paymentDetails.paymentAmount -
                    (paymentDetails.paymentDiscount *
                      paymentDetails.paymentAmount) /
                      100}
                </p>
              </div>

              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>Paid amount by customer</p>
                <p>{paymentDetails.paidAmount}</p>
              </div>

              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>Balance</p>
                <p>
                  {paymentDetails.paidAmount -
                    (paymentDetails.paymentAmount -
                      (paymentDetails.paymentDiscount *
                        paymentDetails.paymentAmount) /
                        100)}
                </p>
              </div>
            </div>
          </div>

          <HorizontalDivider />

          <div className='flex flex-row justify-between items-center mt-2 pt-2'>
            <div>
              <p className='font-semibold'>Payment Method</p>
              <p>{paymentDetails.paymentMethod}</p>
            </div>

            <div className='flex gap-4'>
              <button
                className='login_button text-center w-28 '
                onClick={cancelClick}
              >
                Cancel
              </button>
              {
                // if loading is true, show loading spinner
                loading ? (
                  <div className='w-28 h-10 bg-gray-200 animate-pulse rounded-full'>
                    Processing ...
                  </div>
                ) : (
                  <button
                    className='signup_button w-28 rounded-full'
                    onClick={confirmClick}
                  >
                    Pay
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentPopUp;
