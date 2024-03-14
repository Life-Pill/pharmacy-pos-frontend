import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import HorizontalDivider from '../../shared/divider/HorizontalDivider';
import { BiReceipt } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import PaymentMethodButton from '../../shared/buttons/PaymentMethodButton';
import PaymentNumberPad from '../../shared/payment_numberpad/PaymentNumberPad';
import FooterButton from '../../shared/buttons/FooterButton';
import mastercard from '../../assets/icons/mastercard.png';
import money from '../../assets/icons/money.png';
import visa from '../../assets/icons/visa.png';
import {
  ComponentState,
  usePaymentContext,
} from '../../features/cashier-dashboard/layout/MainCashierDashboard';
type Props = {
  openConfirmPayment: () => void;
};

const PaymentDrawer = () => {
  const { setCurrentComponent } = usePaymentContext();

  const handlePaymentMethodClick = () => {};
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
  };

  // Popup state here

  const footerButtonClick = () => {
    setCurrentComponent(ComponentState.PopupPayment);
  };

  return (
    <div className='max-w-[700px] flex flex-col p-2 rounded-lg space-y-4 font-poppins'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-semibold'>Order Payment</p>
          <p>Order #102</p>
        </div>
        <RxCross1 />
      </div>
      <HorizontalDivider />
      <div className='flex flex-col bg-numberpadbutton rounded-md p-2'>
        <div className=' flex flex-row justify-between items-center'>
          <p>Discount</p>
          <p>5%</p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <p>Total Amount</p>
          <p className='text-blueDarker font-semibold'>LKR.7500</p>
        </div>
      </div>

      {/* Payment method component */}
      <div>
        <p className='font-semibold'>Payment Method</p>
        <div className='flex justify-evenly items-center'>
          <PaymentMethodButton
            imageSrc={mastercard}
            onClick={handlePaymentMethodClick}
          />
          <PaymentMethodButton
            imageSrc={money}
            onClick={handlePaymentMethodClick}
          />
          <PaymentMethodButton
            imageSrc={visa}
            onClick={handlePaymentMethodClick}
          />
        </div>
      </div>

      {/* Numberpad with input bar */}
      <div className='mb-4'>
        <label htmlFor='paymentInput' className='block text-sm font-semibold'>
          Input Amount
        </label>
        <input
          type='text'
          id='paymentInput'
          value={payment}
          placeholder='Enter Amount'
          className='border rounded border-gray-500 focus:border-blue-500 outline-none w-full text-lg font-semibold placeholder-gray-700 text-center py-2'
          onKeyPress={(e) => handleKeyPress(e.key)}
        />
      </div>

      <PaymentNumberPad onKeyPress={handleKeyPress} />

      {/* Three buttons for receipt email and done */}
      <div className='flex flex-row justify-evenly items-center'>
        <FooterButton
          onClick={footerButtonClick}
          icon={<BiReceipt />}
          text='Receipt'
        />
        <FooterButton
          onClick={footerButtonClick}
          icon={<AiOutlineMail />}
          text='Email'
        />
        <FooterButton
          onClick={footerButtonClick}
          icon={<MdOutlineDone />}
          text='Done'
        />
      </div>
    </div>
  );
};

export default PaymentDrawer;
