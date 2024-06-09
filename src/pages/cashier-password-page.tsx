import React, { useState } from 'react';
import RecentLogBar from '../features/login/components/RecentLogBar';
import NumberPad from '../shared/cashier_login_numberpad/NumberPad';
import { useNavigate } from 'react-router-dom';
import useAuthenticationService from '../services/AuthenticationService';

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
  const { logInUsingPin, log, logOut, logging } = useAuthenticationService();

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
        onClick={() => logInUsingPin(pin)}
      >
        {log ? 'Wait ...' : 'Unlock'}
      </button>
      <button
        className='login_button text-center w-64 border border-solid border-blueDarker'
        onClick={logOut}
      >
        {logging ? 'Wait...' : 'LogOut'}
      </button>
    </div>
  );
};

export default LogInCashierPasswordPage;
//
