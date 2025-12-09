import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderService from '../services/OrderService';
import LoadingSpinner from '../../../shared/loader/LoadingSpinner';

interface LatestTransactionDetailsProps {
  onNavigateToOrders?: () => void;
}

const LatestTransactionDetails = ({ onNavigateToOrders }: LatestTransactionDetailsProps) => {
  const { fetchOrderData, orderData, loading } = useOrderService();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderData();
    console.log('Fetching order data', orderData);
  }, []);

  const handleViewAll = () => {
    if (onNavigateToOrders) {
      onNavigateToOrders();
    } else {
      navigate('/manager-dashboard/Orders');
    }
  };

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-4 flex-shrink-0'>
        <h2 className='text-xl font-semibold text-gray-800 flex items-center gap-2'>
          <span className='w-1 h-6 bg-blue-500 rounded'></span>
          Latest Transactions
        </h2>
        <button 
          onClick={handleViewAll}
          className='text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors hover:underline'
        >
          View All →
        </button>
      </div>
      <div className='flex-1 overflow-y-auto pr-2'>
        {loading ? (
          <div className='flex justify-center items-center h-full'>
            <LoadingSpinner size='md' />
          </div>
        ) : orderData && orderData.length > 0 ? (
          <div className='space-y-3'>
            {orderData.slice().reverse().slice(0, 10).map((transaction, index) => (
              <div
                key={index}
                className='border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50'
              >
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <p className='text-xl font-bold text-gray-900'>
                      LKR {transaction.total.toFixed(2)}
                    </p>
                    <p className='text-xs text-gray-500 mt-1 flex items-center gap-1'>
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                      </svg>
                      {new Date(transaction.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className='inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200'>
                    {transaction.groupedOrderDetails?.paymentDetails?.paymentMethod || 'N/A'}
                  </span>
                </div>

                {transaction.groupedOrderDetails?.paymentDetails?.paymentNotes && (
                  <div className='bg-yellow-50 border-l-2 border-yellow-400 pl-3 py-1 mb-2'>
                    <p className='text-xs text-gray-700'>
                      <span className='font-semibold'>Note:</span>{' '}
                      {transaction.groupedOrderDetails.paymentDetails.paymentNotes}
                    </p>
                  </div>
                )}

                {transaction.groupedOrderDetails?.orderDetails && 
                 transaction.groupedOrderDetails.orderDetails.length > 0 ? (
                  <div className='mt-3 pt-3 border-t border-gray-200'>
                    <p className='text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                      </svg>
                      Items ({transaction.groupedOrderDetails.orderDetails.length})
                    </p>
                    <div className='space-y-1 max-h-32 overflow-y-auto'>
                      {transaction.groupedOrderDetails.orderDetails.map(
                        (item, idx) => (
                          <div
                            key={idx}
                            className='text-xs text-gray-600 flex justify-between items-center py-1 px-2 hover:bg-gray-100 rounded'
                          >
                            <span className='font-medium'>{item.name}</span>
                            <span className='text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full'>×{item.amount}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <p className='text-xs text-gray-400 italic mt-2'>No items listed</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-64 text-gray-400'>
            <svg className='w-16 h-16 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
            <p className='text-lg font-medium'>No transactions found</p>
            <p className='text-sm mt-1'>Transactions will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestTransactionDetails;
