import React from 'react';

type Props = {};

const Divider = (props: Props) => {
  return (
    <div className='h-auto min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100'></div>
  );
};

export default Divider;
