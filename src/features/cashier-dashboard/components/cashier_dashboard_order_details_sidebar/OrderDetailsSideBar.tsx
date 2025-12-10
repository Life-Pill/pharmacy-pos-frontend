import { useState } from 'react';
import { IoSearchOutline, IoBarcodeOutline } from 'react-icons/io5';
import { MdPayment } from 'react-icons/md';
import ButtonWithTextOnly from '../../../../shared/buttons/ButtonWithTextOnly';
import MedicineGrid from '../order-details/MedicineGrid';
import {
  ComponentState,
  usePaymentContext,
} from '../../layout/MainCashierDashboard';

type Props = {};

const OrderDetailsSideBar = (props: Props) => {
  const { setCurrentComponent, medicine, setFilteredMedicine, orderedMedicine, paymentDetails } =
    usePaymentContext();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const PayNowButtonClick = () => {
    setCurrentComponent(ComponentState.ConfirmPayment);
  };

  const handleSearchMedicine = (value: string): void => {
    setSearchQuery(value.trim());
    if (value === '') {
      setFilteredMedicine(medicine);
    } else {
      setFilteredMedicine(
        medicine.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className='w-[420px] flex flex-col font-poppins bg-gradient-to-br from-gray-50 to-white border-l border-gray-200 shadow-lg h-full'>
      {/* Header */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-md'>
        <h2 className='text-2xl font-bold mb-1'>Order Details</h2>
        <p className='text-blue-100 text-sm'>Review your items</p>
      </div>

      {/* Barcode Scanner Section */}
      <div className='p-4 bg-white border-b border-gray-200'>
        <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
          <IoBarcodeOutline size={20} className='text-blue-600' />
          Barcode Scanner
        </label>
        <div className='relative'>
          <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
          <input
            className='border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 pl-10 rounded-lg w-full outline-none transition-all text-sm'
            type='text'
            placeholder='Scan or search by name...'
            value={searchQuery}
            onChange={(e) => handleSearchMedicine(e.target.value)}
          />
        </div>
      </div>

      {/* Order Items - Scrollable */}
      <div className='flex-1 overflow-hidden p-4'>
        <MedicineGrid />
      </div>

      {/* Footer with Pay Button */}
      <div className='p-4 bg-white border-t border-gray-200 shadow-lg'>
        <div className='mb-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-gray-600'>Items</span>
            <span className='font-semibold text-gray-800'>{orderedMedicine.length}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-base font-medium text-gray-700'>Total Amount</span>
            <span className='text-2xl font-bold text-blue-600'>
              Rs. {paymentDetails.paymentAmount.toFixed(2)}
            </span>
          </div>
        </div>
        
        <button
          onClick={PayNowButtonClick}
          disabled={orderedMedicine.length === 0}
          className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg'
        >
          <MdPayment size={28} />
          <span>Pay Now</span>
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsSideBar;
