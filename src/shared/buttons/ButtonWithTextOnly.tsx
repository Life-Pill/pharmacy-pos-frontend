import React from 'react';

interface ButtonWithTextOnlyProps {
  text: String;
  onClick: () => void;
}

const ButtonWithTextOnly: React.FC<ButtonWithTextOnlyProps> = ({
  text,
  onClick,
}) => {
  return (
    <button
      type='button'
      className='bg-blue text-white rounded-lg p-4 text-md w-full'
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonWithTextOnly;
