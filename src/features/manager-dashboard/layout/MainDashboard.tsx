import React from 'react';
import ManagerNavbar from '../components/navbar/ManagerNavbar';
import ManagerSidebar from '../components/sidebar/ManagerSidebar';
import Dashboard from '../components/main/Dashboard';

type Props = {};

const MainDashboard = (props: Props) => {
  return (
    <div className='w-full'>
      <ManagerNavbar />
      <div className='flex flex-row'>
        <ManagerSidebar />
        <div className='flex flex-col w-full p-4 font-poppins'>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
