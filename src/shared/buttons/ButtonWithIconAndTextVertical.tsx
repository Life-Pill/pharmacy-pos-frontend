import React, { ReactNode } from 'react';

type ButtonWithIconAndTextVerticalProps = {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  testid: string;
  isActive?: boolean;
};

const ButtonWithIconAndTextVertical: React.FC<
  ButtonWithIconAndTextVerticalProps
> = ({ icon, text, onClick, testid, isActive = false }) => {
  return (
    <div data-testid={testid}>
      <button
        type='button'
        className={`
          relative w-full p-2.5 rounded-lg text-xs font-medium
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          ${
            isActive
              ? 'bg-blue-600 text-white shadow-md scale-105'
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
          }
        `}
        onClick={onClick}
      >
        <div className='flex items-center justify-center flex-col gap-1.5'>
          {icon && (
            <span className={`transition-transform duration-200 ${
              isActive ? 'scale-110' : ''
            }`}>
              {icon}
            </span>
          )}
          <span className='text-[10px] leading-tight text-center break-words'>
            {text}
          </span>
        </div>
        {isActive && (
          <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full' />
        )}
      </button>
    </div>
  );
};

export default ButtonWithIconAndTextVertical;
