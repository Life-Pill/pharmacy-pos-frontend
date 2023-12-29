import React from 'react';

type Props = {};

const HorizontalDivider = (props: Props) => {
  return (
    <div className='w-full h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100'></div>
  );
};

export default HorizontalDivider;
