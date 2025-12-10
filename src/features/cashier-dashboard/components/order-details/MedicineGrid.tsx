import { useState } from 'react';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import CountRoundButton from '../../../../shared/buttons/CountRoundButton';
import { usePaymentContext } from '../../layout/MainCashierDashboard';

const MedicineGrid = () => {
  const {
    setPaymentDetails,
    setOrderedMedicine,
    paymentDetails,
    orderedMedicine,
    setFilteredMedicine,
    filteredMedicine,
  } = usePaymentContext();
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const filterUpdateMedicine = [...filteredMedicine];

  const handleAddAmount = (index: number) => {
    const updatedMedicines = [...orderedMedicine];
    console.log(updatedMedicines);
    console.log(filteredMedicine);

    if (updatedMedicines[index].availableQuantity > 0) {
      updatedMedicines[index].amount += 1;
      updatedMedicines[index].availableQuantity -= 1;
      filterUpdateMedicine[index].quantity -= 1;

      setOrderedMedicine(updatedMedicines);
      setFilteredMedicine(filterUpdateMedicine);

      calculateTotalAmount();
    } else {
      alert('You have reached the maximum quantity');
      return;
    }
  };

  const handleSubtractAmount = (index: number) => {
    const updatedMedicines = [...orderedMedicine];
    if (updatedMedicines[index].amount !== 0) {
      updatedMedicines[index].amount -= 1;
      updatedMedicines[index].availableQuantity += 1;
      filterUpdateMedicine[index].quantity += 1;
      setFilteredMedicine(filterUpdateMedicine);
      setOrderedMedicine(updatedMedicines);
      calculateTotalAmount();
    } else {
      alert('You have reached the minimum quantity');
      return;
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedMedicines = [...orderedMedicine];
    const removedItem = updatedMedicines[index];
    
    // Restore quantity to filtered medicine
    filterUpdateMedicine[index].quantity += removedItem.amount;
    setFilteredMedicine(filterUpdateMedicine);
    
    // Remove item from order
    updatedMedicines.splice(index, 1);
    setOrderedMedicine(updatedMedicines);
    calculateTotalAmount();
  };

  const handleAmountChange = (amount: any, index: number) => {
    const updatedMedicines = [...orderedMedicine];
    if (amount > updatedMedicines[index].availableQuantity && !amount.isNan) {
      alert('You have reached the maximum quantity');
      return;
    } else {
      updatedMedicines[index].amount = amount;
      // updatedMedicines[index].availableQuantity -= amount;
      filterUpdateMedicine[index].quantity -= amount;
      setFilteredMedicine(filterUpdateMedicine);
      setOrderedMedicine(updatedMedicines);
      calculateTotalAmount();
    }
  };

  const calculateTotalAmount = () => {
    let total = 0;
    orderedMedicine.forEach((medicine) => {
      total += medicine.unitPrice * medicine.amount;
    });
    setDiscountedTotal(total - (total * discount) / 100);
    setTotalAmount(total);
    setPaymentDetails({ ...paymentDetails, paymentAmount: total, paymentDiscount: discount });
    setOrderedMedicine(orderedMedicine);
  };

  const calculateAfterDiscount = (discount: number) => {
    if (discount >= 0 && discount <= 100) {
      setDiscount(discount);
      setDiscountedTotal(totalAmount - (totalAmount * discount) / 100);
      setPaymentDetails({ ...paymentDetails, paymentDiscount: discount });
    } else {
      alert('Discount must be between 0 and 100');
      setDiscount(0);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Order Items List - Scrollable */}
      <div className='flex-1 overflow-y-auto mb-4'>
        {orderedMedicine.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-64 text-gray-400'>
            <svg className='w-20 h-20 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
            </svg>
            <p className='text-lg font-medium'>No items added</p>
            <p className='text-sm'>Scan or search to add items</p>
          </div>
        ) : (
          <div className='space-y-2'>
            {orderedMedicine.map((item, index) => (
              <div
                key={item.id}
                className='bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow'
              >
                <div className='flex justify-between items-start mb-2'>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-gray-800 text-sm'>{item.name}</h4>
                    <p className='text-xs text-gray-500'>ID: {item.id}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className='text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors'
                    title='Remove item'
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
                
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => handleSubtractAmount(index)}
                      className='bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md p-1.5 transition-colors'
                    >
                      <IoIosRemove size={18} />
                    </button>
                    <input
                      type='number'
                      className='w-14 text-center border border-gray-300 rounded-md py-1 font-semibold text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none'
                      value={item.amount}
                      onChange={(e) => handleAmountChange(e.target.valueAsNumber, index)}
                      min='0'
                    />
                    <button
                      onClick={() => handleAddAmount(index)}
                      className='bg-blue-600 hover:bg-blue-700 text-white rounded-md p-1.5 transition-colors'
                    >
                      <IoIosAdd size={18} />
                    </button>
                  </div>
                  
                  <div className='text-right'>
                    <p className='text-xs text-gray-500'>Rs. {item.unitPrice.toFixed(2)} each</p>
                    <p className='text-base font-bold text-blue-600'>
                      Rs. {(item.unitPrice * item.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className='mt-2 pt-2 border-t border-gray-100'>
                  <p className='text-xs text-gray-500'>
                    Available: {item.availableQuantity} units
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Section - Fixed at bottom */}
      {orderedMedicine.length > 0 && (
        <div className='bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-200'>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-gray-600'>Subtotal</span>
            <span className='font-semibold text-gray-800'>Rs. {totalAmount.toFixed(2)}</span>
          </div>
          
          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-600'>Discount (%)</span>
            <input
              type='number'
              value={discount}
              onChange={(e) => calculateAfterDiscount(e.target.valueAsNumber)}
              className='w-20 text-right border border-gray-300 rounded-md px-2 py-1 text-sm font-semibold focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none'
              min='0'
              max='100'
            />
          </div>
          
          {discount > 0 && (
            <div className='flex justify-between items-center pt-2 border-t border-gray-200'>
              <span className='text-sm font-medium text-gray-700'>After Discount</span>
              <span className='text-lg font-bold text-green-600'>
                Rs. {discountedTotal.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineGrid;
