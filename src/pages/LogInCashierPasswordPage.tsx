import React from 'react';
import RecentLogBar from '../components/login/RecentLogBar';
import NumberPad from '../components/numberpad/NumberPad';

const LogInCashierPasswordPage = () => {
  const handleKeyPress = (key: string) => {
    // Handle the key press in your component
    console.log(`Key pressed: ${key}`);
  };
  return (
    <div>
      <RecentLogBar />
      <p>Enter your pin</p>
      <div>
        {/* numpad goes here */}
        <NumberPad onKeyPress={handleKeyPress} />
      </div>
      <button>Unlock</button>
      <p>LogIn/LogOut</p>
    </div>
  );
};

export default LogInCashierPasswordPage;
