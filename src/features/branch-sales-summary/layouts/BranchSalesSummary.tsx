import React, { useEffect, useState } from 'react';
import useSalesSummary from '../services/SalesSummaryService';
import SalesChart from '../components/SalesChart';
import OrdersChart from '../components/OrdersChart';
// import salesSummary from '../utils/FakeData';
import { getToday } from '../utils/getToday';
import { generateMonthlySalesSummary } from '../utils/monthlySalesSummary';
import { exportToExcel, exportToPDF } from '../utils/exportUtils';
import { AiFillFileExcel, AiFillFilePdf } from 'react-icons/ai';

function BranchSalesSummary() {
  const { getSalesSummary, salesSummary } = useSalesSummary();
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState(getToday());
  const [filterByMonth, setFilterByMonth] = useState(false);
  const [filterByYear, setFilterByYear] = useState('');
  const [showSales, setShowSales] = useState(true);

  useEffect(() => {
    getSalesSummary();
  }, [getSalesSummary]);

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
    <div className='flex flex-col gap-6 h-full'>
      {/* Header Section */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg'>
        <h1 className='text-2xl font-bold text-white mb-2'>Sales Summary</h1>
        <p className='text-blue-100 text-sm'>Track and analyze your branch sales performance</p>
      </div>

      {/* Filters Card */}
      <div className='bg-white rounded-xl shadow-md p-6'>
        <h2 className='text-lg font-semibold text-gray-800 mb-4'>Filters & Options</h2>
        
        {/* Date Range Filters */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
          <div className='flex flex-col'>
            <label htmlFor='startDate' className='text-sm font-medium text-gray-700 mb-2'>
              Start Date
            </label>
            <input
              type='date'
              id='startDate'
              value={startDate}
              onChange={handleStartDateChange}
              className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='endDate' className='text-sm font-medium text-gray-700 mb-2'>
              End Date
            </label>
            <input
              type='date'
              id='endDate'
              value={endDate}
              onChange={handleEndDateChange}
              className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='filterByYear' className='text-sm font-medium text-gray-700 mb-2'>
              Filter by Year
            </label>
            <input
              type='text'
              id='filterByYear'
              value={filterByYear}
              onChange={handleYearChange}
              placeholder='e.g., 2025'
              className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
            />
          </div>
          <div className='flex flex-col justify-end'>
            <label className='flex items-center gap-2 cursor-pointer bg-gray-50 rounded-lg px-3 py-2.5 hover:bg-gray-100 transition'>
              <input
                type='checkbox'
                id='filterByMonth'
                checked={filterByMonth}
                onChange={() => setFilterByMonth(!filterByMonth)}
                className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
              />
              <span className='text-sm font-medium text-gray-700'>Filter by Month</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap items-center gap-3'>
          {/* View Toggle */}
          <div className='flex bg-gray-100 rounded-lg p-1'>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                showSales 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setShowSales(true)}
            >
              Sales
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                !showSales
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setShowSales(false)}
            >
              Orders
            </button>
          </div>

          {/* Clear Filters */}
          <button
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>

          {/* Export Buttons */}
          <div className='flex gap-2 ml-auto'>
            <button
              className='px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm'
              onClick={() => exportToExcel(filteredSalesData)}
              title='Export to Excel'
            >
              <AiFillFileExcel size={20} />
              <span>Excel</span>
            </button>
            <button
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm'
              onClick={() => exportToPDF(filteredSalesData)}
              title='Export to PDF'
            >
              <AiFillFilePdf size={20} />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className='bg-white rounded-xl shadow-md p-6 flex-1'>
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
