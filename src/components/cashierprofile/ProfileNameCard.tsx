import React from 'react';

type Props = {};

const ProfileNameCard = (props: Props) => {
  return (
    <div className='flex items-center justify-center space-x-2'>
      {/* Details */}
      <div>
        <p className='font-bold text-sm'>Cashier-001</p>
        <p className='text-xs'>Ruwani Manchanayaka</p>
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
