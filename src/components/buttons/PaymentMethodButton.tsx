import React from 'react';

type PaymentMethodButtonProps = {
  imageSrc: string; // URL or local path to the PNG image
  onClick: () => void;
};

function PaymentMethodButton({ imageSrc, onClick }: PaymentMethodButtonProps) {
  return (
    <button
      className='p-2 text-black rounded-md transition-transform transform hover:scale-110 hover:text-white focus:border-blueDarker duration-300 focus:ring border border-gray'
      onClick={onClick}
    >
      <img
        src={imageSrc}
        alt='Payment Method'
        className=' w-16 h-12 object-contain'
      />
    </button>
  );
}

export default PaymentMethodButton;
