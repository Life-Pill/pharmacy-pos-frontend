import React, { useEffect, useState } from 'react';
import ButtonWithTextOnly from '../../../../shared/buttons/ButtonWithTextOnly';
import MedicineGrid from '../order-details/MedicineGrid';
import {
  ComponentState,
  usePaymentContext,
} from '../../layout/MainCashierDashboard';

type Props = {};

const OrderDetailsSideBar = (props: Props) => {
  const { setCurrentComponent, medicine, setMedicine } = usePaymentContext();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const PayNowButtonClick = () => {
    setCurrentComponent(ComponentState.ConfirmPayment);
  };

  const handleSearchMedicine = (value: string): void => {
    setSearchQuery(value.trim());
    setMedicine(
      medicine.filter((med) =>
        med.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (searchQuery === '') {
      setMedicine(medicine);
    }
  }, [searchQuery]);

  return (
    <div className='w-auto flex justify-center flex-col font-poppins space-y-3 p-4 min-h-[400px]'>
      <p className='border rounded-full w-10/12 bg-slate-300 text-grayLight text-center mx-auto p-2 '>
        Order Details
      </p>
      <div>
        <p className='font-bold'>BarCode</p>
        <input
          className='border p-2 rounded-md w-full'
          type='text'
          placeholder='Scan or enter barcode'
          value={searchQuery}
          onChange={(e) => handleSearchMedicine(e.target.value)}
        />
      </div>
      <div>
        <MedicineGrid />
      </div>

      <div>
        <ButtonWithTextOnly text='Pay Now' onClick={PayNowButtonClick} />
      </div>
    </div>
  );
};

export default OrderDetailsSideBar;
