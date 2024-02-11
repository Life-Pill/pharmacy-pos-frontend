import React from 'react';
import ManagerNavbar from '../components/navbar/ManagerNavbar';
import ManagerSidebar from '../components/sidebar/ManagerSidebar';

type Props = {};

const MainDashboard = (props: Props) => {
  return (
    <div>
      <ManagerNavbar />
      <div className='flex flex-row'>
        <ManagerSidebar />
        <div className='flex flex-col w-full p-4 font-poppins'>
          <h1 className='text-2xl font-semibold'>
            Welcome to the Manager Dashboard
          </h1>
          <p className='text-lg'>This is the main dashboard for the manager</p>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
