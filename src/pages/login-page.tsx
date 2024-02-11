import React from 'react';
import LogInCard from '../features/login/components/LogInCard';
import RecentLogBar from '../features/login/components/RecentLogBar';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
  const navigate = useNavigate();
  const logInButtonClick = () => {
    navigate('/login-cashier-password');
  };
  return (
    <div className='flex justify-evenly items-center min-h-screen'>
      <LogInCard />
      <div className='flex flex-col items-center space-y-8'>
        <RecentLogBar />
        <button className='login_button' onClick={logInButtonClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default LogInPage;
