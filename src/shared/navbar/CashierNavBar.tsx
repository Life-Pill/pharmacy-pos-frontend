import { IoArrowBackCircleOutline } from 'react-icons/io5';
import DateAndTimeNavBar from '../clock/DateAndTimeNavBar';
import MedicineSearchBar from '../searchbar/MedicineSearchBar';
import { AiFillHome } from 'react-icons/ai';
import ButtonWithIconAndText from '../buttons/ButtonWithIconAndText';
import { CiViewList } from 'react-icons/ci';
import { LiaHistorySolid } from 'react-icons/lia';
import { PiDeviceMobileSpeakerThin } from 'react-icons/pi';
import ProfileNameCard from '../cashier_profile/ProfileNameCard';
import Divider from '../divider/Divider';
import { useState } from 'react';
import OrderCardComponent from '../../features/cashier-dashboard/components/order-card/OrderCardComponent';
const Logo = require('../../assets/logo/logo.png');

const CashierNavBar = () => {
  const [showOnlineOrders, setShowOnlineOrders] = useState(false);

  const handleShowOnlineOrders = () => {
    setShowOnlineOrders(!showOnlineOrders);
  };
  const handleClick = () => {};
  return (
    <div className='flex items-center justify-between w-full p-2 font-poppins shadow-md'>
      {/* Back Button */}
      {/* <div className='ml-2'>
        <IoArrowBackCircleOutline size={40} style={{ color: 'gray' }} />
      </div>

      <Divider /> */}

      {/* Logo */}
      <div>
        <img src={Logo} alt='Logo' width={60} height={60} className='ml-4' />
      </div>

      {/* Date and time */}
      <DateAndTimeNavBar />

      {/* Search */}
      <MedicineSearchBar />

      <Divider />

      {/* Buttons for home,orders,history and online orders */}
      {/* <ButtonWithIconAndText
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
      /> */}
      <ButtonWithIconAndText
        icon={<PiDeviceMobileSpeakerThin size={20} />}
        text='Online Orders'
        onClick={handleShowOnlineOrders}
      />

      <Divider />

      {/* Cashier name,number and profile picture */}
      <ProfileNameCard />

      {showOnlineOrders && (
        <OrderCardComponent onClose={handleShowOnlineOrders} />
      )}
    </div>
  );
};

export default CashierNavBar;
