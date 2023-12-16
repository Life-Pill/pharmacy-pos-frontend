import React from 'react';
import Clock from 'react-live-clock';
import moment from 'moment';
type Props = {};

const DateAndClock = (props: Props) => {
  return (
    <div className='flex items-center justify-center m-4 flex-col space-y-4'>
      <Clock
        format={'HH:mm:ss'}
        ticking={true}
        timezone={'Asia/Colombo'}
        className='text-9xl'
      />
      <div className='text-4xl'>{moment().format('MMMM Do YYYY')}</div>
    </div>
  );
};

export default DateAndClock;
