import React from 'react';
import Clock from 'react-live-clock';
import moment from 'moment';

type Props = {};

const DateAndTimeNavBar = (props: Props) => {
  return (
    <div className='flex items-center justify-center m-2 flex-row p-2'>
      <Clock
        format={'HH:mm:ss'}
        ticking={true}
        timezone={'Asia/Colombo'}
        className='text-sm'
      />
      <div className='text-sm ml-2'>{moment().format('DD-MMM-YYYY')}</div>
    </div>
  );
};

export default DateAndTimeNavBar;
