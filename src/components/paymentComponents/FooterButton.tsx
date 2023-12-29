import React from 'react';

type FooterButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

const FooterButton = ({ icon, text, onClick }: FooterButtonProps) => {
  return (
    <button
      className='p-2 text-white rounded-xl bg-blue flex flex-col items-center px-8 mx-2'
      onClick={onClick}
    >
      {React.cloneElement(icon as React.ReactElement, { size: 50 })}

      <span className='mt-1 text-sm'>{text}</span>
    </button>
  );
};

export default FooterButton;
