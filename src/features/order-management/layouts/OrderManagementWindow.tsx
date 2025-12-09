import React, { useEffect, useState } from 'react';
import useOrderManagementService from '../services/OrderManagementService';
import { getToday } from '../../branch-sales-summary/utils/getToday';
import { Order } from '../interfaces/OrderDetails';
import { Loader } from 'lucide-react';
import OrderCardComponent from '../components/OrderCardComponent';
import { BsCalendar3, BsSearch } from 'react-icons/bs';

type Props = {};

function OrderManagementWindow({}: Props) {
  const {
    loading,
    orderData,
    fetchOrderData,
    filteredOrderData,
    setFilteredOrderData,
  } = useOrderManagementService();

  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState(getToday());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'branch'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchOrderData();
  }, []);

  const filterOrdersByDateRange = (order: Order) => {
    const orderDate = new Date(order.orderDate).getTime();
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    // Check if the order falls within the date range
    const withinDateRange =
      orderDate >= startDateTime && orderDate <= endDateTime;

    return withinDateRange;
  };

  useEffect(() => {
    let filtered = orderData?.filter(filterOrdersByDateRange) || [];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.branchId.toString().includes(searchTerm) ||
          order.employerId.toString().includes(searchTerm) ||
          order.total.toString().includes(searchTerm)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let compareA: any;
      let compareB: any;

      if (sortBy === 'date') {
        compareA = new Date(a.orderDate).getTime();
        compareB = new Date(b.orderDate).getTime();
      } else if (sortBy === 'total') {
        compareA = a.total;
        compareB = b.total;
      } else if (sortBy === 'branch') {
        compareA = a.branchId;
        compareB = b.branchId;
      }

      if (sortOrder === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

    setFilteredOrderData(filtered);
  }, [startDate, endDate, searchTerm, sortBy, sortOrder, orderData]);

  const handleClearFilters = () => {
    setStartDate('2023-01-01');
    setEndDate(getToday());
    setSearchTerm('');
    setSortBy('date');
    setSortOrder('desc');
  };

  const totalOrders = orderData?.length || 0;
  const totalRevenue = filteredOrderData?.reduce((sum, order) => sum + order.total, 0) || 0;

  return (
    <div className='flex flex-col h-full overflow-hidden'>
      {/* Header */}
      <div className='flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 shadow-lg'>
        <h1 className='text-2xl font-bold'>Order Management</h1>
        <p className='text-blue-100 text-sm mt-1'>View and manage customer orders</p>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-y-auto p-6 bg-gray-50'>
        {/* Filters Section */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold text-gray-800'>Filter & Search Orders</h2>
            <div className='flex items-center gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <span className='text-gray-600'>Total Orders:</span>
                <span className='font-bold text-blue-600'>{totalOrders}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-gray-600'>Filtered Revenue:</span>
                <span className='font-bold text-green-600'>LKR {totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {/* Search */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                <BsSearch className='inline mr-1' />
                Search
              </label>
              <input
                type='text'
                placeholder='Branch ID, Employer ID...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              />
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor='startDate' className='block text-sm font-medium text-gray-700 mb-1'>
                <BsCalendar3 className='inline mr-1' />
                Start Date
              </label>
              <input
                type='date'
                id='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor='endDate' className='block text-sm font-medium text-gray-700 mb-1'>
                <BsCalendar3 className='inline mr-1' />
                End Date
              </label>
              <input
                type='date'
                id='endDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              />
            </div>

            {/* Sort By */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              >
                <option value='date'>Date</option>
                <option value='total'>Total Amount</option>
                <option value='branch'>Branch ID</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              >
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className='flex items-center justify-between mt-4'>
            <p className='text-sm text-gray-600'>
              Showing <span className='font-semibold text-blue-600'>{filteredOrderData?.length || 0}</span> of{' '}
              <span className='font-semibold'>{totalOrders}</span> orders
            </p>
            <button
              onClick={handleClearFilters}
              className='text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline'
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {loading ? (
            <div className='col-span-full flex items-center justify-center py-12 bg-white rounded-xl shadow-md'>
              <Loader className='animate-spin text-blue-600' size={40} />
            </div>
          ) : filteredOrderData && filteredOrderData.length > 0 ? (
            filteredOrderData.map((order, index) => (
              <OrderCardComponent key={index} order={order} />
            ))
          ) : (
            <div className='col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-md'>
              <svg
                className='w-16 h-16 text-gray-300 mb-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              <p className='text-gray-500 text-lg font-medium'>No orders found</p>
              <p className='text-gray-400 text-sm mt-1'>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderManagementWindow;
