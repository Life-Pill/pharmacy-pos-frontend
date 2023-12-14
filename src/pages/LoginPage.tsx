import React from 'react';
import LogInCard from '../components/login/LogInCard';
import RecentLogBar from '../components/login/RecentLogBar';

const LogInPage = () => {
  return (
    <div className='flex justify-evenly items-center min-h-screen'>
      <LogInCard />
      <RecentLogBar />
    </div>
  );
};

export default LogInPage;
