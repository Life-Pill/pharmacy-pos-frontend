import { useCallback, useEffect, useState } from 'react';
import { LiaStreetViewSolid } from 'react-icons/lia';
import { TbCirclePlus, TbSettingsCog } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import Medicine from '../../../../assets/fakedata/medicine';
import useItemService from '../../../items-management/services/ItemDetailsCRUDService';
import { BsPencilSquare, BsEye, BsTrash } from 'react-icons/bs';
import useItemUpdateService from '../../../items-management/services/ItemUpdateService';
import { BsBoxSeam, BsBoxes, BsExclamationTriangle } from 'react-icons/bs';

const ItemsManagementWindow = () => {
  const { fetchAllItems, items, filteredItems, setFilteredItems, deleteItem } =
    useItemService();

  const handleSearch = (searchName: string) => {
    const filtered = items.filter((medicine) =>
      medicine.itemName.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  useEffect(() => {
    fetchAllItems();
  }, []);

  const navigate = useNavigate();

  // Calculate summary information
  const totalItems = items.length;
  const inStockItems = items.reduce(
    (acc, item) => acc + (item.itemQuantity > 0 ? 1 : 0),
    0
  );
  const outOfStockItems = items.reduce(
    (acc, item) => acc + (item.itemQuantity === 0 ? 1 : 0),
    0
  );
  const averagePrice = (
    items.reduce((acc, item) => acc + item.sellingPrice, 0) / totalItems
  ).toFixed(2);

  return (
    <div className='flex flex-col' data-testid='items-management-window'>
      {/* buttons */}

      {/* Summary Cards */}
      <div className='flex flex-row items-center z-20 p-8 px-16 justify-around bg-slate-200 rounded-lg'>
        <div className='flex flex-row items-center z-20 p-2 px-16 justify-around bg-slate-200 rounded-lg space-x-12'>
          <div className='summary-card bg-yellow-300 p-8 rounded-lg flex flex-col items-center'>
            <BsBoxSeam size={25} />
            <h1 className='font-medium'>Total Items</h1>
            <h2 className='text-xl font-bold'>{totalItems}</h2>
          </div>
          <div className='summary-card bg-green-300 p-8 rounded-lg flex flex-col items-center'>
            <BsBoxes size={25} />
            <h1 className='font-medium'>In Stock</h1>
            <h2 className='text-xl font-bold'>{inStockItems}</h2>
          </div>
          <div className='summary-card bg-orange-500 p-8 rounded-lg flex flex-col items-center'>
            <BsExclamationTriangle size={25} />
            <h1 className='font-medium'>Out of Stock</h1>
            <h2 className='text-xl font-bold'>{outOfStockItems}</h2>
          </div>
          <div className='summary-card bg-purple-300 p-8 rounded-lg flex flex-col items-center'>
            <TbCirclePlus size={25} />
            <h1 className='font-medium'>Average Price</h1>
            <h2 className='text-xl font-bold'>${averagePrice}</h2>
          </div>
          <Link
            to='/add-items'
            className='summary-card bg-yellow-300 gap-2 cursor-pointer p-8 py-10 rounded-lg flex flex-col items-center'
          >
            <TbCirclePlus size={25} />
            <h1 className=' font-medium'>Add Items</h1>
          </Link>
        </div>
      </div>

      {/* table */}
      <div className='flex items-center justify-between mt-4 p-2'>
        <p className='font-bold text-xl '>Medicine Details</p>
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
                <th scope='col' className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((medicine) => (
                <tr className='bg-slate-50 border-b'>
                  <td className='px-6 py-4'>{medicine.itemId}</td>
                  <td className='px-6 py-4'>{medicine.itemImage}</td>
                  <td className='px-6 py-4'>{medicine.itemName}</td>
                  <td className='px-6 py-4'>{medicine.sellingPrice}</td>
                  <td className='px-6 py-4'>
                    {
                      <div
                        className={`rounded-full p-1 w-24 flex items-center justify-center ${
                          medicine.itemQuantity > 0
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      >
                        <span
                          className={`${
                            medicine.itemQuantity > 0
                              ? 'text-white'
                              : 'text-black'
                          }`}
                        >
                          {medicine.itemQuantity > 0
                            ? 'In stock'
                            : 'Out of stock'}
                        </span>
                      </div>
                    }
                  </td>
                  <td className='px-6 py-4'>
                    {
                      <div
                        className={`rounded-full p-1 w-24 flex items-center justify-center ${
                          medicine.itemQuantity > 0
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      >
                        <span
                          className={`${
                            medicine.itemQuantity > 0
                              ? 'text-white'
                              : 'text-black'
                          }`}
                        >
                          {medicine.itemQuantity}
                        </span>
                      </div>
                    }
                  </td>
                  <td className='px-6 py-4'>
                    {/* Update Button */}
                    <button
                      className='text-white font-bold py-2 px-4 rounded transition-transform hover:scale-110'
                      onClick={(e) => {
                        navigate(`/update-items/${medicine.itemId}`);
                      }}
                    >
                      <BsPencilSquare className='text-blueDarker font-bold text-lg' />
                    </button>
                    {/* View Button */}
                    <button
                      className='text-white font-bold py-2 px-4 rounded transition-transform hover:scale-110'
                      onClick={(e) => {
                        navigate(`/view-item/${medicine.itemId}`);
                      }}
                    >
                      <BsEye className='text-blueDarker font-bold text-lg' />
                    </button>

                    <button
                      className='text-white font-bold py-2 px-4 rounded transition-transform hover:scale-110'
                      onClick={(e) => {
                        deleteItem(medicine.itemId);
                      }}
                    >
                      <BsTrash className='text-red font-bold text-lg' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemsManagementWindow;
