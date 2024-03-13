import React, { ReactNode } from 'react';

type ButtonWithIconAndTextVerticalProps = {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  testid: string;
};

const ButtonWithIconAndTextVertical: React.FC<
  ButtonWithIconAndTextVerticalProps
> = ({ icon, text, onClick, testid }) => {
  return (
    <div className='hover:text-white text-black' data-testid={testid}>
      <button
        type='button'
        className='hover:bg-blue 
          focus:outline-none rounded-lg p-2 text-sm focus:ring
          focus:border-blue-300 transition duration-300 w-[75px] mb-2'
        onClick={onClick}
      >
        <div className='flex items-center justify-center flex-col'>
          {icon && <span className='mb-2'>{icon}</span>}
          <span>{text}</span>
        </div>
      </button>
    </div>
  );
};

export default ButtonWithIconAndTextVertical;
