import React from 'react';
import DateAndClock from '../components/clock/DateAndClock';
import RecentCashier from '../components/login/RecentCashier';

type Props = {};

const CashierTemporaryLogOutPage = (props: Props) => {
  return (
    <div className='flex flex-col h-screen items-center justify-between'>
      {/* Clock */}
      <div className='flex-grow'>
        <DateAndClock />
      </div>
      {/* Recently logged cashier */}
      <div>
        <RecentCashier />
      </div>
    </div>
  );
};

export default CashierTemporaryLogOutPage;
