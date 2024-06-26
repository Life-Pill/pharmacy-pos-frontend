import React, { useState, useEffect } from 'react';
import useOnlineOrderService from '../../services/OnlineOrderService';
import { Loader } from 'lucide-react';
import { OnlineOrder } from '../../interfaces/OnlineOrder';

type Props = {
  onClose: () => void;
};

function OrderCardComponent({ onClose }: Props) {
  const {
    getOnlineOrders,
    loadingOnlineOrders,
    onlineOrders,
    prescriptionImages,
    messages,
    setMessages,
    acceptOrder,
  } = useOnlineOrderService();

  useEffect(() => {
    getOnlineOrders();
  }, []);

  const handleAccept = (orderId: string) => {
    // Handle accept logic here, e.g., updating the order status or making an API call
    acceptOrder(orderId);
    console.log(`Order ${orderId} accepted with message: ${messages[orderId]}`);
  };

  const handleReject = (orderId: string) => {
    // Handle reject logic here, e.g., updating the order status or making an API call

    console.log(`Order ${orderId} rejected with message: ${messages[orderId]}`);
  };

  const handleMessageChange = (orderId: string, message: string) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [orderId]: message,
    }));
  };
  const sortedOrders = onlineOrders
    .slice()
    .sort(
      (a: OnlineOrder, b: OnlineOrder) =>
        new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
    );

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75 z-50 backdrop-blur-sm'>
      <div className='bg-white rounded-lg p-6 w-full border border-gray-200 h-full overflow-auto shadow-lg'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
          Online Orders
        </h2>
        {loadingOnlineOrders ? (
          <div className='flex justify-center items-center h-full'>
            <Loader className='w-10 h-10 animate-spin' />
          </div>
        ) : (
          sortedOrders.map((order) => (
            <div key={order.id} className='mb-4 border-b border-gray-300 pb-4'>
              <div className='flex gap-4'>
                {prescriptionImages[order.prescriptionId] && (
                  <img
                    src={prescriptionImages[order.prescriptionId]}
                    alt={`Prescription for Order ${order.id}`}
                    className=' w-2/5 h-auto mb-4 rounded-md'
                  />
                )}
                <textarea
                  className='w-full p-2 border border-gray-300 rounded-md'
                  placeholder='Write a message...'
                  value={messages[order.id] || ''}
                  onChange={(e) =>
                    handleMessageChange(order.prescriptionId, e.target.value)
                  }
                />
              </div>
              <p className='text-sm font-normal text-gray-800 p-2'>
                Order Date: {order.createdOn.toString().split('T')[0]}
              </p>
              <p className='text-sm font-semibold text-gray-800 p-2'>
                Customer Message:{' '}
                {order.customerMessage ? order.customerMessage : 'N/A'}
              </p>

              <div className='flex justify-end space-x-2 mt-4'>
                <button
                  onClick={() => handleAccept(order.id)}
                  className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300'
                >
                  Accept
                </button>
                {/* <button
                  onClick={() => handleReject(order.id)}
                  className='bg-red text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300'
                >
                  Reject
                </button> */}
              </div>
            </div>
          ))
        )}
        <div className='flex justify-end mt-4'>
          <button
            onClick={onClose}
            className='bg-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderCardComponent;
