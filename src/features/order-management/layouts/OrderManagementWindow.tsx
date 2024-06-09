import React, { useEffect, useState } from 'react';
import useOrderManagementService from '../services/OrderManagementService';
import { getToday } from '../../branch-sales-summary/utils/getToday';
import { Order } from '../interfaces/OrderDetails';
import { Loader } from 'lucide-react';
import OrderCardComponent from '../components/OrderCardComponent';
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
    const filtered = orderData?.filter(filterOrdersByDateRange);
    setFilteredOrderData(filtered);
  }, [startDate, endDate]);

  const handleClearFilters = () => {
    setStartDate('2023-01-01');
    setEndDate(getToday());
  };

  return (
    <div className='max-h-screen overflow-y-scroll pb-36'>
      <div className='bg-white flex flex-wrap items-center space-x-4 justify-between'>
        <div className='flex items-center'>
          <label htmlFor='startDate' className='mb-1'>
            Start Date:
          </label>
          <input
            type='date'
            id='startDate'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='border rounded p-1'
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='endDate' className='mb-1'>
            End Date:
          </label>
          <input
            type='date'
            id='endDate'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='border rounded p-1'
          />
        </div>

        <button
          className='bg-black text-white px-4 py-2 font-bold rounded-lg'
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        filteredOrderData?.map((order) => <OrderCardComponent order={order} />)
      )}
    </div>
  );
}

export default OrderManagementWindow;
