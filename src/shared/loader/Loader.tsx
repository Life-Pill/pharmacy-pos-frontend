import Lottie from 'lottie-react';
import React from 'react';
import loading from '../../assets/lottie/loading.json';

type Props = {};

function Loader({}: Props) {
  return (
    <div className='flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-50'>
      <div className='bg-white p-4 rounded-lg'>
        <Lottie animationData={loading} width={150} height={150} />
      </div>
    </div>
  );
}

export default Loader;
