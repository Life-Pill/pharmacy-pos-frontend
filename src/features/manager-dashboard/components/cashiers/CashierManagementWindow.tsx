import React, { useState } from 'react';
import { TbCirclePlus } from 'react-icons/tb';
import { TbSettingsCog } from 'react-icons/tb';
import { LiaStreetViewSolid } from 'react-icons/lia';
import PharmacyCashiers from '../../../../assets/fakedata/cashiers';
import { Link } from 'react-router-dom';

type Props = {};

function CashierManagementWindow({}: Props) {
  const [filteredCashiers, setFilteredCashiers] = useState(PharmacyCashiers);
  const handleSearch = (searchPhoneNumber: string) => {
    const filtered = PharmacyCashiers.filter((cashier) =>
      cashier.phoneNumber.includes(searchPhoneNumber)
    );
    setFilteredCashiers(filtered);
  };

  return (
    <div className='flex flex-col' data-testid='cashier-management-window'>
      {/* buttons */}
      <div className='flex flex-row items-center z-20 p-8 px-16 justify-around bg-slate-200 rounded-lg'>
        <Link
          to='/add-cashier'
          className=' bg-yellow-300 p-8 rounded-lg flex flex-row gap-2 items-center cursor-pointer'
        >
          <TbCirclePlus size={25} />
          <h1 className=' font-medium'>Add cashier</h1>
        </Link>

        <Link
          to='/update-cashier'
          className=' bg-purple-300 p-8 rounded-lg flex flex-row gap-2 items-center cursor-pointer'
        >
          <TbSettingsCog size={25} />
          <h1 className='font-medium'>Manage cashier</h1>
        </Link>

        <Link
          to='/view-cashier'
          className=' bg-green-300 p-8 rounded-lg flex flex-row gap-2 items-center cursor-pointer'
        >
          <LiaStreetViewSolid size={25} />
          <h1 className='font-medium'>View cashier</h1>
        </Link>
      </div>

      {/* table */}
      <div className='flex items-center justify-between mt-4 p-2'>
        <p className='font-bold text-xl '>Cashier Details</p>
        <input
          type='text'
          placeholder='Search by phone number'
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
                  Cashier ID
                </th>
                <th scope='col' className='px-6 py-3'>
                  Phone No.
                </th>
                <th scope='col' className='px-6 py-3'>
                  Gender
                </th>
                <th scope='col' className='px-6 py-3'>
                  Active Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Branch Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Monthly Payment Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Monthly Payment Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCashiers.map((cashier) => (
                <tr className='bg-slate-50 border-b'>
                  <td className='px-6 py-4'>{cashier.cashierId}</td>
                  <td className='px-6 py-4'>{cashier.phoneNumber}</td>
                  <td className='px-6 py-4'>{cashier.gender}</td>
                  <td className='px-6 py-4'>{cashier.branchName}</td>
                  <td className='px-6 py-4'>
                    {
                      <div
                        className={`rounded-full p-1 w-24 flex items-center justify-center ${
                          cashier.activeStatus
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      >
                        <span
                          className={`${
                            cashier.activeStatus ? 'text-white' : 'text-black'
                          }`}
                        >
                          {cashier.activeStatus ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    }
                  </td>
                  <td className='px-6 py-4'>
                    {
                      <div
                        className={`rounded-full p-1 w-24 flex items-center justify-center ${
                          cashier.monthlySalaryPaid ? 'bg-green-500' : 'bg-red'
                        }`}
                      >
                        <span
                          className={`${
                            cashier.monthlySalaryPaid
                              ? 'text-white'
                              : 'text-black'
                          }`}
                        >
                          {cashier.monthlySalaryPaid ? 'Paid' : 'Not Paid'}
                        </span>
                      </div>
                    }
                  </td>
                  <td className='px-6 py-4'>{cashier.monthlyPaymentAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CashierManagementWindow;
