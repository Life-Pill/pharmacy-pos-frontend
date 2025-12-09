import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSellerCompanyService from '../services/SellerComapanyService';
import LoadingSpinner from '../../../shared/loader/LoadingSpinner';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { TbCirclePlus } from 'react-icons/tb';
import { SellerCompany } from '../interfaces/SellerCompany';

function SellerManagement() {
  const {
    fetchCompanies,
    companies,
    filteredCompanies,
    setFilteredCompanies,
    loading,
    deleteCompany,
    deleting,
  } = useSellerCompanyService();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterRating, setFilterRating] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Apply all filters
  useEffect(() => {
    if (!companies) return;
    applyFilters();
  }, [companies, searchTerm, filterStatus, filterRating, sortBy, sortOrder]);

  const applyFilters = () => {
    let filtered = [...(companies || [])];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (company) =>
          company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.companyContact?.includes(searchTerm) ||
          company.companyEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(
        (company) => company.companyStatus?.toLowerCase() === filterStatus
      );
    }

    // Rating filter
    if (filterRating !== 'all') {
      filtered = filtered.filter((company) => {
        const rating = parseFloat(company.companyRating || '0');
        if (filterRating === 'high') return rating >= 4;
        if (filterRating === 'medium') return rating >= 2 && rating < 4;
        if (filterRating === 'low') return rating < 2;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let compareA: any;
      let compareB: any;

      if (sortBy === 'name') {
        compareA = a.companyName?.toLowerCase() || '';
        compareB = b.companyName?.toLowerCase() || '';
      } else if (sortBy === 'rating') {
        compareA = parseFloat(a.companyRating || '0');
        compareB = parseFloat(b.companyRating || '0');
      } else if (sortBy === 'status') {
        compareA = a.companyStatus?.toLowerCase() || '';
        compareB = b.companyStatus?.toLowerCase() || '';
      }

      if (sortOrder === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

    setFilteredCompanies(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterRating('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  const totalCompanies = companies?.length || 0;

  return (
    <div className='flex flex-col h-full overflow-hidden'>
      {/* Header */}
      <div className='flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 shadow-lg'>
        <h1 className='text-2xl font-bold'>Seller Company Management</h1>
        <p className='text-blue-100 text-sm mt-1'>Manage supplier companies and vendor information</p>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-y-auto p-6 bg-gray-50'>
        {/* Filters and Actions */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold text-gray-800'>Filter & Search</h2>
            <Link to='/manager-dashboard/add-company'>
              <button
                className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg'
              >
                <TbCirclePlus className='text-xl' />
                <span className='font-medium'>Add Company</span>
              </button>
            </Link>
          </div>

          {/* Filter Controls */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {/* Search */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Search</label>
              <input
                type='text'
                placeholder='Name, contact, email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              >
                <option value='all'>All Status</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Rating</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value as any)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              >
                <option value='all'>All Ratings</option>
                <option value='high'>High (4+)</option>
                <option value='medium'>Medium (2-4)</option>
                <option value='low'>Low (&lt;2)</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              >
                <option value='name'>Name</option>
                <option value='rating'>Rating</option>
                <option value='status'>Status</option>
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

          {/* Clear Filters Button */}
          <div className='flex items-center justify-between mt-4'>
            <p className='text-sm text-gray-600'>
              Showing <span className='font-semibold text-blue-600'>{filteredCompanies?.length || 0}</span> of{' '}
              <span className='font-semibold'>{totalCompanies}</span> companies
            </p>
            <button
              onClick={clearFilters}
              className='text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline'
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
          <div className='overflow-x-auto'>
            {loading ? (
              <div className='flex items-center justify-center py-12'>
                <LoadingSpinner size='lg' />
              </div>
            ) : filteredCompanies && filteredCompanies.length > 0 ? (
              <table className='w-full'>
                <thead className='bg-gray-50 border-b border-gray-200'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Company Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Contact Info
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Banking Details
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Rating
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredCompanies.map((company) => (
                    <tr key={company.companyId} className='hover:bg-gray-50 transition-colors'>
                      <td className='px-6 py-4'>
                        <div className='flex flex-col'>
                          <span className='text-sm font-medium text-gray-900'>{company.companyName}</span>
                          <span className='text-xs text-gray-500 mt-1'>{company.companyAddress}</span>
                          {company.companyDescription && (
                            <span className='text-xs text-gray-400 mt-1 line-clamp-2'>{company.companyDescription}</span>
                          )}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex flex-col gap-1'>
                          <span className='text-sm text-gray-900'>{company.companyContact}</span>
                          <span className='text-xs text-gray-500'>{company.companyEmail}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex flex-col gap-1'>
                          <span className='text-sm text-gray-900'>{company.companyBank}</span>
                          <span className='text-xs text-gray-500'>{company.companyAccountNumber}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            company.companyStatus?.toLowerCase() === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {company.companyStatus}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1'>
                          <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                          </svg>
                          <span className='text-sm font-medium text-gray-900'>{company.companyRating}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-2'>
                          <Link to={`/manager-dashboard/update-company/${company.companyId}`}>
                            <button
                              className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                              title='Edit Company'
                            >
                              <BsPencilSquare className='text-lg' />
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteCompany(company.companyId)}
                            disabled={deleting}
                            className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50'
                            title='Delete Company'
                          >
                            {deleting ? (
                              <LoadingSpinner size='sm' className='text-red-600' />
                            ) : (
                              <BsTrash className='text-lg' />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='flex flex-col items-center justify-center py-12'>
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
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                  />
                </svg>
                <p className='text-gray-500 text-lg font-medium'>No companies found</p>
                <p className='text-gray-400 text-sm mt-1'>Try adjusting your filters or add a new company</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerManagement;
