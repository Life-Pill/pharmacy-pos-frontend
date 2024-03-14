import ButtonWithIconAndTextVertical from '../../../../shared/buttons/ButtonWithIconAndTextVertical';
import { MdOutlineManageSearch } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';
import { VscFeedback } from 'react-icons/vsc';
import { FaRegKeyboard } from 'react-icons/fa';
import { PiNoteLight } from 'react-icons/pi';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineBranches } from 'react-icons/ai';

type Props = {
  onItemClick: (itemName: string) => void;
};

const ManagerSidebar = ({ onItemClick }: Props) => {
  return (
    <div
      className='left-0 max-w-24 p-4 font-poppins flex flex-col'
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
        text='Branches'
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
        text='Feedbacks'
        onClick={() => onItemClick('Feedbacks')}
        testid='feedbacks'
      />
    </div>
  );
};

export default ManagerSidebar;
