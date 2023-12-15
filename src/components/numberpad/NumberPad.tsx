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
      className='flex items-center justify-center text-xl border-none rounded-full w-28 h-20 bg-zinc-400 font-bold text-white'
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
    <div className='mx-auto mt-8'>
      <div className='grid grid-rows-3 gap-3'>
        {numberPadRows.map((row, rowIndex) => (
          <div key={rowIndex} className='flex flex-row gap-3'>
            {row.map((key) => renderButton(key))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberPad;
