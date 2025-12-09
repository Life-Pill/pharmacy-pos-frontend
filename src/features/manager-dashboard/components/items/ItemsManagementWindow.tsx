import { useEffect, useState } from 'react';
import { TbCirclePlus } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import useItemService from '../../../items-management/services/ItemDetailsCRUDService';
import { BsPencilSquare, BsEye, BsTrash } from 'react-icons/bs';
import { BsBoxSeam, BsBoxes, BsExclamationTriangle } from 'react-icons/bs';
import { Loader } from 'lucide-react';

const ItemsManagementWindow = () => {
  const {
    fetchAllItems,
    items,
    filteredItems,
    setFilteredItems,
    deleteItem,
    loading,
  } = useItemService();

  const [searchName, setSearchName] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [filterExpiry, setFilterExpiry] = useState<'all' | 'expired' | 'expiringSoon' | 'valid'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'quantity' | 'expiry'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchAllItems();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [items, searchName, filterStatus, filterExpiry, sortBy, sortOrder]);

  const applyFilters = () => {
    let filtered = [...items];

    // Search by name
    if (searchName) {
      filtered = filtered.filter((medicine) =>
        medicine.itemName.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Filter by stock status
    if (filterStatus === 'inStock') {
      filtered = filtered.filter((medicine) => medicine.itemQuantity > 0);
    } else if (filterStatus === 'outOfStock') {
      filtered = filtered.filter((medicine) => medicine.itemQuantity === 0);
    }

    // Filter by expiry
    const now = new Date();
    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    
    if (filterExpiry === 'expired') {
      filtered = filtered.filter((medicine) => new Date(medicine.expireDate) < now);
    } else if (filterExpiry === 'expiringSoon') {
      filtered = filtered.filter((medicine) => {
        const expDate = new Date(medicine.expireDate);
        return expDate > now && expDate < threeMonthsFromNow;
      });
    } else if (filterExpiry === 'valid') {
      filtered = filtered.filter((medicine) => new Date(medicine.expireDate) >= threeMonthsFromNow);
    }

    // Sort
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'name':
          compareValue = a.itemName.localeCompare(b.itemName);
          break;
        case 'price':
          compareValue = a.sellingPrice - b.sellingPrice;
          break;
        case 'quantity':
          compareValue = a.itemQuantity - b.itemQuantity;
          break;
        case 'expiry':
          compareValue = new Date(a.expireDate).getTime() - new Date(b.expireDate).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    setFilteredItems(filtered);
  };

  const handleClearFilters = () => {
    setSearchName('');
    setFilterStatus('all');
    setFilterExpiry('all');
    setSortBy('name');
    setSortOrder('asc');
  };

  const navigate = useNavigate();

  // Calculate summary information
  const totalItems = items.length;
  const inStockItems = items.reduce(
    (acc, item) => acc + (item.itemQuantity > 0 ? 1 : 0),
    0
  );
  const outOfStockItems = items.reduce(
    (acc, item) => acc + (item.itemQuantity === 0 ? 1 : 0),
    0
  );
  const averagePrice = (
    items.reduce((acc, item) => acc + item.sellingPrice, 0) / totalItems
  ).toFixed(2);

  return (
    <div className='flex flex-col gap-6 h-full overflow-y-auto' data-testid='items-management-window'>
      {/* Header Section */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg flex-shrink-0'>
        <h1 className='text-2xl font-bold text-white mb-2'>Items Management</h1>
        <p className='text-blue-100 text-sm'>Manage your inventory and track stock levels</p>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 flex-shrink-0'>
        {loading ? (
          <div className='col-span-5 flex justify-center items-center py-10'>
            <Loader className='w-10 h-10 animate-spin text-blue-600' />
          </div>
        ) : (
          <>
            <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-yellow-500'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-500 mb-1'>Total Items</p>
                  <p className='text-3xl font-bold text-gray-800'>{totalItems}</p>
                </div>
                <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center'>
                  <BsBoxSeam className='text-yellow-600 text-2xl' />
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-green-500'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-500 mb-1'>In Stock</p>
                  <p className='text-3xl font-bold text-green-600'>{inStockItems}</p>
                </div>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                  <BsBoxes className='text-green-600 text-2xl' />
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-orange-500'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-500 mb-1'>Out of Stock</p>
                  <p className='text-3xl font-bold text-orange-600'>{outOfStockItems}</p>
                </div>
                <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center'>
                  <BsExclamationTriangle className='text-orange-600 text-2xl' />
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow border-l-4 border-purple-500'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-500 mb-1'>Avg Price</p>
                  <p className='text-2xl font-bold text-purple-600'>LKR {averagePrice}</p>
                </div>
                <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                  <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
              </div>
            </div>

            <Link
              to='/add-items'
              className='bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-md p-5 hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-3 cursor-pointer group'
            >
              <TbCirclePlus size={28} className='text-gray-800 group-hover:rotate-90 transition-transform' />
              <span className='font-semibold text-gray-800'>Add Item</span>
            </Link>
          </>
        )}
      </div>

      {/* Table Section */}
      <div className='bg-white rounded-xl shadow-md flex-shrink-0 flex flex-col overflow-hidden pb-6' style={{ height: '600px' }}>
        {/* Filters Bar */}
        <div className='p-6 border-b border-gray-200 flex-shrink-0'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
            {/* Search */}
            <div className='lg:col-span-2'>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Search</label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search by name...'
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
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

            {/* Stock Status Filter */}
            <div>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Stock Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              >
                <option value='all'>All Items</option>
                <option value='inStock'>In Stock</option>
                <option value='outOfStock'>Out of Stock</option>
              </select>
            </div>

            {/* Expiry Filter */}
            <div>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Expiry Status</label>
              <select
                value={filterExpiry}
                onChange={(e) => setFilterExpiry(e.target.value as any)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              >
                <option value='all'>All</option>
                <option value='expired'>Expired</option>
                <option value='expiringSoon'>Expiring Soon</option>
                <option value='valid'>Valid</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              >
                <option value='name'>Name</option>
                <option value='price'>Price</option>
                <option value='quantity'>Quantity</option>
                <option value='expiry'>Expiry Date</option>
              </select>
            </div>

            {/* Sort Order & Clear */}
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-medium text-gray-700 mb-1 block'>Actions</label>
              <div className='flex gap-2'>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className='flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1'
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
                <button
                  onClick={handleClearFilters}
                  className='flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors'
                  title='Clear all filters'
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className='mt-3 flex items-center justify-between'>
            <p className='text-sm text-gray-600'>
              Showing <span className='font-semibold text-gray-900'>{filteredItems.length}</span> of{' '}
              <span className='font-semibold text-gray-900'>{items.length}</span> items
            </p>
          </div>
        </div>

        {/* Table Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0'>
          <h2 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
            <span className='w-1 h-5 bg-blue-500 rounded'></span>
            Medicine Details
          </h2>
        </div>

        {/* Table Content */}
        <div className='overflow-auto flex-1'>
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <Loader className='w-10 h-10 animate-spin text-blue-600' />
            </div>
          ) : (
            <table className='w-full text-sm text-left'>
              <thead className='text-xs uppercase bg-gray-50 text-gray-700 sticky top-0 z-10'>
                <tr>
                  <th scope='col' className='px-6 py-4 font-semibold'>Medicine ID</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Name</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Selling Price</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Purchase Date</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Expire Date</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Status</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Quantity</th>
                  <th scope='col' className='px-6 py-4 font-semibold text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredItems.map((medicine) => (
                  <tr
                    key={medicine.itemId}
                    className='bg-white hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-6 py-4 font-medium text-gray-900'>
                      #{medicine.itemId}
                    </td>
                    <td className='px-6 py-4 text-gray-700 font-medium'>
                      {medicine.itemName}
                    </td>
                    <td className='px-6 py-4 text-gray-600'>
                      <span className='font-semibold text-gray-900'>LKR {medicine.sellingPrice}</span>
                      <span className='text-xs text-gray-500'> / {medicine.measuringUnitType}</span>
                    </td>
                    <td className='px-6 py-4 text-gray-600'>
                      {new Date(medicine.purchaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`font-medium ${
                          new Date(medicine.expireDate) < new Date()
                            ? 'text-red-600'
                            : new Date(medicine.expireDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                            ? 'text-orange-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {new Date(medicine.expireDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          medicine.itemQuantity > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {medicine.itemQuantity > 0 ? '● In Stock' : '● Out of Stock'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold ${
                          medicine.itemQuantity > 10
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : medicine.itemQuantity > 0
                            ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                      >
                        {medicine.itemQuantity}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-2'>
                        <button
                          className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                          onClick={() => navigate(`/view-item/${medicine.itemId}`)}
                          title='View Details'
                        >
                          <BsEye className='text-lg' />
                        </button>
                        <button
                          className='p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                          onClick={() => navigate(`/update-items/${medicine.itemId}`)}
                          title='Edit Item'
                        >
                          <BsPencilSquare className='text-lg' />
                        </button>
                        <button
                          className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                          onClick={() => deleteItem(medicine.itemId)}
                          title='Delete Item'
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

export default ItemsManagementWindow;
