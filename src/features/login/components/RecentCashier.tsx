import React from 'react';
import { useUserContext } from '../../../context/UserContext';

type Props = {};

const RecentCashier = (props: Props) => {
  const user = useUserContext();

  return (
    <div className='flex items-center justify-center space-x-4 m-8 p-8'>
      {/* Image */}
      <div className='w-[120px] h-[120px] rounded-full overflow-hidden relative'>
        <img
          src='https://randomuser.me/api/portraits/men/1.jpg'
          alt='Recent'
          className='w-full h-full object-cover'
        />
      </div>
      {/* Details */}
      <div>
        <p className='font-bold text-3xl'>Cashier-{user.user?.employerId}</p>
        <p className='text-lg'>
          Logged in as -{' '}
          <span className='font-bold'>
            {user.user?.employerFirstName} {user.user?.employerLastName}
          </span>
        </p>
      </div>
    </div>
  );
};

export default RecentCashier;
