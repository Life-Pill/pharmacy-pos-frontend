import React from 'react';

type Props = {};

const OrderDetailsSideBar = (props: Props) => {
  return (
    <div className='w-[700px]'>
      <p>Order Details</p>
      <div>
        <p>BarCode</p>
        <input />
      </div>
      <div>{/* Medicine adding grid */}</div>
      <div>
        <p>Total Amount</p>
        <p>Rs.4000</p>
      </div>
      <div>
        <button>Pay Now</button>
      </div>
    </div>
  );
};

export default OrderDetailsSideBar;
