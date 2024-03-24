import React, { Dispatch } from 'react';
import { PiSyringeLight } from 'react-icons/pi';
import { PiHandHeartLight } from 'react-icons/pi';
import { PiPillLight } from 'react-icons/pi';
import { IoIosFitness } from 'react-icons/io';
import { PiFirstAidKit } from 'react-icons/pi';
import { CiMedicalClipboard } from 'react-icons/ci';
import ButtonWithIconAndTextVertical from '../../../../shared/buttons/ButtonWithIconAndTextVertical';

type Props = {
  //pass setactivetable
  setActiveTable: Dispatch<string>;
};

const CashierSideBar = (props: Props) => {
  return (
    <div className='left-0 max-w-24 p-4 font-poppins flex flex-col'>
      <ButtonWithIconAndTextVertical
        icon={<PiSyringeLight size={25} />}
        text='Medical Devices'
        onClick={() => props.setActiveTable('medical-devices')}
        testid='medical-devices'
      />
      <ButtonWithIconAndTextVertical
        icon={<PiHandHeartLight size={25} />}
        text='Personal Care'
        onClick={() => props.setActiveTable('personal-care')}
        testid='personal-care'
      />
      <ButtonWithIconAndTextVertical
        icon={<PiPillLight size={25} />}
        text='Medicine'
        onClick={() => props.setActiveTable('medicine')}
        testid='medicine'
      />
      <ButtonWithIconAndTextVertical
        icon={<IoIosFitness size={25} />}
        text='Sports'
        onClick={() => props.setActiveTable('sports')}
        testid='sports'
      />
      <ButtonWithIconAndTextVertical
        icon={<PiFirstAidKit size={25} />}
        text='First AID'
        onClick={() => props.setActiveTable('first-aid')}
        testid='first-aid'
      />
      <ButtonWithIconAndTextVertical
        icon={<CiMedicalClipboard size={25} />}
        text='Nutrition'
        onClick={() => props.setActiveTable('nutrition')}
        testid='nutrition'
      />
    </div>
  );
};

export default CashierSideBar;
