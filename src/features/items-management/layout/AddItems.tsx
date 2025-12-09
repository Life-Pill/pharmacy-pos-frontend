import { ChangeEvent, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useItemService from '../services/ItemDetailsCRUDService';
import LoadingSpinner from '../../../shared/loader/LoadingSpinner';

const AddItems = () => {
  const { item, setItem, preSet, creating, itemImage, setItemImage } =
    useItemService();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      setItemImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // Create preview if needed
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    preSet();
  };

  const handleSpecialConditionChange = (e: any) => {
    const value = e.target.value === 'true';
    setItem((prevItem) => ({
      ...prevItem,
      specialCondition: value,
    }));
  };

  const handleMeasuringUnitChange = (e: any) => {
    setItem({
      ...item,
      measuringUnitType: e.target.value,
    });
  };

  const handleCategoryChange = (e: any) => {
    setItem({
      ...item,
      categoryId: parseInt(e.target.value),
    });
  };

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      {/* Header */}
      <div className='flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-6 shadow-lg'>
        <h1 className='text-3xl font-bold'>Add New Item</h1>
        <p className='text-blue-100 text-sm mt-2'>Create a new inventory item</p>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-y-auto p-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-white rounded-xl shadow-md p-8'>
            {/* Product Image Section */}
            <div className='flex flex-col items-center mb-8 pb-8 border-b border-gray-200'>
              <div className='relative'>
                {itemImage ? (
                  <img
                    src={URL.createObjectURL(itemImage)}
                    alt='Product Preview'
                    className='w-40 h-40 rounded-lg object-cover border-4 border-blue-200 shadow-md'
                  />
                ) : (
                  <div className='w-40 h-40 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-4 border-blue-200 shadow-md'>
                    <svg className='w-20 h-20 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                    </svg>
                  </div>
                )}
              </div>
              <label className='mt-4 flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors shadow-md'>
                <IoCloudUploadOutline size={20} />
                <span className='font-medium'>Upload Product Image</span>
                <input
                  type='file'
                  className='hidden'
                  onChange={handleImageChange}
                  accept='image/*'
                />
              </label>
              <p className='text-xs text-gray-500 mt-2'>PNG, JPG up to 5MB</p>
            </div>

            {/* Form Fields - 3 Column Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Column 1: Basic Information */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200'>
                  Basic Information
                </h3>
                
                {/* Item Name */}
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                    Item Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='name'
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='Enter item name'
                    onChange={(e) => setItem({ ...item, itemName: e.target.value })}
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor='itemCategory' className='block text-sm font-medium text-gray-700 mb-2'>
                    Category <span className='text-red-500'>*</span>
                  </label>
                  <select
                    id='itemCategory'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    value={item.categoryId}
                    onChange={handleCategoryChange}
                  >
                    <option value='1'>Medicine</option>
                    <option value='2'>Nutritions</option>
                    <option value='3'>Sports</option>
                    <option value='4'>Equipment</option>
                    <option value='5'>First Aid</option>
                  </select>
                </div>

                {/* Manufacturer */}
                <div>
                  <label htmlFor='itemManufacturer' className='block text-sm font-medium text-gray-700 mb-2'>
                    Manufacturer <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='itemManufacturer'
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='Enter manufacturer'
                    onChange={(e) => setItem({ ...item, itemManufacture: e.target.value })}
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor='itemQuantity' className='block text-sm font-medium text-gray-700 mb-2'>
                    Quantity <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    id='itemQuantity'
                    required
                    min='0'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='0'
                    onChange={(e) => setItem({ ...item, itemQuantity: parseInt(e.target.value) || 0 })}
                  />
                </div>

                {/* Measuring Unit */}
                <div>
                  <label htmlFor='measuringUnitType' className='block text-sm font-medium text-gray-700 mb-2'>
                    Unit Type <span className='text-red-500'>*</span>
                  </label>
                  <select
                    id='measuringUnitType'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    value={item.measuringUnitType}
                    onChange={handleMeasuringUnitChange}
                  >
                    <option value='PIECE'>Piece</option>
                    <option value='PIECES'>Pieces</option>
                    <option value='TABLET'>Tablet</option>
                    <option value='TABLETS'>Tablets</option>
                    <option value='CAPSULE'>Capsule</option>
                    <option value='CAPSULES'>Capsules</option>
                    <option value='BOTTLE'>Bottle</option>
                    <option value='BOTTLES'>Bottles</option>
                    <option value='BOX'>Box</option>
                    <option value='BOXES'>Boxes</option>
                    <option value='STRIP'>Strip</option>
                    <option value='STRIPS'>Strips</option>
                    <option value='PACK'>Pack</option>
                    <option value='PACKS'>Packs</option>
                    <option value='KG'>Kilogram (KG)</option>
                    <option value='G'>Gram (G)</option>
                    <option value='MG'>Milligram (MG)</option>
                    <option value='L'>Liter (L)</option>
                    <option value='ML'>Milliliter (ML)</option>
                    <option value='VIAL'>Vial</option>
                    <option value='VIALS'>Vials</option>
                    <option value='AMPOULE'>Ampoule</option>
                    <option value='AMPOULES'>Ampoules</option>
                    <option value='TUBE'>Tube</option>
                    <option value='TUBES'>Tubes</option>
                    <option value='SACHET'>Sachet</option>
                    <option value='SACHETS'>Sachets</option>
                    <option value='UNIT'>Unit</option>
                    <option value='UNITS'>Units</option>
                    <option value='OTHER'>Other</option>
                  </select>
                </div>

                {/* Item Description */}
                <div>
                  <label htmlFor='itemDescription' className='block text-sm font-medium text-gray-700 mb-2'>
                    Description
                  </label>
                  <textarea
                    id='itemDescription'
                    rows={3}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none'
                    placeholder='Enter item description'
                    onChange={(e) => setItem({ ...item, itemDescription: e.target.value })}
                  />
                </div>
              </div>

              {/* Column 2: Pricing & Dates */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200'>
                  Pricing & Dates
                </h3>

                {/* Selling Price */}
                <div>
                  <label htmlFor='sellingPrice' className='block text-sm font-medium text-gray-700 mb-2'>
                    Selling Price (LKR) <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    id='sellingPrice'
                    required
                    min='0'
                    step='0.01'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='0.00'
                    onChange={(e) => setItem({ ...item, sellingPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                {/* Supplier Price */}
                <div>
                  <label htmlFor='supplierPrice' className='block text-sm font-medium text-gray-700 mb-2'>
                    Supplier Price (LKR) <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    id='supplierPrice'
                    required
                    min='0'
                    step='0.01'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='0.00'
                    onChange={(e) => setItem({ ...item, supplierPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                {/* Discount Percentage */}
                <div>
                  <label htmlFor='discountedPercentage' className='block text-sm font-medium text-gray-700 mb-2'>
                    Discount %
                  </label>
                  <input
                    type='number'
                    id='discountedPercentage'
                    min='0'
                    max='100'
                    step='0.1'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='0'
                    onChange={(e) => setItem({ ...item, discountedPercentage: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                {/* Manufacture Date */}
                <div>
                  <label htmlFor='manufactureDate' className='block text-sm font-medium text-gray-700 mb-2'>
                    Manufacture Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    id='manufactureDate'
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    onChange={(e) => setItem({ ...item, manufactureDate: e.target.value })}
                  />
                </div>

                {/* Expire Date */}
                <div>
                  <label htmlFor='expireDate' className='block text-sm font-medium text-gray-700 mb-2'>
                    Expiry Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    id='expireDate'
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    onChange={(e) => setItem({ ...item, expireDate: e.target.value })}
                  />
                </div>

                {/* Purchase Date */}
                <div>
                  <label htmlFor='purchaseDate' className='block text-sm font-medium text-gray-700 mb-2'>
                    Purchase Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    id='purchaseDate'
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    onChange={(e) => setItem({ ...item, purchaseDate: e.target.value })}
                  />
                </div>

                {/* Supply Date */}
                <div>
                  <label htmlFor='supplyDate' className='block text-sm font-medium text-gray-700 mb-2'>
                    Supply Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    id='supplyDate'
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    onChange={(e) => setItem({ ...item, supplyDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Column 3: Storage & Other Details */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200'>
                  Storage & Details
                </h3>

                {/* Rack Number */}
                <div>
                  <label htmlFor='rackNumber' className='block text-sm font-medium text-gray-700 mb-2'>
                    Rack Number <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='rackNumber'
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='A-01'
                    onChange={(e) => setItem({ ...item, rackNumber: e.target.value })}
                  />
                </div>

                {/* Warehouse Name */}
                <div>
                  <label htmlFor='warehouseName' className='block text-sm font-medium text-gray-700 mb-2'>
                    Warehouse Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='warehouseName'
                    required
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='Main Warehouse'
                    onChange={(e) => setItem({ ...item, warehouseName: e.target.value })}
                  />
                </div>

                {/* Warranty Period */}
                <div>
                  <label htmlFor='warrantyPeriod' className='block text-sm font-medium text-gray-700 mb-2'>
                    Warranty Period (months)
                  </label>
                  <input
                    type='text'
                    id='warrantyPeriod'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='12'
                    onChange={(e) => setItem({ ...item, warrantyPeriod: e.target.value })}
                  />
                </div>

                {/* Special Condition */}
                <div>
                  <label htmlFor='specialCondition' className='block text-sm font-medium text-gray-700 mb-2'>
                    Special Condition
                  </label>
                  <select
                    id='specialCondition'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    onChange={handleSpecialConditionChange}
                  >
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200'>
              <Link to='/manager-dashboard/Items'>
                <button
                  type='button'
                  className='px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors'
                >
                  Cancel
                </button>
              </Link>
              <button
                type='button'
                onClick={handleConfirm}
                disabled={creating}
                className={`px-8 py-2.5 rounded-lg font-medium transition-all shadow-md ${
                  creating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}
              >
                {creating ? (
                  <span className='flex items-center gap-2'>
                    <LoadingSpinner size='sm' />
                    Creating...
                  </span>
                ) : (
                  'Create Item'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
