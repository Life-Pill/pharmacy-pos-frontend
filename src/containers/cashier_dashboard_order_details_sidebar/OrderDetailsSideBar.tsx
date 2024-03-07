import React from 'react';
import ButtonWithTextOnly from '../../shared/buttons/ButtonWithTextOnly';
import MedicineGrid from '../../features/cashier-dashboard/components/order-details/MedicineGrid';

type Props = {};

const OrderDetailsSideBar = (props: Props) => {
  const PayNowButtonClick = () => {};
  return (
    <div className='w-[700px] flex justify-center flex-col font-poppins space-y-3 p-3'>
      <p className='border rounded-full w-10/12 bg-slate-300 text-grayLight text-center mx-auto p-2 '>
        Order Details
      </p>
      <div>
        <p className='font-bold'>BarCode</p>
        <input
          className='border p-2 rounded-md w-full'
          type='text'
          placeholder='Scan or enter barcode'
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
