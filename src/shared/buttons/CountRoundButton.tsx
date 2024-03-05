import React from 'react';

type CountRoundButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

const CountRoundButton = ({ icon, onClick }: CountRoundButtonProps) => {
  return (
    <button
      className='rounded-full border-solid border border-black text-black p-2'
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default CountRoundButton;
