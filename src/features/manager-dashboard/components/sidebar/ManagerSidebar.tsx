import ButtonWithIconAndTextVertical from '../../../../shared/buttons/ButtonWithIconAndTextVertical';
import { MdOutlineManageSearch } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';
import { VscFeedback } from 'react-icons/vsc';
import { FaRegKeyboard } from 'react-icons/fa';
import { PiNoteLight } from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineBranches } from 'react-icons/ai';
import { RiLogoutCircleLine } from 'react-icons/ri'; // Import the logout icon
import useAuthService from '../../services/AuthService';

type Props = {
  onItemClick: (itemName: string) => void;
};

const ManagerSidebar = ({ onItemClick }: Props) => {
  const { logOut, logging } = useAuthService();
  return (
    <div
      className='left-0 max-w-24 p-4 font-poppins flex flex-col relative'
      data-testid='cypress-manager-sidebar'
    >
      <ButtonWithIconAndTextVertical
        icon={<RxDashboard size={25} />}
        text='Dashboard'
        onClick={() => onItemClick('Dashboard')}
        testid='dashboard'
      />
      <ButtonWithIconAndTextVertical
        icon={<FaRegKeyboard size={25} />}
        text='Cashiers'
        onClick={() => onItemClick('Cashiers')}
        testid='cashiers'
      />
      <ButtonWithIconAndTextVertical
        icon={<PiNoteLight size={25} />}
        text='Summary'
        onClick={() => onItemClick('Summary')}
        testid='summary'
      />
      <ButtonWithIconAndTextVertical
        icon={<MdOutlineManageSearch size={25} />}
        text='Manage Items'
        onClick={() => onItemClick('Items')}
        testid='items'
      />
      <ButtonWithIconAndTextVertical
        icon={<AiOutlineBranches size={25} />}
        text='Sellers'
        onClick={() => onItemClick('Branches')}
        testid='branches'
      />
      <ButtonWithIconAndTextVertical
        icon={<IoSaveOutline size={25} />}
        text='Saved Reports'
        onClick={() => onItemClick('Reports')}
        testid='reports'
      />
      <ButtonWithIconAndTextVertical
        icon={<VscFeedback size={25} />}
        text='Orders'
        onClick={() => onItemClick('Orders')}
        testid='orders'
      />
      {/* Logout Button */}
      <div className='absolute bottom-4 left-auto w-full'>
        <ButtonWithIconAndTextVertical
          icon={<RiLogoutCircleLine size={25} />} // Use the logout icon
          text={logging ? 'Logging Out' : 'LogOut'}
          onClick={logOut} // Implement logout functionality here
          testid='logout'
        />
      </div>
    </div>
  );
};

export default ManagerSidebar;
