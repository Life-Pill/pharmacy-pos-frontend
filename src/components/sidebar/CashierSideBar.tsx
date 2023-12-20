import React from 'react';
import { PiSyringeLight } from 'react-icons/pi';
import { PiHandHeartLight } from 'react-icons/pi';
import { PiPillLight } from 'react-icons/pi';
import { IoIosFitness } from 'react-icons/io';
import { PiFirstAidKit } from 'react-icons/pi';
import { CiMedicalClipboard } from 'react-icons/ci';
import ButtonWithIconAndTextVertical from '../buttons/ButtonWithIconAndTextVertical';

type Props = {};

const CashierSideBar = (props: Props) => {
  const handleClick = () => {};
  return (
    <div className='fixed left-0 max-w-24 p-4 shadow-md h-screen font-poppins'>
      <ButtonWithIconAndTextVertical
        icon={<PiSyringeLight size={25} />}
        text='Medical Devices'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<PiHandHeartLight size={25} />}
        text='Personal Care'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<PiPillLight size={25} />}
        text='Medicine'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<IoIosFitness size={25} />}
        text='Sports'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<PiFirstAidKit size={25} />}
        text='First AID'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<CiMedicalClipboard size={25} />}
        text='Nutrition'
        onClick={handleClick}
      />
    </div>
  );
};

export default CashierSideBar;
