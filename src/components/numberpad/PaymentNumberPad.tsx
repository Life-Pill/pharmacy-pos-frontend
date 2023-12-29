import React from 'react';

type PaymentNumberPadProps = {
  onKeyPress: (key: string) => void;
};

const PaymentNumberPad = ({ onKeyPress }: PaymentNumberPadProps) => {
  const handleKeyPress = (key: string) => {
    // Pass the key to the parent component
    onKeyPress(key);
  };

  const renderButton = (value: string) => (
    <button
      key={value}
      className='flex items-center justify-center text-xl border-none rounded-full w-24 h-16 bg-numberpadbutton font-bold text-black'
      onClick={() => handleKeyPress(value)}
    >
      {value}
    </button>
  );

  const numberPadRows: string[][] = [
    ['1', '2', '3', '10'],
    ['4', '5', '6', '20'],
    ['7', '8', '9', 'Back'],
    ['C', '0', '.', 'Add'],
  ];

  return (
    <div className='mx-auto mt-2'>
      <div className='grid grid-rows-4 gap-3'>
        {numberPadRows.map((row, rowIndex) => (
          <div key={rowIndex} className='flex flex-row gap-2'>
            {row.map((key) => renderButton(key))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentNumberPad;
