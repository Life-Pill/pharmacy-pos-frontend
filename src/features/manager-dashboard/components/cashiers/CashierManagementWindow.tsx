import { useEffect } from 'react';
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

  const handleSearch = (searchPhoneNumber: string) => {
    const filtered = workers.filter((cashier) =>
      cashier.employerPhone?.includes(searchPhoneNumber)
    );
    setFilteredCashiers(filtered);
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

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
        {/* Table Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-800 flex items-center gap-2'>
            <span className='w-1 h-6 bg-blue-500 rounded'></span>
            Cashier Details
          </h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search by phone number...'
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition w-64'
              onChange={(e) => handleSearch(e.target.value)}
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
