import React from 'react';
import HorizontalDivider from '../divider/HorizontalDivider';
import ButtonWithTextOnly from '../buttons/ButtonWithTextOnly';

type Props = {
  isCardVisible: boolean;
  onClose: () => void;
};

const ConfirmPaymentPopUp = ({ isCardVisible, onClose }: Props) => {
  if (!isCardVisible) return null;
  const onClick = () => {};
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
      onClick={() => {
        onClose();
      }}
    >
      <div className='w-[600px]'>
        <div className='bg-white p-2 rounded-lg'>
          <div>
            <p>Order Confirmation</p>
            <p>Please confirm the order before payment</p>
          </div>

          <div>{/* Here a medicine grid */}</div>

          <div>
            <div>
              <p>Notes</p>
              <input />
            </div>
            <div>
              <div>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>
              <div>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>
              <div>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>
              <div>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>
              <div>
                <p>SubTotal</p>
                <p>LKR.7000</p>
              </div>
            </div>

            <HorizontalDivider />

            <div>
              <div>
                <p>Payment Method</p>
                <p>Cash</p>
              </div>

              <div>
                <button className='login_button text-center w-64'>
                  Cancel
                </button>
                <button className='signup_button w-64 border border-solid border-blueDarker rounded-full'>
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPaymentPopUp;
