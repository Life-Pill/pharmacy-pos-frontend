import { useEffect } from 'react';
import useOrderService from '../services/OrderService';
import { Loader } from 'lucide-react';

const LatestTransactionDetails = () => {
  const { fetchOrderData, orderData, loading } = useOrderService();

  useEffect(() => {
    fetchOrderData();
    console.log('Fetching order data', orderData);
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between items-center mb-6'>
        <h2 className='font-bold text-xl text-gray-800'>Latest Transactions</h2>
        <button className='text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors'>
          View All
        </button>
      </div>
      <div className='max-h-[500px] overflow-y-auto pr-2'>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <Loader className='w-8 h-8 animate-spin text-blue-600' />
          </div>
        ) : orderData && orderData.length > 0 ? (
          <div className='space-y-4'>
            {orderData.slice().reverse().map((transaction, index) => (
              <div
                key={index}
                className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white'
              >
                <div className='flex justify-between items-start mb-3'>
                  <div>
                    <p className='text-lg font-bold text-gray-900'>
                      LKR {transaction.total.toFixed(2)}
                    </p>
                    <p className='text-sm text-gray-500 mt-1'>
                      {new Date(transaction.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className='text-right'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                      {transaction.groupedOrderDetails?.paymentDetails?.paymentMethod || 'N/A'}
                    </span>
                  </div>
                </div>

                {transaction.groupedOrderDetails?.paymentDetails?.paymentNotes && (
                  <p className='text-sm text-gray-600 mb-2'>
                    <span className='font-medium'>Note:</span>{' '}
                    {transaction.groupedOrderDetails.paymentDetails.paymentNotes}
                  </p>
                )}

                {transaction.groupedOrderDetails?.orderDetails && 
                 transaction.groupedOrderDetails.orderDetails.length > 0 ? (
                  <div className='mt-3 pt-3 border-t border-gray-100'>
                    <p className='text-xs font-semibold text-gray-700 mb-2'>
                      Items Ordered ({transaction.groupedOrderDetails.orderDetails.length}):
                    </p>
                    <ul className='space-y-1'>
                      {transaction.groupedOrderDetails.orderDetails.map(
                        (item, idx) => (
                          <li
                            key={idx}
                            className='text-sm text-gray-600 flex justify-between'
                          >
                            <span>{item.name}</span>
                            <span className='text-gray-500'>×{item.amount}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ) : (
                  <p className='text-sm text-gray-400 italic mt-2'>No items listed</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-64 text-gray-400'>
            <p className='text-lg'>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestTransactionDetails;
