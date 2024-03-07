import ButtonWithIconAndTextVertical from '../../../../shared/buttons/ButtonWithIconAndTextVertical';
import { MdOutlineManageSearch } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';
import { VscFeedback } from 'react-icons/vsc';
import { FaRegKeyboard } from 'react-icons/fa';
import { PiNoteLight } from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';

type Props = {};

const ManagerSidebar = (props: Props) => {
  const handleClick = () => {};
  return (
    <div className='left-0 max-w-24 p-4 font-poppins flex flex-col'>
      <ButtonWithIconAndTextVertical
        icon={<RxDashboard size={25} />}
        text='Dashboard'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<FaRegKeyboard size={25} />}
        text='Cashiers'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<PiNoteLight size={25} />}
        text='Summary'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<MdOutlineManageSearch size={25} />}
        text='Manage Items'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<IoSaveOutline size={25} />}
        text='Saved Reports'
        onClick={handleClick}
      />
      <ButtonWithIconAndTextVertical
        icon={<VscFeedback size={25} />}
        text='Feedbacks'
        onClick={handleClick}
      />
    </div>
  );
};

export default ManagerSidebar;
