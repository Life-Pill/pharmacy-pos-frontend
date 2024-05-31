import { useEffect } from 'react';
import useOrderService from '../services/OrderService';

const LatestTransactionDetails = () => {
  const { fetchOrderData, orderData, loading } = useOrderService();

  useEffect(() => {
    fetchOrderData();
    console.log('Fetching order data', orderData);
  }, []);

  return (
    <div className='w-[600px]'>
      <div className='flex flex-row justify-between items-center mb-8 font-bold'>
        <p className='font-bold text-lg'>Latest Transactions</p>
        <p className='text-blueDarker cursor-pointer'>View All</p>
      </div>
      <div className='border-s border-gray-200 dark:border-gray-700 max-h-96 overflow-y-scroll'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
            {orderData?.map((transaction, index) => (
              <li key={index}>
                <div className='py-4'>
                  <div className='flex space-x-3'>
                    <div className='flex-shrink-0'>
                      <div className='flex items-center justify-center h-4 w-4 rounded-full bg-blueDarker text-white'>
                        &bull;
                      </div>
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='text-sm text-black dark:text-gray-400 flex items-center justify-between'>
                        <div>
                          <p className='text-md font-semibold'>
                            ${transaction.total.toFixed(2)}
                          </p>
                          <p className='text-sm text-gray dark:text-gray-400'>
                            Payment Method:{' '}
                            {
                              transaction.groupedOrderDetails.paymentDetails
                                .paymentMethod
                            }
                          </p>
                        </div>
                        {new Date(transaction.orderDate).toLocaleDateString()}
                      </div>

                      <p className='text-sm dark:text-white truncate'>
                        {transaction.groupedOrderDetails.paymentDetails
                          .paymentNotes || 'No notes available'}
                      </p>

                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Items Ordered:
                        <ul className='list-disc ml-5'>
                          {transaction.groupedOrderDetails.orderDetails.map(
                            (item, idx) => (
                              <li
                                key={idx}
                                className='text-sm text-gray-500 dark:text-gray-400'
                              >
                                {item.name} (x{item.amount})
                              </li>
                            )
                          )}
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LatestTransactionDetails;
