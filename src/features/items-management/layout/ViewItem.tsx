import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useItemUpdateService from '../services/ItemUpdateService';
import CashierManagerNavBar from '../../cashier-management/components/navbar/CashierManagerNavBar';

function ViewItem() {
  const { itemId } = useParams();
  const { fetchItemById, itemDetails } = useItemUpdateService();

  useEffect(() => {
    if (itemId) {
      fetchItemById(parseInt(itemId));
    }
  }, []);

  return (
    <div className='bg-indigo-100 h-screen font-poppins'>
      <CashierManagerNavBar topic='View Item' />
      <div className='w-full p-16 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Item Details
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-center justify-center'>
          {/* Image Column */}
          <div className='flex flex-col items-center'>
            <img
              src={itemDetails.itemImage || 'https://via.placeholder.com/150'}
              alt={itemDetails.itemName || 'Placeholder Image'}
              className='w-40 h-40 object-cover rounded-md shadow-md mb-4'
            />
          </div>

          {/* First Column */}
          <div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Name:</strong>
              <p className='text-gray-800'>{itemDetails.itemName}</p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Bar Code:</strong>
              <p className='text-gray-800'>{itemDetails.itemBarCode}</p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Price:</strong>
              <p className='text-gray-800'>
                ${itemDetails.sellingPrice?.toFixed(2)}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Supplier Price:</strong>
              <p className='text-gray-800'>
                ${itemDetails.supplierPrice?.toFixed(2)}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Quantity:</strong>
              <p className='text-gray-800'>
                {itemDetails.itemQuantity} {itemDetails.measuringUnitType}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Rack Number:</strong>
              <p className='text-gray-800'>{itemDetails.rackNumber}</p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Warehouse:</strong>
              <p className='text-gray-800'>{itemDetails.warehouseName}</p>
            </div>
          </div>

          {/* Second Column */}
          <div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Manufacturer:</strong>
              <p className='text-gray-800'>{itemDetails.itemManufacture}</p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Manufacture Date:</strong>
              <p className='text-gray-800'>
                {new Date(itemDetails.manufactureDate).toLocaleDateString()}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Expiry Date:</strong>
              <p className='text-gray-800'>
                {new Date(itemDetails.expireDate).toLocaleDateString()}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Purchase Date:</strong>
              <p className='text-gray-800'>
                {new Date(itemDetails.purchaseDate).toLocaleDateString()}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Supply Date:</strong>
              <p className='text-gray-800'>
                {new Date(itemDetails.supplyDate).toLocaleDateString()}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Warranty Period:</strong>
              <p className='text-gray-800'>{itemDetails.warrantyPeriod}</p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Discounted Price:</strong>
              <p className='text-gray-800'>
                ${itemDetails.discountedPrice?.toFixed(2)}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>
                Discount Percentage:
              </strong>
              <p className='text-gray-800'>
                {itemDetails.discountedPercentage}%
              </p>
            </div>
          </div>

          {/* Third Column */}
          <div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>
                Special Condition:
              </strong>
              <p className='text-gray-800'>
                {itemDetails.specialCondition ? 'Yes' : 'No'}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Discounted:</strong>
              <p className='text-gray-800'>
                {itemDetails.discounted ? 'Yes' : 'No'}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Stock Available:</strong>
              <p className='text-gray-800'>
                {itemDetails.stock ? 'Yes' : 'No'}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Free Issued:</strong>
              <p className='text-gray-800'>
                {itemDetails.freeIssued ? 'Yes' : 'No'}
              </p>
            </div>
            <div className='mb-4'>
              <strong className='block text-gray-700'>Category:</strong>
              <p className='text-gray-800'>
                {itemDetails.itemCategoryDTO?.categoryName}
              </p>
              <p className='text-gray-600'>
                {itemDetails.itemCategoryDTO?.categoryDescription}
              </p>
            </div>
            {itemDetails.supplierDTO && (
              <div className='mb-4'>
                <strong className='block text-gray-700'>Supplier:</strong>
                <p className='text-gray-800'>
                  {itemDetails.supplierDTO?.supplierName}
                </p>
                <p className='text-gray-600'>
                  {itemDetails.supplierDTO?.supplierDescription}
                </p>
              </div>
            )}
            {itemDetails.supplierCompanyDTO && (
              <div className='mb-4'>
                <strong className='block text-gray-700'>
                  Supplier Company:
                </strong>
                <p className='text-gray-800'>
                  {itemDetails.supplierCompanyDTO?.companyName}
                </p>
                <p className='text-gray-600'>
                  {itemDetails.supplierCompanyDTO?.companyDescription}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center justify-center gap-8 w-full mt-8'>
          <button
            type='button'
            className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
          >
            <Link to='/manager-dashboard/Items'>Back To Item Manager</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewItem;
