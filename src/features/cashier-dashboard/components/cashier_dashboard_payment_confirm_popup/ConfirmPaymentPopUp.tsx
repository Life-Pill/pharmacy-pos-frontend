import HorizontalDivider from '../../../../shared/divider/HorizontalDivider';
import MedicineGridPopUp from '../order-confirm/MedineGridPopUp';
import {
  ComponentState,
  usePaymentContext,
} from '../../layout/MainCashierDashboard';
import useOrderService from '../../services/OrderService';
import electron from 'electron';
import { MdOutlineDone, MdCheckCircle } from 'react-icons/md';
import { useState, useEffect } from 'react';

const ConfirmPaymentPopUp = () => {
  const {
    setCurrentComponent,
    paymentDetails,
    setOrderedMedicine,
    setPaymentDetails,
    orderedMedicine,
  } = usePaymentContext();

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const cancelClick = () => {
    setCurrentComponent(ComponentState.ConfirmPayment);
  };

  const { loading, addOrder } = useOrderService();

  const confirmClick = async () => {
    //send request to backend for updating cashier,inventory and the orders
    console.log(orderedMedicine);
    console.log(paymentDetails);

    await addOrder(orderedMedicine, paymentDetails);
    
    // Show success state
    setPaymentSuccess(true);
  };

  // Auto-close after showing success for 2 seconds
  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        setCurrentComponent(ComponentState.OrderDetails);
        setOrderedMedicine([]);
        setPaymentDetails({
          paymentMethod: '',
          paymentAmount: 0,
          paymentDate: new Date(),
          paymentNotes: '',
          paymentDiscount: 0,
          paidAmount: 0,
          customerEmail: '',
          customerName: '',
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [paymentSuccess]);

  // Show success screen
  if (paymentSuccess) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center font-poppins z-50 p-4'>
        <div className='w-[500px]'>
          <div className='bg-white p-12 rounded-2xl shadow-2xl flex flex-col items-center justify-center'>
            <div className='bg-green-100 p-6 rounded-full mb-6 animate-bounce'>
              <MdCheckCircle className='text-green-600 text-7xl' />
            </div>
            <p className='font-bold text-2xl text-gray-800 mb-2'>Payment Successful!</p>
            <p className='text-gray-600 text-center mb-4'>
              Your transaction has been completed successfully
            </p>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <div className='animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-green-600'></div>
              <span>Redirecting...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading screen
  if (loading) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center font-poppins z-50 p-4'>
        <div className='w-[500px]'>
          <div className='bg-white p-12 rounded-2xl shadow-2xl flex flex-col items-center justify-center'>
            <div className='relative mb-6'>
              <div className='animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-blue-600'></div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <MdOutlineDone className='text-blue-600 text-3xl' />
              </div>
            </div>
            <p className='font-bold text-xl text-gray-800 mb-2'>Processing Payment...</p>
            <p className='text-gray-600 text-center'>
              Please wait while we process your transaction
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center font-poppins text-xs z-50 p-4'>
      <div className='w-[900px] max-h-[95vh] flex flex-col'>
        <div className='bg-white p-6 rounded-2xl shadow-2xl flex flex-col max-h-full'>
          {/* Header - Fixed */}
          <div className='flex flex-col justify-center items-center mb-5 flex-shrink-0'>
            <div className='bg-blue-100 p-2.5 rounded-full mb-2'>
              <MdOutlineDone className='text-blue-600 text-2xl' />
            </div>
            <p className='font-bold text-lg text-gray-800'>Order Confirmation</p>
            <p className='font-normal text-xs text-gray-500'>
              Please review and confirm the order details before proceeding
            </p>
          </div>

          {/* Main Content Grid */}
          <div className='grid grid-cols-3 gap-4 mb-5 flex-1 overflow-hidden'>
            {/* Left Column - Order Items */}
            <div className='col-span-2 flex flex-col'>
              <MedicineGridPopUp />
            </div>

            {/* Right Column - Customer Info, Notes & Summary */}
            <div className='flex flex-col gap-3 overflow-y-auto'>
              {/* Customer Information */}
              <div className='bg-gray-50 p-3 rounded-lg border border-gray-200'>
                <p className='font-semibold text-xs text-gray-800 mb-2'>Customer Info</p>
                <div className='space-y-2'>
                  <input
                    className='border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 p-2 rounded-md w-full text-xs outline-none'
                    type='text'
                    placeholder='Customer name'
                    value={paymentDetails.customerName || ''}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        customerName: e.target.value,
                      })
                    }
                  />
                  <input
                    className='border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 p-2 rounded-md w-full text-xs outline-none'
                    type='email'
                    placeholder='Customer email'
                    value={paymentDetails.customerEmail || ''}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        customerEmail: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Notes */}
              <div className='bg-gray-50 p-3 rounded-lg border border-gray-200'>
                <p className='font-semibold text-xs text-gray-800 mb-2'>Notes</p>
                <textarea
                  className='border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 p-2 rounded-md w-full text-xs outline-none resize-none'
                  rows={3}
                  placeholder='Additional notes...'
                  value={paymentDetails.paymentNotes || ''}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      paymentNotes: e.target.value,
                    })
                  }
                />
              </div>

              {/* Payment Summary */}
              <div className='space-y-2'>
                <div className='flex justify-between items-center bg-gray-50 rounded-md p-2'>
                  <p className='text-xs text-gray-600'>Subtotal</p>
                  <p className='font-semibold text-xs text-gray-800'>Rs. {paymentDetails.paymentAmount.toFixed(2)}</p>
                </div>

                {paymentDetails.paymentDiscount > 0 && (
                  <div className='flex justify-between items-center bg-orange-50 rounded-md p-2'>
                    <p className='text-xs text-gray-600'>Discount</p>
                    <p className='font-semibold text-xs text-orange-600'>{paymentDetails.paymentDiscount}%</p>
                  </div>
                )}

                <div className='flex justify-between items-center bg-blue-50 rounded-md p-2'>
                  <p className='text-xs text-gray-700 font-medium'>After Discount</p>
                  <p className='font-bold text-sm text-blue-600'>
                    Rs. {(paymentDetails.paymentAmount -
                      (paymentDetails.paymentDiscount *
                        paymentDetails.paymentAmount) /
                        100).toFixed(2)}
                  </p>
                </div>

                <div className='flex justify-between items-center bg-green-50 rounded-md p-2'>
                  <p className='text-xs text-gray-600'>Paid Amount</p>
                  <p className='font-semibold text-xs text-green-600'>Rs. {paymentDetails.paidAmount.toFixed(2)}</p>
                </div>

                <div className='flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-md p-2.5'>
                  <p className='text-xs text-white font-medium'>Balance/Change</p>
                  <p className='font-bold text-white text-sm'>
                    Rs. {(paymentDetails.paidAmount -
                      (paymentDetails.paymentAmount -
                        (paymentDetails.paymentDiscount *
                          paymentDetails.paymentAmount) /
                          100)).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className='bg-gray-100 p-3 rounded-lg mt-auto'>
                <p className='font-semibold text-xs text-gray-700 mb-1'>Payment Method</p>
                <p className='text-blue-600 font-bold text-sm capitalize'>{paymentDetails.paymentMethod || 'Not Selected'}</p>
              </div>
            </div>
          </div>

          {/* Footer Actions - Fixed */}
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-200 flex-shrink-0'>
            <button
              className='px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm'
              onClick={cancelClick}
            >
              Cancel
            </button>
            {loading ? (
              <div className='px-5 py-2.5 bg-gray-200 text-gray-500 rounded-lg flex items-center justify-center cursor-not-allowed text-sm'>
                <span className='animate-pulse'>Processing...</span>
              </div>
            ) : (
              <button
                className='px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg text-sm'
                onClick={confirmClick}
                disabled={loading || paymentSuccess}
              >
                Confirm & Pay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentPopUp;
