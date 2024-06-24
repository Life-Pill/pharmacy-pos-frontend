import React, { useEffect } from 'react';
import useOnlineOrderService from '../../services/OnlineOrderService';
import { useUserContext } from '../../../../context/UserContext';

type Props = {
  onClose: () => void;
};

function OrderCardComponent({ onClose }: Props) {
  const { getOnlineOrders } = useOnlineOrderService();

  useEffect(() => {
    getOnlineOrders();
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-50 z-50 backdrop-blur-sm'>
      <div className='bg-gray-800 rounded-lg p-6 w-[500px] border border-gray-200'>
        OrderCardComponent
        <button
          type='button'
          onClick={onClose}
          className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default OrderCardComponent;
