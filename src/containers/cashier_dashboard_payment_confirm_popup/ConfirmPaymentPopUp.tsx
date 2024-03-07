import React from 'react';
import HorizontalDivider from '../../shared/divider/HorizontalDivider';
import MedicineGridPopUp from '../../features/cashier-dashboard/components/order-confirm/MedineGridPopUp';
type Props = {
  isCardVisible: boolean;
  onClose: () => void;
};

const ConfirmPaymentPopUp = ({ isCardVisible, onClose }: Props) => {
  if (!isCardVisible) return null;
  const onClick = () => {};
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center font-poppins text-xs'>
      <div className=' w-[750px]'>
        <div className='bg-white p-8 rounded-lg'>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-sm'>Order Confirmation</p>
            <p className='font-thin text-xs'>
              Please confirm the order before payment
            </p>
          </div>

          <div>
            <MedicineGridPopUp />
          </div>

          <div className='flex flex-row justify-between items-center gap-2'>
            <div className='bg-numberpadbutton p-2 rounded-md h-max'>
              <p>Notes</p>
              <input
                className='border border-gray p-2 rounded-md'
                type='text'
                placeholder='Enter any additional note here'
              />
            </div>

            <div className='flex flex-col flex-1'>
              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>

              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>

              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>

              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>

              <div className='flex flex-row justify-between items-center bg-numberpadbutton rounded-md p-2 mb-2'>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>
            </div>
          </div>

          <HorizontalDivider />

          <div className='flex flex-row justify-between items-center mt-2 pt-2'>
            <div>
              <p className='font-semibold'>Payment Method</p>
              <p>Cash</p>
            </div>

            <div className='flex gap-4'>
              <button
                className='login_button text-center w-28 '
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </button>
              <button className='signup_button w-28 rounded-full'>
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentPopUp;
