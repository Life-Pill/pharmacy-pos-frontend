import { ChangeEvent, useState, useEffect } from 'react';
import { IoCloudUploadOutline, IoCloseOutline } from 'react-icons/io5';
import { useNavigate, Link, useParams } from 'react-router-dom';
import useItemUpdateService from '../services/ItemUpdateService';
import useItemService from '../services/ItemDetailsCRUDService';
import LoadingSpinner from '../../../shared/loader/LoadingSpinner';

const UpdateItems = () => {
  const { itemId } = useParams();
  const {
    itemString,
    fetchItemImage,
    fetchItemString,
    itemImage,
    setItemImage,
    updatingItemImage,
    updateItemImage,
  } = useItemService();

  const [updateImage, setUpdateImage] = useState<boolean>(false);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setItemImage(file);
          setUpdateImage(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { fetchItemById, item, setItem, updateItem, updating } =
    useItemUpdateService();

  const handleConfirm = () => {
    // console.log('confirm', item);
    updateItem(item);
    // navigate('/');
  };

  useEffect(() => {
    if (itemId) {
      fetchItemById(parseInt(itemId));
      fetchItemImage(itemId);
    }
  }, [itemId]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-poppins'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-white mb-2'>Update Item</h1>
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

        {/* Main Form Card */}
        <div className='bg-white rounded-xl shadow-md p-8'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* Product Image Column */}
            <div className='lg:col-span-1 flex flex-col items-center gap-4'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Product Image</h3>
                <div className='flex items-center justify-center mb-4'>
                  {fetchItemString ? (
                    <div className='w-40 h-40 rounded-lg bg-gray-100 flex items-center justify-center'>
                      <LoadingSpinner />
                    </div>
                  ) : updateImage ? (
                    <img
                      src={itemImage?.path || 'https://via.placeholder.com/150'}
                      alt='Preview'
                      className='w-40 h-40 rounded-lg object-cover shadow-md'
                    />
                  ) : (
                    <img
                      src={itemString || 'https://via.placeholder.com/150'}
                      alt='Preview'
                      className='w-40 h-40 rounded-lg object-cover shadow-md'
                    />
                  )}
                </div>
                <label className='w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 p-3 rounded-lg cursor-pointer transition-colors border border-blue-200'>
                  <IoCloudUploadOutline size={20} />
                  <span className='text-sm font-medium'>Select Image</span>
                  <input
                    type='file'
                    className='hidden'
                    onChange={handleImageChange}
                    accept='image/*'
                  />
                </label>
                <button
                  type='button'
                  className='w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  onClick={() => updateItemImage(itemId as string)}
                  disabled={updatingItemImage}
                >
                  {updatingItemImage ? 'Updating Image...' : 'Update Image'}
                </button>
              </div>
            </div>

            {/* Form Fields - Three Columns */}
            <div className='lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* First Column - Basic Information */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>Basic Information</h3>
                
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                    Item Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.itemName}
                    onChange={(e) => setItem({ ...item, itemName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor='itemCategory' className='block text-sm font-medium text-gray-700 mb-1'>
                    Category <span className='text-red-500'>*</span>
                  </label>
                  <select
                    id='itemCategory'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.categoryId}
                    onChange={(e) => setItem({ ...item, categoryId: parseInt(e.target.value) })}
                  >
                    <option value='1'>Medicine</option>
                    <option value='2'>Nutritions</option>
                    <option value='3'>Sports</option>
                    <option value='4'>Equipment</option>
                    <option value='5'>First Aid</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='itemManufacturer' className='block text-sm font-medium text-gray-700 mb-1'>
                    Manufacturer
                  </label>
                  <input
                    type='text'
                    id='itemManufacturer'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.itemManufacture}
                    onChange={(e) => setItem({ ...item, itemManufacture: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor='itemQuantity' className='block text-sm font-medium text-gray-700 mb-1'>
                    Quantity <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    id='itemQuantity'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.itemQuantity}
                    onChange={(e) => setItem({ ...item, itemQuantity: parseFloat(e.target.value) })}
                  />
                </div>

                <div>
                  <label htmlFor='measuringUnitType' className='block text-sm font-medium text-gray-700 mb-1'>
                    Measuring Unit <span className='text-red-500'>*</span>
                  </label>
                  <select
                    id='measuringUnitType'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.measuringUnitType}
                    onChange={(e) => setItem({ ...item, measuringUnitType: e.target.value })}
                  >
                    <option value='KG'>Kilogram (KG)</option>
                    <option value='G'>Gram (G)</option>
                    <option value='MG'>Milligram (MG)</option>
                    <option value='L'>Liter (L)</option>
                    <option value='ML'>Milliliter (ML)</option>
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
              </div>

              {/* Second Column - Pricing & Dates */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>Pricing & Dates</h3>
                
                <div>
                  <label htmlFor='sellingPrice' className='block text-sm font-medium text-gray-700 mb-1'>
                    Selling Price <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    id='sellingPrice'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.sellingPrice}
                    onChange={(e) => setItem({ ...item, sellingPrice: parseFloat(e.target.value) })}
                  />
                </div>

                <div>
                  <label htmlFor='supplierPrice' className='block text-sm font-medium text-gray-700 mb-1'>
                    Supplier Price <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    id='supplierPrice'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.supplierPrice}
                    onChange={(e) => setItem({ ...item, supplierPrice: parseFloat(e.target.value) })}
                  />
                </div>

                <div>
                  <label htmlFor='discountedPercentage' className='block text-sm font-medium text-gray-700 mb-1'>
                    Discount (%)
                  </label>
                  <input
                    type='number'
                    id='discountedPercentage'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.discountedPercentage}
                    onChange={(e) => setItem({ ...item, discountedPercentage: parseFloat(e.target.value) })}
                  />
                </div>

                <div>
                  <label htmlFor='manufactureDate' className='block text-sm font-medium text-gray-700 mb-1'>
                    Manufacture Date
                  </label>
                  <input
                    type='date'
                    id='manufactureDate'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.manufactureDate?.slice(0, 10)}
                    onChange={(e) => setItem({ ...item, manufactureDate: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor='expireDate' className='block text-sm font-medium text-gray-700 mb-1'>
                    Expiry Date
                  </label>
                  <input
                    type='date'
                    id='expireDate'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.expireDate?.slice(0, 10)}
                    onChange={(e) => setItem({ ...item, expireDate: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor='purchaseDate' className='block text-sm font-medium text-gray-700 mb-1'>
                    Purchase Date
                  </label>
                  <input
                    type='date'
                    id='purchaseDate'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.purchaseDate?.slice(0, 10)}
                    onChange={(e) => setItem({ ...item, purchaseDate: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor='supplyDate' className='block text-sm font-medium text-gray-700 mb-1'>
                    Supply Date
                  </label>
                  <input
                    type='date'
                    id='supplyDate'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.supplyDate?.slice(0, 10)}
                    onChange={(e) => setItem({ ...item, supplyDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Third Column - Storage & Details */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>Storage & Details</h3>
                
                <div>
                  <label htmlFor='rackNumber' className='block text-sm font-medium text-gray-700 mb-1'>
                    Rack Number
                  </label>
                  <input
                    type='text'
                    id='rackNumber'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.rackNumber}
                    onChange={(e) => setItem({ ...item, rackNumber: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor='warehouseName' className='block text-sm font-medium text-gray-700 mb-1'>
                    Warehouse
                  </label>
                  <input
                    type='text'
                    id='warehouseName'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.warehouseName}
                    onChange={(e) => setItem({ ...item, warehouseName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor='warrantyPeriod' className='block text-sm font-medium text-gray-700 mb-1'>
                    Warranty Period
                  </label>
                  <input
                    type='text'
                    id='warrantyPeriod'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.warrantyPeriod}
                    onChange={(e) => setItem({ ...item, warrantyPeriod: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor='specialCondition' className='block text-sm font-medium text-gray-700 mb-1'>
                    Special Condition
                  </label>
                  <select
                    id='specialCondition'
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={item.specialCondition ? 'true' : 'false'}
                    onChange={(e) => setItem({ ...item, specialCondition: e.target.value === 'true' })}
                  >
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='itemDescription' className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                  </label>
                  <textarea
                    id='itemDescription'
                    rows={4}
                    className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                    value={item.itemDescription}
                    onChange={(e) => setItem({ ...item, itemDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-200'>
            <button
              type='button'
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={handleConfirm}
              disabled={updating}
            >
              {updating ? (
                <span className='flex items-center gap-2'>
                  <LoadingSpinner />
                  Updating...
                </span>
              ) : (
                'Update Item'
              )}
            </button>
            <Link to='/manager-dashboard/Items'>
              <button
                type='button'
                className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors'
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItems;
