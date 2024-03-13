import React from 'react';
import { PiSyringeLight } from 'react-icons/pi';
import { PiHandHeartLight } from 'react-icons/pi';
import { PiPillLight } from 'react-icons/pi';
import { IoIosFitness } from 'react-icons/io';
import { PiFirstAidKit } from 'react-icons/pi';
import { CiMedicalClipboard } from 'react-icons/ci';
import ButtonWithIconAndTextVertical from '../../../../shared/buttons/ButtonWithIconAndTextVertical';

type Props = {};

const CashierSideBar = (props: Props) => {
  const handleClick = () => {};
  return (
    <div className='left-0 max-w-24 p-4 font-poppins flex flex-col'>
      <ButtonWithIconAndTextVertical
        icon={<PiSyringeLight size={25} />}
        text='Medical Devices'
        onClick={handleClick}
        testid='medical-devices'
      />
      <ButtonWithIconAndTextVertical
        icon={<PiHandHeartLight size={25} />}
        text='Personal Care'
        onClick={handleClick}
        testid='personal-care'
      />
      <ButtonWithIconAndTextVertical
        icon={<PiPillLight size={25} />}
        text='Medicine'
        onClick={handleClick}
        testid='medicine'
      />
      <ButtonWithIconAndTextVertical
        icon={<IoIosFitness size={25} />}
        text='Sports'
        onClick={handleClick}
        testid='sports'
      />
      <ButtonWithIconAndTextVertical
        icon={<PiFirstAidKit size={25} />}
        text='First AID'
        onClick={handleClick}
        testid='first-aid'
      />
      <ButtonWithIconAndTextVertical
        icon={<CiMedicalClipboard size={25} />}
        text='Nutrition'
        onClick={handleClick}
        testid='nutrition'
      />
    </div>
  );
};

export default CashierSideBar;
