import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useItemUpdateService from '../services/ItemUpdateService';
import useItemService from '../services/ItemDetailsCRUDService';
import LoadingSpinner from '../../../shared/loader/LoadingSpinner';
import { IoCloseOutline } from 'react-icons/io5';

function ViewItem() {
  const { itemId } = useParams();
  const { fetchItemById, itemDetails, updating } = useItemUpdateService();
  const { itemString, fetchItemImage, fetchItemString } = useItemService();

  useEffect(() => {
    if (itemId) {
      fetchItemById(parseInt(itemId));
      fetchItemImage(itemId);
    }
  }, [itemId]);

  if (updating) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white p-6 font-poppins'>
      <div className='max-w-7xl mx-auto pb-8'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-white mb-2'>View Item Details</h1>
              <p className='text-blue-100'>Item ID: {itemId}</p>
            </div>
            <Link to='/manager-dashboard/Items'>
              <button className='bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2'>
                <IoCloseOutline size={20} />
                Close
              </button>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Product Image Card */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl shadow-md p-6 sticky top-8'>
              <div className='flex flex-col items-center'>
                <div className='w-full aspect-square overflow-hidden rounded-lg border-2 border-gray-200 mb-4'>
                  <img
                    src={itemString || 'https://via.placeholder.com/300'}
                    alt={itemDetails.itemName || 'Item'}
                    className='w-full h-full object-cover'
                  />
                </div>
                <h2 className='text-xl font-bold text-gray-800 text-center mb-2'>
                  {itemDetails.itemName}
                </h2>
                <p className='text-sm text-gray-500 text-center mb-3'>
                  {itemDetails.itemDescription}
                </p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  itemDetails.stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {itemDetails.stock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          {/* Details Cards */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Basic Information Card */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 pb-2 border-b'>
                Basic Information
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Item Name</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.itemName}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Bar Code</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.itemBarCode}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Manufacturer</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.itemManufacture}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Category</label>
                  <p className='text-sm text-gray-900 font-medium'>
                    {itemDetails.categoryName || itemDetails.itemCategoryDTO?.categoryName || 'N/A'}
                  </p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Supplier</label>
                  <p className='text-sm text-gray-900 font-medium'>
                    {itemDetails.supplierName || itemDetails.supplierDTO?.supplierName || 'N/A'}
                  </p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Measuring Unit</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.measuringUnitType}</p>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory Card */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 pb-2 border-b'>
                Pricing & Inventory
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Selling Price</label>
                  <p className='text-sm text-gray-900 font-medium'>${itemDetails.sellingPrice?.toFixed(2)}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Supplier Price</label>
                  <p className='text-sm text-gray-900 font-medium'>${itemDetails.supplierPrice?.toFixed(2)}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Quantity</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.itemQuantity}</p>
                </div>
                {itemDetails.discountedPrice && (
                  <>
                    <div className='space-y-1'>
                      <label className='text-xs font-medium text-gray-500'>Discounted Price</label>
                      <p className='text-sm text-gray-900 font-medium'>${itemDetails.discountedPrice?.toFixed(2)}</p>
                    </div>
                    <div className='space-y-1'>
                      <label className='text-xs font-medium text-gray-500'>Discount %</label>
                      <p className='text-sm text-gray-900 font-medium'>{itemDetails.discountedPercentage}%</p>
                    </div>
                  </>
                )}
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Rack Number</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.rackNumber}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Warehouse</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.warehouseName}</p>
                </div>
              </div>
            </div>

            {/* Dates & Timeline Card */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 pb-2 border-b'>
                Dates & Timeline
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Manufacture Date</label>
                  <p className='text-sm text-gray-900 font-medium'>
                    {itemDetails.manufactureDate ? new Date(itemDetails.manufactureDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Expiry Date</label>
                  <p className='text-sm text-gray-900 font-medium'>
                    {itemDetails.expireDate ? new Date(itemDetails.expireDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Purchase Date</label>
                  <p className='text-sm text-gray-900 font-medium'>
                    {itemDetails.purchaseDate ? new Date(itemDetails.purchaseDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Supply Date</label>
                  <p className='text-sm text-gray-900 font-medium'>
                    {itemDetails.supplyDate ? new Date(itemDetails.supplyDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                {itemDetails.warrantyPeriod && (
                  <div className='space-y-1'>
                    <label className='text-xs font-medium text-gray-500'>Warranty Period</label>
                    <p className='text-sm text-gray-900 font-medium'>{itemDetails.warrantyPeriod}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status & Conditions Card */}
            <div className='bg-white rounded-xl shadow-md p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 pb-2 border-b'>
                Status & Conditions
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Stock Available</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.stock ? 'Yes' : 'No'}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Discounted</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.discounted ? 'Yes' : 'No'}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Free Issued</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.freeIssued ? 'Yes' : 'No'}</p>
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-medium text-gray-500'>Special Condition</label>
                  <p className='text-sm text-gray-900 font-medium'>{itemDetails.specialCondition ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center justify-center gap-4 mt-8'>
          <Link to='/manager-dashboard/Items'>
            <button
              type='button'
              className='px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors border border-gray-300'
            >
              Back to Items List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewItem;
