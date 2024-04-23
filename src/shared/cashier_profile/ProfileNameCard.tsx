import React from 'react';
import { useUserContext } from '../../context/UserContext';

type Props = {};

const ProfileNameCard = (props: Props) => {
  const { user } = useUserContext();
  console.log(`ProfileNameCard: ${user}`);

  return (
    <div className='flex items-center justify-center space-x-2'>
      {/* Details */}
      <div>
        <p className='font-bold text-sm'>{`Cashier-${user?.employerId}`}</p>
        <p className='text-xs'>{`${user?.employerFirstName} ${user?.employerLastName}`}</p>
      </div>
      {/* Image */}
      <div className='w-[60px] h-[60px] rounded-full overflow-hidden relative'>
        <img
          src='https://randomuser.me/api/portraits/men/1.jpg'
          alt='Recent'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default ProfileNameCard;
