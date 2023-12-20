import React from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import DateAndTimeNavBar from '../clock/DateAndTimeNavBar';
import MedicineSearchBar from '../searchbar/MedicineSearchBar';
import { AiFillHome } from 'react-icons/ai';
import ButtonWithIconAndText from '../buttons/ButtonWithIconAndText';
import { CiViewList } from 'react-icons/ci';
import { LiaHistorySolid } from 'react-icons/lia';
import { PiDeviceMobileSpeakerThin } from 'react-icons/pi';
import ProfileNameCard from '../cashierprofile/ProfileNameCard';
import Divider from '../divider/Divider';
const Logo = require('../../assets/logo/logo.png');

type Props = {};

const CashierNavBar = (props: Props) => {
  const handleClick = () => {};
  return (
    <div className='flex items-center justify-between w-full p-2 mx-4 my-2 font-poppins shadow-md fixed top-0'>
      {/* Back Button */}
      <div className='ml-2'>
        <IoArrowBackCircleOutline size={40} style={{ color: 'gray' }} />
      </div>

      <Divider />

      {/* Logo */}
      <div>
        <img src={Logo} alt='Logo' width={60} height={60} />
      </div>

      {/* Date and time */}
      <DateAndTimeNavBar />

      {/* Search */}
      <MedicineSearchBar />

      <Divider />

      {/* Buttons for home,orders,history and online orders */}
      <ButtonWithIconAndText
        icon={<AiFillHome size={20} />}
        text='Home'
        onClick={handleClick}
      />
      <ButtonWithIconAndText
        icon={<CiViewList size={20} />}
        text='Orders'
        onClick={handleClick}
      />
      <ButtonWithIconAndText
        icon={<LiaHistorySolid size={20} />}
        text='History'
        onClick={handleClick}
      />
      <ButtonWithIconAndText
        icon={<PiDeviceMobileSpeakerThin size={20} />}
        text='Online Orders'
        onClick={handleClick}
      />

      <Divider />

      {/* Cashier name,number and profile picture */}
      <ProfileNameCard />
    </div>
  );
};

export default CashierNavBar;
