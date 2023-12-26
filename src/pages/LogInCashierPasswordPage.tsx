import React, { useState } from 'react';
import RecentLogBar from '../components/login/RecentLogBar';
import NumberPad from '../components/numberpad/NumberPad';
import { useNavigate } from 'react-router-dom';

const LogInCashierPasswordPage = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const handleKeyPress = (key: string) => {
    // Handle the key press and update the pin
    if (key === 'C') {
      setPin(''); // Clear the pin if 'C' is pressed
    } else if (key === '=') {
      // Handle the logic when '=' is pressed (if needed)
    } else {
      setPin((prevPin) => prevPin + key);
    }
  };
  const navigateToCashierDashBoard = () => {
    navigate('/cashier-dashboard');
  };
  return (
    <div className='flex items-center justify-center flex-col h-screen space-y-4'>
      <RecentLogBar />
      <input
        type='password'
        id='pinInput'
        value={pin}
        readOnly
        placeholder='Enter Your Pin'
        className='border-b border-gray-500 focus:border-blue-500 outline-none mt-8 pt-8 w-[200 px] text-lg font-bold placeholder-gray-700 text-center'
      />
      <div>
        {/* numpad goes here */}
        <NumberPad onKeyPress={handleKeyPress} />
      </div>
      <button
        className='signup_button w-64 border border-solid border-blueDarker rounded-full'
        onClick={navigateToCashierDashBoard}
      >
        Unlock
      </button>
      <button className='login_button text-center w-64'>LogIn / LogOut</button>
    </div>
  );
};

export default LogInCashierPasswordPage;
