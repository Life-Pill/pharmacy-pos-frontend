import React, { useState } from 'react';
import { LiaStreetViewSolid } from 'react-icons/lia';
import { TbCirclePlus, TbSettingsCog } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Medicine from '../../../../assets/fakedata/medicine';

type Props = {};

function ItemsManagementWindow({}: Props) {
  const [filteredItems, setfilteredItems] = useState(Medicine);
  const handleSearch = (searchName: string) => {
    const filtered = Medicine.filter((medicine) =>
      medicine.name.includes(searchName)
    );
    setfilteredItems(filtered);
  };
  return (
    <div className='flex flex-col' data-testid='items-management-window'>
      {/* buttons */}
      <div className='flex flex-row items-center z-20 p-8 px-16 justify-around bg-slate-200 rounded-lg'>
        <Link
          to='/add-items'
          className=' bg-yellow-300 p-8 rounded-lg flex flex-row gap-2 items-center cursor-pointer'
        >
          <TbCirclePlus size={25} />
          <h1 className=' font-medium'>Add Items</h1>
        </Link>

        <Link
          to='/update-items'
          className=' bg-purple-300 p-8 rounded-lg flex flex-row gap-2 items-center cursor-pointer'
        >
          <TbSettingsCog size={25} />
          <h1 className='font-medium'>Update Items</h1>
        </Link>

        <Link
          to='/delete-items'
          className=' bg-green-300 p-8 rounded-lg flex flex-row gap-2 items-center cursor-pointer'
        >
          <LiaStreetViewSolid size={25} />
          <h1 className='font-medium'>Delete Items</h1>
        </Link>
      </div>

      {/* table */}
      <div className='flex items-center justify-between mt-4 p-2'>
        <p className='font-bold text-xl '>Cashier Details</p>
        <input
          type='text'
          placeholder='Search by name'
          className='px-4 py-2 border rounded-md outline-none'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className='overflow-y-auto max-h-[500px]'>
        <div className='relative'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Medicine ID
                </th>
                <th scope='col' className='px-6 py-3'>
                  Image
                </th>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Price
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((medicine) => (
                <tr className='bg-slate-50 border-b'>
                  <td className='px-6 py-4'>{medicine.id}</td>
                  <td className='px-6 py-4'>{medicine.image}</td>
                  <td className='px-6 py-4'>{medicine.name}</td>
                  <td className='px-6 py-4'>{medicine.price}</td>
                  <td className='px-6 py-4'>
                    {
                      <div
                        className={`rounded-full p-1 w-24 flex items-center justify-center ${
                          medicine.status === 'In Stock'
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      >
                        <span
                          className={`${
                            medicine.status === 'In Stock'
                              ? 'text-white'
                              : 'text-black'
                          }`}
                        >
                          {medicine.status}
                        </span>
                      </div>
                    }
                  </td>
                  <td className='px-6 py-4'>
                    {
                      <div
                        className={`rounded-full p-1 w-24 flex items-center justify-center ${
                          medicine.quantity > 0
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      >
                        <span
                          className={`${
                            medicine.quantity > 0 ? 'text-white' : 'text-black'
                          }`}
                        >
                          {medicine.quantity}
                        </span>
                      </div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ItemsManagementWindow;
