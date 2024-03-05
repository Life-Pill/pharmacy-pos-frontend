import React, { ReactNode } from 'react';

interface ButtonWithIconAndTextProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

const ButtonWithIconAndText: React.FC<ButtonWithIconAndTextProps> = ({
  icon,
  text,
  onClick,
}) => {
  return (
    <button
      type='button'
      className='text-grayLight hover:bg-blue hover:text-white 
      focus:outline-none rounded-lg p-2 text-sm focus:ring
      focus:border-blue-300 transition duration-300'
      onClick={onClick}
    >
      <div className='flex items-center justify-center'>
        {icon && <span className='mr-2'>{icon}</span>}
        <span>{text}</span>
      </div>
    </button>
  );
};

export default ButtonWithIconAndText;
