import React, { useState } from 'react';
import DateAndClock from '../components/clock/DateAndClock';
import RecentCashier from '../features/login/components/RecentCashier';
import { useNavigate } from 'react-router-dom';

type Props = {};

const CashierTemporaryLogOutPage = (props: Props) => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const navigateToEnterPin = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/login-cashier-password');
    }, 500); // Adjust the timeout duration according to your animation duration
  };

  return (
    <div
      className={`flex flex-col h-screen items-center justify-between cursor-pointer transition-opacity ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={navigateToEnterPin}
    >
      {/* Clock */}
      <div className='flex-grow'>
        <DateAndClock />
      </div>
      {/* Recently logged cashier */}
      <div>
        <RecentCashier />
      </div>
    </div>
  );
};

export default CashierTemporaryLogOutPage;
