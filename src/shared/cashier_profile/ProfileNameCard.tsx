import React, { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import useItemService from '../../features/items-management/services/ItemDetailsCRUDService';

type Props = {};

const ProfileNameCard = (props: Props) => {
  const { user } = useUserContext();
  // console.log(`ProfileNameCard: ${user}`);
  const { itemString, fetchItemImage } = useItemService();
  useEffect(() => {
    if (user) {
      fetchItemImage(user.employerId.toString());
    }
  }, []);

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
          src={
            itemString ||
            'https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png'
          }
          alt='Recent'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default ProfileNameCard;
