import { IoIosAdd } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import CountRoundButton from '../../../../shared/buttons/CountRoundButton';
import { usePaymentContext } from '../../layout/MainCashierDashboard';
import { MedicineType } from './MedicineColumns';
import { useEffect, useState } from 'react';
import useItemService from '../../services/ItemService';
import useOnlineOrderService from '../../services/OnlineOrderService';

const Medicine = () => {
  const { orderedMedicine, setOrderedMedicine } = usePaymentContext();
  const {
    getAllItems,
    medicine,
    filteredMedicine,
    setFilteredMedicine,
    loading,
  } = useItemService();
  const [searchQuery, setSearchQuery] = useState('');

  const { getOnlineOrders } = useOnlineOrderService();

  // const { setMedicine, medicine, setFilteredMedicine, filteredMedicine } =
  //   usePaymentContext();

  //function to add medicine to ordered medicine
  const handleAddClick = (medicine: MedicineType) => {
    setOrderedMedicine([
      ...orderedMedicine,
      {
        id: medicine.id,
        name: medicine.name,
        unitPrice: medicine.price,
        amount: 0,
        availableQuantity: medicine.quantity,
      },
    ]);
  };

  // Search functionality - always search from the complete medicine list
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredMedicine(medicine);
    } else {
      const filtered = medicine.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        String(item.id).toLowerCase().includes(query.toLowerCase()) ||
        item.status.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMedicine(filtered);
    }
  };

  useEffect(() => {
    //fetchMedicine from server
    getAllItems();
  }, []);

  // useEffect(() => {
  //   // Initial fetch
  //   getOnlineOrders();

  //   // Fetch every 120 seconds
  //   const intervalId = setInterval(() => {
  //     getOnlineOrders();
  //   }, 120000); // 120000 milliseconds = 120 seconds

  //   // Cleanup function to clear interval on unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  //

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* Search Bar */}
      <div className='relative'>
        <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
        <input
          type='text'
          placeholder='Search by name, ID, or status...'
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>

      {/* Table Container */}
      <div className='max-h-[700px] overflow-y-auto rounded-lg border border-gray-200 shadow-sm'>
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-gray-500'>Loading medicines...</p>
          </div>
        ) : filteredMedicine.length === 0 ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-gray-500'>
              {searchQuery ? 'No medicines found matching your search.' : 'No medicines available.'}
            </p>
          </div>
        ) : (
          <table className='w-full text-sm text-left'>
            <thead className='text-xs font-semibold uppercase bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 sticky top-0 z-10'>
              <tr>
                <th scope='col' className='px-6 py-4'>
                  Medicine ID
                </th>
                <th scope='col' className='px-6 py-4'>
                  Name
                </th>
                <th scope='col' className='px-6 py-4'>
                  Price
                </th>
                <th scope='col' className='px-6 py-4'>
                  Quantity
                </th>
                <th scope='col' className='px-6 py-4'>
                  Status
                </th>
                <th scope='col' className='px-6 py-4 text-center'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredMedicine.map((item, index) => (
                <tr 
                  key={item.id}
                  className='hover:bg-blue-50 transition-colors duration-150'
                >
                  <td className='px-6 py-4 font-medium text-gray-900'>{item.id}</td>
                  <td className='px-6 py-4 font-medium text-gray-700'>{item.name}</td>
                  <td className='px-6 py-4 text-gray-700'>Rs. {item.price.toFixed(2)}</td>
                  <td className='px-6 py-4'>
                    <span className={`font-semibold ${
                      item.quantity <= 0 
                        ? 'text-red-600' 
                        : item.quantity < 10 
                        ? 'text-orange-600' 
                        : 'text-green-600'
                    }`}>
                      {item.quantity < 0 ? 0 : item.quantity}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    {item.quantity > 0 && (
                      <CountRoundButton
                        onClick={() => handleAddClick(item)}
                        icon={<IoIosAdd />}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Results Count */}
      {!loading && filteredMedicine.length > 0 && (
        <div className='text-sm text-gray-600 text-center'>
          Showing {filteredMedicine.length} of {medicine.length} medicines
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}
    </div>
  );
};

export default Medicine;
