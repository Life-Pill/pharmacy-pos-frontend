import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { CiViewList } from 'react-icons/ci';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { LiaHistorySolid } from 'react-icons/lia';
import { PiDeviceMobileSpeakerThin } from 'react-icons/pi';
import ButtonWithIconAndText from '../../../../shared/buttons/ButtonWithIconAndText';
import ProfileNameCard from '../../../../shared/cashier_profile/ProfileNameCard';
import DateAndTimeNavBar from '../../../../shared/clock/DateAndTimeNavBar';
import Divider from '../../../../shared/divider/Divider';
import MedicineSearchBar from '../../../../shared/searchbar/MedicineSearchBar';
import Logo from '../../../../assets/logo/logo.png';

type Props = {};

const ManagerNavbar = (props: Props) => {
  const handleClick = () => {};
  return (
    <div
      className='flex items-center justify-between w-full p-2 font-poppins shadow-md'
      data-testid='cypress-manager-navbar'
    >
      <div className='flex flex-row items-center justify-center gap-4'>
        {/* Back Button */}
        <div className='ml-2'>
          <IoArrowBackCircleOutline size={40} style={{ color: 'gray' }} />
        </div>

        <Divider />

        {/* Logo */}
        <div>
          <img src={Logo} alt='Logo' width={60} height={60} />
        </div>

        <h2 className='font-medium text-lg'>Dashboard</h2>
      </div>

      <div className='flex flex-row items-center justify-center gap-2'>
        {/* Date and time */}
        <DateAndTimeNavBar />

        <Divider />

        {/* Cashier name,number and profile picture */}
        <ProfileNameCard />
      </div>
    </div>
  );
};

export default ManagerNavbar;
