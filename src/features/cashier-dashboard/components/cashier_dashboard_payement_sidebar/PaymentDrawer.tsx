import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import HorizontalDivider from '../../../../shared/divider/HorizontalDivider';
import { BiReceipt } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import PaymentMethodButton from '../../../../shared/buttons/PaymentMethodButton';
import PaymentNumberPad from '../../../../shared/payment_numberpad/PaymentNumberPad';
import FooterButton from '../../../../shared/buttons/FooterButton';
import mastercard from '../../../../assets/icons/mastercard.png';
import money from '../../../../assets/icons/money.png';
import visa from '../../../../assets/icons/visa.png';
import {
  ComponentState,
  usePaymentContext,
} from '../../layout/MainCashierDashboard';
import { toast } from 'react-toastify';

const PaymentDrawer = () => {
  const { setCurrentComponent, paymentDetails, setPaymentDetails } =
    usePaymentContext();

  const [payment, setPayment] = useState('');
  const handleKeyPress = (key: string) => {
    if (key === 'C') {
      setPayment(''); // Clear the payment if 'C' is pressed
    } else if (key === '=') {
      // Handle the logic when '=' is pressed (if needed)
    } else if (key === '10' || key === '20') {
      // Handle the logic for adding predefined amounts
      setPayment((prevPayment) =>
        (parseInt(prevPayment) + parseInt(key)).toString()
      );
    } else if (key === 'Add') {
      // Handle the logic for adding custom amount (if needed)
    } else if (key === 'Backspace') {
      // Handle the logic for removing the last digit
      setPayment((prevPayment) => prevPayment.slice(0, -1));
    } else {
      // Handle other digit inputs
      setPayment((prevPayment) => prevPayment + key);
    }

    // // Update the payment details
    // setPaymentDetails({
    //   ...paymentDetails,
    //   paidAmount: parseInt(payment),
    // });
  };

  // Popup state here

  const footerButtonClick = () => {
    if (paymentDetails.paidAmount < paymentDetails.paymentAmount) {
      toast.warn('Payment amount is less than total amount');
      return;
    }
    setCurrentComponent(ComponentState.PopupPayment);
  };

  return (
    <div className='w-[480px] flex flex-col p-5 rounded-xl space-y-4 font-poppins bg-white shadow-xl border border-gray-200'>
      {/* Header */}
      <div className='flex justify-between items-center pb-3 border-b border-gray-200'>
        <div>
          <p className='font-bold text-xl text-gray-800'>Payment</p>
          <p className='text-xs text-gray-500'>Order #102</p>
        </div>
        <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
          <RxCross1 className='text-gray-500' size={18} />
        </button>
      </div>
      
      {/* Payment Summary */}
      <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200'>
        {paymentDetails.paymentDiscount > 0 && (
          <div className='flex justify-between items-center mb-2 pb-2 border-b border-blue-200'>
            <p className='text-xs text-gray-600'>Discount</p>
            <p className='text-sm font-semibold text-orange-600'>{paymentDetails.paymentDiscount}%</p>
          </div>
        )}
        <div className='flex justify-between items-center'>
          <p className='text-sm font-medium text-gray-700'>Total Amount</p>
          <p className='text-2xl text-blue-700 font-bold'>
            Rs. {paymentDetails.paymentAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <p className='text-sm font-semibold text-gray-700 mb-2'>Payment Method</p>
        <div className='flex gap-2'>
          <PaymentMethodButton
            imageSrc={money}
            onClick={() => {
              setPaymentDetails({
                ...paymentDetails,
                paymentMethod: 'cash',
              });
            }}
          />
          <PaymentMethodButton
            imageSrc={visa}
            onClick={() => {
              setPaymentDetails({
                ...paymentDetails,
                paymentMethod: 'visa',
              });
            }}
          />
          <PaymentMethodButton
            imageSrc={mastercard}
            onClick={() => {
              setPaymentDetails({
                ...paymentDetails,
                paymentMethod: 'mastercard',
              });
            }}
          />
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <label htmlFor='paymentInput' className='block text-sm font-semibold text-gray-700 mb-2'>
          Amount Received
        </label>
        <div className='relative'>
          <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium'>
            Rs.
          </span>
          <input
            type='number'
            id='paymentInput'
            value={payment}
            placeholder='0.00'
            className='border-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none w-full text-xl font-bold placeholder-gray-300 text-center py-3 transition-all'
            onChange={(e) => {
              setPayment(e.target.value);
              setPaymentDetails({
                ...paymentDetails,
                paidAmount: parseInt(e.target.value) || 0,
              });
            }}
          />
        </div>
        {payment && parseInt(payment) < paymentDetails.paymentAmount && (
          <p className='text-xs text-red-600 mt-2 font-medium'>
            Short: Rs. {(paymentDetails.paymentAmount - parseInt(payment)).toFixed(2)}
          </p>
        )}
        {payment && parseInt(payment) >= paymentDetails.paymentAmount && parseInt(payment) > paymentDetails.paymentAmount && (
          <p className='text-xs text-green-600 mt-2 font-medium'>
            Change: Rs. {(parseInt(payment) - paymentDetails.paymentAmount).toFixed(2)}
          </p>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={footerButtonClick}
        className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
      >
        <MdOutlineDone size={22} />
        <span>Confirm Payment</span>
      </button>
    </div>
  );
};

export default PaymentDrawer;
