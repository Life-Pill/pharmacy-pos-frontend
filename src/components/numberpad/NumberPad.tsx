import React, { FC } from 'react';

interface NumberPadProps {
  onKeyPress: (key: string) => void;
}

const NumberPad: FC<NumberPadProps> = ({ onKeyPress }) => {
  const handleKeyPress = (key: string) => {
    // Pass the key to the parent component
    onKeyPress(key);
  };

  const renderButton = (value: string) => (
    <button
      key={value}
      className='flex items-center justify-center text-lg border border-gray-300 rounded'
      onClick={() => handleKeyPress(value)}
    >
      {value}
    </button>
  );

  const numberPadRows: string[][] = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['C', '0', '='],
  ];

  return (
    <div className='w-96 mx-auto mt-8'>
      <div className='grid grid-cols-3 gap-2'>
        {numberPadRows.map((row, rowIndex) => (
          <div key={rowIndex} className='flex flex-col'>
            {row.map((key) => renderButton(key))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberPad;
