import React, { useEffect, useState } from 'react';
import useSalesSummary from '../services/SalesSummaryService';
import SalesChart from '../components/SalesChart';
import OrdersChart from '../components/OrdersChart';
import salesSummary from '../utils/FakeData';
import { getToday } from '../utils/getToday';
import { generateMonthlySalesSummary } from '../utils/monthlySalesSummary';

function BranchSalesSummary() {
  const { getSalesSummary } = useSalesSummary();
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState(getToday());
  const [filterByMonth, setFilterByMonth] = useState(false);

  useEffect(() => {
    getSalesSummary();
  }, []);

  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleClearFilters = (e: any) => {
    setStartDate('2023-01-01');
    setEndDate(getToday());
    setFilterByMonth(false);
  };

  const filteredSalesData = salesSummary.filter((data) => {
    if (!startDate || !endDate) return true;
    return data.date >= startDate && data.date <= endDate;
  });

  return (
    <div className='flex flex-col space-y-16'>
      <div className='flex flex-row justify-between items-center px-4'>
        <label htmlFor='startDate'>Start Date:</label>
        <input
          type='date'
          id='startDate'
          value={startDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor='endDate'>End Date:</label>
        <input
          type='date'
          id='endDate'
          value={endDate}
          onChange={handleEndDateChange}
        />
        <label htmlFor='filterByMonth'>Filter By Month:</label>
        <input
          type='checkbox'
          id='filterByMonth'
          checked={filterByMonth}
          onChange={() => setFilterByMonth(!filterByMonth)}
        />

        <button
          className='bg-blue-800 text-white px-4 font-bold rounded-lg'
          onClick={handleClearFilters}
        >
          Clear Filters X
        </button>
      </div>

      <div className='flex flex-col justify-between space-y-16 items-center'>
        {filterByMonth ? (
          <>
            <SalesChart
              salesData={generateMonthlySalesSummary(filteredSalesData)}
            />
            <OrdersChart
              salesData={generateMonthlySalesSummary(filteredSalesData)}
            />
          </>
        ) : (
          <>
            <SalesChart salesData={filteredSalesData} />
            <OrdersChart salesData={filteredSalesData} />
          </>
        )}
      </div>
    </div>
  );
}

export default BranchSalesSummary;
