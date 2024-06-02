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
  const [filterByYear, setFilterByYear] = useState('');
  const [showSales, setShowSales] = useState(true);

  useEffect(() => {
    getSalesSummary();
  }, []);

  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleYearChange = (e: any) => {
    setFilterByYear(e.target.value);
  };

  const handleClearFilters = () => {
    setStartDate('2023-01-01');
    setEndDate(getToday());
    setFilterByMonth(false);
    setFilterByYear('');
  };

  const filteredSalesData = salesSummary.filter((data) => {
    const dataYear = new Date(data.date).getFullYear().toString();
    const withinDateRange = data.date >= startDate && data.date <= endDate;
    const matchesYear = filterByYear ? dataYear === filterByYear : true;

    return withinDateRange && matchesYear;
  });

  return (
    <div className='flex flex-col space-y-8 h-screen p-4'>
      <div className='bg-white shadow-md rounded-lg p-4 flex flex-wrap items-center space-x-4 justify-between'>
        <div className='flex flex-col'>
          <label htmlFor='startDate' className='mb-1'>
            Start Date:
          </label>
          <input
            type='date'
            id='startDate'
            value={startDate}
            onChange={handleStartDateChange}
            className='border rounded p-1'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='endDate' className='mb-1'>
            End Date:
          </label>
          <input
            type='date'
            id='endDate'
            value={endDate}
            onChange={handleEndDateChange}
            className='border rounded p-1'
          />
        </div>
        <div className='flex flex-row gap-2'>
          <label htmlFor='filterByMonth' className='mb-1'>
            Filter By Month:
          </label>
          <input
            type='checkbox'
            id='filterByMonth'
            checked={filterByMonth}
            onChange={() => setFilterByMonth(!filterByMonth)}
            className='border p-1'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='filterByYear' className='mb-1'>
            Filter By Year:
          </label>
          <input
            type='text'
            id='filterByYear'
            value={filterByYear}
            onChange={handleYearChange}
            placeholder='YYYY'
            className='border rounded p-1'
          />
        </div>
        <button
          className='bg-black text-white px-4 py-2 font-bold rounded-lg'
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
        <div className='flex items-center ml-auto'>
          <button
            className={`px-4 py-2 font-bold rounded-l-lg ${
              showSales ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => setShowSales(true)}
          >
            Sales
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-r-lg ${
              !showSales
                ? 'bg-gray-800 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => setShowSales(false)}
          >
            Orders
          </button>
        </div>
      </div>

      <div className='flex flex-col justify-between space-y-8'>
        {filterByMonth ? (
          showSales ? (
            <SalesChart
              salesData={generateMonthlySalesSummary(filteredSalesData)}
            />
          ) : (
            <OrdersChart
              salesData={generateMonthlySalesSummary(filteredSalesData)}
            />
          )
        ) : showSales ? (
          <SalesChart salesData={filteredSalesData} />
        ) : (
          <OrdersChart salesData={filteredSalesData} />
        )}
      </div>
    </div>
  );
}

export default BranchSalesSummary;
