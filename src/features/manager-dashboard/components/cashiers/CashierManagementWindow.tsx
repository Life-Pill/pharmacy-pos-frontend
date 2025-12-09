import { useEffect, useState } from 'react';
import { TbCirclePlus } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import useCashierService from '../../services/CashierService';
import { CashierDetailsType } from '../../../cashier-management/interfaces/CashierDetailsType';
import Loader from '../../../../shared/loader/Loader';
import { BsPencilSquare, BsEye, BsTrash } from 'react-icons/bs';
import {
  calculateActiveWorkers,
  calculateMaleFemaleWorkers,
} from '../../utils/cashierManagementUtils';

const CashierManagementWindow = () => {
  const navigate = useNavigate();

  const {
    fetchEmployeeData,
    workers,
    setFilteredCashiers,
    filteredCashiers,
    loading,
  } = useCashierService();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');
  const [filterPayment, setFilterPayment] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'salary' | 'id'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [workers, searchTerm, filterStatus, filterGender, filterPayment, sortBy, sortOrder]);

  const applyFilters = () => {
    let filtered = [...workers];

    // Search by name or phone
    if (searchTerm) {
      filtered = filtered.filter((cashier) =>
        cashier.employerFirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cashier.employerPhone?.includes(searchTerm)
      );
    }

    // Filter by active status
    if (filterStatus === 'active') {
      filtered = filtered.filter((cashier) => cashier.activeStatus);
    } else if (filterStatus === 'inactive') {
      filtered = filtered.filter((cashier) => !cashier.activeStatus);
    }

    // Filter by gender
    if (filterGender !== 'all') {
      filtered = filtered.filter((cashier) => 
        cashier.gender?.toLowerCase() === filterGender
      );
    }

    // Filter by payment status
    if (filterPayment === 'paid') {
      filtered = filtered.filter((cashier) => cashier.activeStatus);
    } else if (filterPayment === 'unpaid') {
      filtered = filtered.filter((cashier) => !cashier.activeStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'name':
          compareValue = (a.employerFirstName || '').localeCompare(b.employerFirstName || '');
          break;
        case 'salary':
          compareValue = a.employerSalary - b.employerSalary;
          break;
        case 'id':
          compareValue = a.employerId - b.employerId;
          break;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    setFilteredCashiers(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterGender('all');
    setFilterPayment('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  const onUpdateClick = (employer: CashierDetailsType) => {
    console.log(employer.employerId);
    navigate(`/update-cashier/${employer.employerId}`);
  };

  const onViewClick = (employer: CashierDetailsType) => {
    console.log(employer.employerId);
    navigate(`/view-cashier/${employer.employerId}`);
  };

  const onDeleteClick = (employer: CashierDetailsType) => {
    console.log(employer.employerId);
    // navigate('/view-cashier');
  };

  const { maleCount, femaleCount } = calculateMaleFemaleWorkers(workers);

  return (
    <div className='flex flex-col gap-6 h-full' data-testid='cashier-management-window'>
      {/* Header Section */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg'>
        <h1 className='text-2xl font-bold text-white mb-2'>Cashier Management</h1>
        <p className='text-blue-100 text-sm'>Manage and monitor your cashier workforce</p>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
        <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-blue-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Total Workers</p>
              <p className='text-3xl font-bold text-gray-800'>{workers.length}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-green-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Active Workers</p>
              <p className='text-3xl font-bold text-green-600'>{calculateActiveWorkers(workers)}</p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-blue-400'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Male Workers</p>
              <p className='text-3xl font-bold text-blue-600'>{maleCount}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-pink-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Female Workers</p>
              <p className='text-3xl font-bold text-pink-600'>{femaleCount}</p>
            </div>
            <div className='w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center'>
              <svg className='w-6 h-6 text-pink-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
          </div>
        </div>

        <Link
          to='/add-cashier'
          className='bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-md p-5 hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-3 cursor-pointer group'
        >
          <TbCirclePlus size={28} className='text-gray-800 group-hover:rotate-90 transition-transform' />
          <span className='font-semibold text-gray-800'>Add Cashier</span>
        </Link>
      </div>

      {/* Table Section */}
      <div className='bg-white rounded-xl shadow-md flex-1 flex flex-col overflow-hidden'>
        {/* Filters Bar */}
        <div className='p-6 border-b border-gray-200'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
            {/* Search */}
            <div className='lg:col-span-2'>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Search</label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search by name or phone...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                />
                <svg
                  className='absolute left-3 top-2.5 w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
            </div>

            {/* Active Status Filter */}
            <div>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              >
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Gender</label>
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value as any)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              >
                <option value='all'>All</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>

            {/* Payment Filter */}
            <div>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Payment</label>
              <select
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value as any)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              >
                <option value='all'>All</option>
                <option value='paid'>Paid</option>
                <option value='unpaid'>Unpaid</option>
              </select>
            </div>

            {/* Sort By & Actions */}
            <div>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Sort By</label>
              <div className='flex gap-2'>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                >
                  <option value='name'>Name</option>
                  <option value='salary'>Salary</option>
                  <option value='id'>ID</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className='px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center'
                  title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {sortOrder === 'asc' ? (
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
                    </svg>
                  ) : (
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Count and Clear Button */}
          <div className='mt-3 flex items-center justify-between'>
            <p className='text-sm text-gray-600'>
              Showing <span className='font-semibold text-gray-900'>{filteredCashiers.length}</span> of{' '}
              <span className='font-semibold text-gray-900'>{workers.length}</span> cashiers
            </p>
            <button
              onClick={handleClearFilters}
              className='px-4 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors'
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50'>
          <h2 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
            <span className='w-1 h-5 bg-blue-500 rounded'></span>
            Cashier Details
          </h2>
          <div className='relative'>
            {/* Removed search input from here as it's now in the filters bar */}
          </div>
        </div>

        {/* Table Content */}
        <div className='overflow-auto flex-1'>
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <Loader />
            </div>
          ) : (
            <table className='w-full text-sm text-left'>
              <thead className='text-xs uppercase bg-gray-50 text-gray-700 sticky top-0 z-10'>
                <tr>
                  <th scope='col' className='px-6 py-4 font-semibold'>Cashier ID</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Name</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Gender</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Phone Number</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Active Status</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Payment Status</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Salary</th>
                  <th scope='col' className='px-6 py-4 font-semibold text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredCashiers.map((worker) => (
                  <tr
                    className='bg-white hover:bg-gray-50 transition-colors'
                    key={worker.employerId}
                  >
                    <td className='px-6 py-4 font-medium text-gray-900'>
                      #{worker.employerId}
                    </td>
                    <td className='px-6 py-4 text-gray-700 font-medium'>
                      {worker.employerFirstName}
                    </td>
                    <td className='px-6 py-4 text-gray-600 capitalize'>
                      {worker.gender.toLowerCase()}
                    </td>
                    <td className='px-6 py-4 text-gray-600'>{worker.employerPhone}</td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          worker.activeStatus
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {worker.activeStatus ? '● Online' : '● Offline'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          worker.activeStatus
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {worker.activeStatus ? '✓ Paid' : '✕ Not Paid'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-gray-900 font-semibold'>
                      Rs. {worker.employerSalary.toLocaleString()}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-2'>
                        <button
                          className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                          onClick={() => onViewClick(worker)}
                          title='View Details'
                        >
                          <BsEye className='text-lg' />
                        </button>
                        <button
                          className='p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                          onClick={() => onUpdateClick(worker)}
                          title='Edit Cashier'
                        >
                          <BsPencilSquare className='text-lg' />
                        </button>
                        <button
                          className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                          onClick={() => onDeleteClick(worker)}
                          title='Delete Cashier'
                        >
                          <BsTrash className='text-lg' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CashierManagementWindow;
// this is sample
