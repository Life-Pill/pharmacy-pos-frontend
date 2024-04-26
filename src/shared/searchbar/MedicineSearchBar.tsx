import { IoIosSearch } from 'react-icons/io';

const MedicineSearchBar = () => {
  return (
    <div>
      <div className='relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden'>
        <div className='grid place-items-center h-full w-12 text-gray-300'>
          <IoIosSearch />
        </div>

        <input
          className='peer h-full w-full outline-none text-sm text-gray-700 pr-2'
          type='text'
          id='search'
          placeholder='Search medicine..'
        />
      </div>
    </div>
  );
};

export default MedicineSearchBar;
