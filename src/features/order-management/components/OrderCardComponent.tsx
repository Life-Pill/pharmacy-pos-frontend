import React, { useState } from 'react';
import { Order } from '../interfaces/OrderDetails';
import { formatDate } from '../utils/foramtDate';
import { BsEye, BsX } from 'react-icons/bs';

type Props = {
  order: Order;
};

function OrderCardComponent({ order }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Compact Square Card */}
      <div 
        className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-4 cursor-pointer h-32 flex flex-col justify-between'
        onClick={() => setShowModal(true)}
      >
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-2'>
            <div className='bg-blue-100 p-2 rounded-lg'>
              <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
            </div>
            <div>
              <p className='text-xs font-semibold text-gray-800'>Order #{order.branchId}-{order.employerId}</p>
              <p className='text-xs text-gray-500'>{formatDate(order.orderDate)}</p>
            </div>
          </div>
          <button 
            className='p-1.5 hover:bg-gray-100 rounded-lg transition-colors'
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            <BsEye className='text-lg text-blue-600' />
          </button>
        </div>

        <div className='mt-2'>
          <p className='text-xs text-gray-500'>Total Amount</p>
          <p className='text-xl font-bold text-green-600'>LKR {order.total.toLocaleString()}</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
          onClick={() => setShowModal(false)}
        >
          <div 
            className='bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden'
            style={{ height: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className='flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 flex items-center justify-between'>
              <div>
                <h2 className='text-xl font-bold'>Order Details</h2>
                <p className='text-blue-100 text-sm mt-1'>Order #{order.branchId}-{order.employerId}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className='p-2 hover:bg-white/20 rounded-lg transition-colors'
              >
                <BsX className='text-3xl' />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className='flex-1 overflow-y-auto p-6 space-y-6' style={{ minHeight: 0 }}>
              {/* Order Summary */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
                  <p className='text-xs text-blue-600 font-medium mb-1'>Branch ID</p>
                  <p className='text-2xl font-bold text-blue-800'>#{order.branchId}</p>
                </div>
                <div className='bg-purple-50 rounded-lg p-4 border border-purple-200'>
                  <p className='text-xs text-purple-600 font-medium mb-1'>Employer ID</p>
                  <p className='text-2xl font-bold text-purple-800'>#{order.employerId}</p>
                </div>
                <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                  <p className='text-xs text-gray-600 font-medium mb-1'>Order Date</p>
                  <p className='text-lg font-bold text-gray-800'>{formatDate(order.orderDate)}</p>
                </div>
                <div className='bg-green-50 rounded-lg p-4 border border-green-200'>
                  <p className='text-xs text-green-600 font-medium mb-1'>Total Amount</p>
                  <p className='text-2xl font-bold text-green-800'>LKR {order.total.toLocaleString()}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                  <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                  </svg>
                  Order Items ({order.groupedOrderDetails.orderDetails.length})
                </h3>
                <div className='bg-white rounded-lg overflow-hidden border border-gray-200'>
                  <table className='w-full text-sm'>
                    <thead className='bg-gray-100 border-b border-gray-200'>
                      <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Item ID
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Name
                        </th>
                        <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {order.groupedOrderDetails.orderDetails.map((orderDetail, index) => (
                        <tr key={orderDetail.id} className='hover:bg-gray-50'>
                          <td className='px-6 py-3 text-gray-900 font-medium'>{orderDetail.id}</td>
                          <td className='px-6 py-3 text-gray-700'>{orderDetail.name}</td>
                          <td className='px-6 py-3 text-right text-gray-900 font-semibold'>
                            LKR {orderDetail.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                  <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                  </svg>
                  Payment Information
                </h3>
                <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Payment Method</p>
                      <p className='text-sm font-semibold text-gray-800'>
                        {order.groupedOrderDetails.paymentDetails.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Payment Amount</p>
                      <p className='text-sm font-semibold text-green-600'>
                        LKR {order.groupedOrderDetails.paymentDetails.paymentAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Payment Date</p>
                      <p className='text-sm font-semibold text-gray-800'>
                        {order.groupedOrderDetails.paymentDetails.paymentDate}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Discount</p>
                      <p className='text-sm font-semibold text-orange-600'>
                        LKR {order.groupedOrderDetails.paymentDetails.paymentDiscount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 mb-1'>Paid Amount</p>
                      <p className='text-sm font-semibold text-blue-600'>
                        LKR {order.groupedOrderDetails.paymentDetails.payedAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className='md:col-span-2 lg:col-span-1'>
                      <p className='text-xs text-gray-500 mb-1'>Notes</p>
                      <p className='text-sm text-gray-700'>
                        {order.groupedOrderDetails.paymentDetails.paymentNotes || 'No notes'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='flex-shrink-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end'>
              <button
                onClick={() => setShowModal(false)}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderCardComponent;
