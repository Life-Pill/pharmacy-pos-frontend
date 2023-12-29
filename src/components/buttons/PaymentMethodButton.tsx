import React from 'react';

type PaymentMethodButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

function PaymentMethodButton({ icon, onClick }: PaymentMethodButtonProps) {
  return (
    <button
      className='p-2 text-black rounded-md hover:bg-blueDarker hover:text-white focus:border-blueDarker transition duration-300 focus:ring border border-gray'
      onClick={onClick}
    >
      {React.cloneElement(icon as React.ReactElement, { size: 60 })}
    </button>
  );
}

export default PaymentMethodButton;
