import ButtonWithIconAndTextVertical from '../../../../shared/buttons/ButtonWithIconAndTextVertical';
import { MdOutlineManageSearch } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';
import { VscFeedback } from 'react-icons/vsc';
import { FaRegKeyboard } from 'react-icons/fa';
import { PiNoteLight } from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineBranches } from 'react-icons/ai';
import { RiLogoutCircleLine } from 'react-icons/ri';
import useAuthService from '../../services/AuthService';

type Props = {
  onItemClick: (itemName: string) => void;
  selectedItem: string;
};

const ManagerSidebar = ({ onItemClick, selectedItem }: Props) => {
  const { logOut, logging } = useAuthService();
  return (
    <div
      className='left-0 w-24 p-3 font-poppins flex flex-col h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-sm overflow-hidden'
      data-testid='cypress-manager-sidebar'
    >
      {/* Navigation Items */}
      <div className='flex flex-col gap-1 flex-1 overflow-y-auto overflow-x-hidden'>
        <ButtonWithIconAndTextVertical
          icon={<RxDashboard size={24} />}
          text='Dashboard'
          onClick={() => onItemClick('Dashboard')}
          testid='dashboard'
          isActive={selectedItem === 'Dashboard'}
        />
        <ButtonWithIconAndTextVertical
          icon={<FaRegKeyboard size={24} />}
          text='Cashiers'
          onClick={() => onItemClick('Cashiers')}
          testid='cashiers'
          isActive={selectedItem === 'Cashiers'}
        />
        <ButtonWithIconAndTextVertical
          icon={<PiNoteLight size={24} />}
          text='Summary'
          onClick={() => onItemClick('Summary')}
          testid='summary'
          isActive={selectedItem === 'Summary'}
        />
        <ButtonWithIconAndTextVertical
          icon={<MdOutlineManageSearch size={24} />}
          text='Items'
          onClick={() => onItemClick('Items')}
          testid='items'
          isActive={selectedItem === 'Items'}
        />
        <ButtonWithIconAndTextVertical
          icon={<AiOutlineBranches size={24} />}
          text='Sellers'
          onClick={() => onItemClick('Branches')}
          testid='branches'
          isActive={selectedItem === 'Branches'}
        />
        <ButtonWithIconAndTextVertical
          icon={<VscFeedback size={24} />}
          text='Orders'
          onClick={() => onItemClick('Orders')}
          testid='orders'
          isActive={selectedItem === 'Orders'}
        />
      </div>
      
      {/* Logout Button - Fixed at bottom */}
      <div className='mt-auto pt-3 border-t border-gray-200'>
        <ButtonWithIconAndTextVertical
          icon={<RiLogoutCircleLine size={24} />}
          text={logging ? 'Logging...' : 'Logout'}
          onClick={logOut}
          testid='logout'
          isActive={false}
        />
      </div>
    </div>
  );
};

export default ManagerSidebar;
