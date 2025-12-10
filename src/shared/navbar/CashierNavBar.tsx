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
import { useWebSocket } from '../../features/cashier-dashboard/context/WebSocketContext';
const Logo = require('../../assets/logo/logo.png');

const CashierNavBar = () => {
  const [showOnlineOrders, setShowOnlineOrders] = useState(false);
  const { prescriptions } = useWebSocket();

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
      <div className='relative'>
        <button
          type='button'
          className='bg-blue-600 text-white hover:bg-blue-700 
          focus:outline-none rounded-lg px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-400 
          transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105'
          onClick={handleShowOnlineOrders}
        >
          <div className='flex items-center justify-center gap-2'>
            <PiDeviceMobileSpeakerThin size={22} />
            <span>Online Orders</span>
          </div>
        </button>
        {prescriptions.length > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center'>
            {prescriptions.length > 99 ? '99+' : prescriptions.length}
          </span>
        )}
      </div>

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
