import { ChangeEvent, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { IItemInterface } from '../../../interfaces/IItemInterface';
import CashierManagerNavBar from '../../cashier-management/components/navbar/CashierManagerNavBar';

const UpdateItems = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [item, setItem] = useState<IItemInterface>({} as IItemInterface);
  const navigate = useNavigate();
  const { itemId } = useParams();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
          setItem({
            ...item,
            itemImage: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <div className=' bg-indigo-100 h-screen font-poppins'>
      <CashierManagerNavBar topic='Add Items' />
      <div className='w-full p-16 px-4 sm:px-6 lg:px-8'>
        <p className='text-2xl font-bold text-center mb-4'>
          Creating A New Item
        </p>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-center justify-center'>
          <div className='flex items-center justify-center gap-4 flex-col'>
            {previewImage ? (
              <div className='mt-4'>
                <img
                  src={previewImage}
                  alt='Preview'
                  className='w-32 h-32 rounded-full'
                />
              </div>
            ) : (
              <div className='mt-4'>
                <img
                  src='https://randomuser.me/api/portraits/men/1.jpg'
                  alt='Preview'
                  className='w-32 h-32 rounded-full'
                />
              </div>
            )}
            <label className='w-64 flex flex-row items-center p-2 justify-center gap-2 bg-white rounded-lg'>
              <IoCloudUploadOutline size={25} />
              <span className='text-base leading-normal'>Select an image</span>
              <input
                type='file'
                className='hidden'
                onChange={handleImageChange}
              />
            </label>
          </div>
          {/* First Column */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-black mt-4'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  itemName: e.target.value,
                });
              }}
            />

            <label
              htmlFor='sellingPrice'
              className='block text-sm font-medium text-black mt-4'
            >
              Selling Price
            </label>
            <input
              type='text'
              id='sellingPrice'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  sellingPrice: parseFloat(e.target.value),
                });
              }}
            />

            <label
              htmlFor='supplyDate'
              className='block text-sm font-medium text-black mt-4'
            >
              Supply Date
            </label>
            <input
              type='date'
              id='supplyDate'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  supplyDate: new Date(e.target.value),
                });
              }}
            />

            <label
              htmlFor='supplierPrice'
              className='block text-sm font-medium text-black mt-4'
            >
              Supplier Price
            </label>
            <input
              type='text'
              id='supplierPrice'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  supplierPrice: parseFloat(e.target.value),
                });
              }}
            />

            <label
              htmlFor='itemManufacturer'
              className='block text-sm font-medium text-black mt-4'
            >
              Manufacturer
            </label>
            <input
              type='text'
              id='itemManufacturer'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  itemManufacture: e.target.value,
                });
              }}
            />

            <label
              htmlFor='itemQuantity'
              className='block text-sm font-medium text-black mt-4'
            >
              Quantity
            </label>
            <input
              type='number'
              id='itemQuantity'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  itemQuantity: parseFloat(e.target.value),
                });
              }}
            />
          </div>

          {/* Second Column */}
          <div>
            <label
              htmlFor='itemCategory'
              className='block text-sm font-medium text-black'
            >
              Category
            </label>
            <select
              id='itemCategory'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  itemCategory: e.target.value,
                });
              }}
            >
              <option value='medicine'>Medicine</option>
              <option value='nutritions'>Nutritions</option>
              <option value='sports'>Sports</option>
              <option value='equipment'>Equipment</option>
              <option value='firstAid'>First Aid</option>
            </select>

            <label
              htmlFor='measuringUnitType'
              className='block text-sm font-medium text-black mt-4'
            >
              Measuring Unit Type
            </label>
            <input
              type='text'
              id='measuringUnitType'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  measuringUnitType: e.target.value,
                });
              }}
            />

            <label
              htmlFor='manufactureDate'
              className='block text-sm font-medium text-black mt-4'
            >
              Manufacturer Date
            </label>
            <input
              type='date'
              id='manufactureDate'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  manufactureDate: new Date(e.target.value),
                });
              }}
            />

            <label
              htmlFor='expireDate'
              className='block text-sm font-medium text-black mt-4'
            >
              Expire Date
            </label>
            <input
              type='date'
              id='expireDate'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  expireDate: new Date(e.target.value),
                });
              }}
            />

            <label
              htmlFor='purchaseDate'
              className='block text-sm font-medium text-black mt-4'
            >
              Purchase Date
            </label>
            <input
              type='date'
              id='purchaseDate'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  purchaseDate: new Date(e.target.value),
                });
              }}
            />

            <label
              htmlFor='warrantyPeriod'
              className='block text-sm font-medium text-black mt-4'
            >
              Warranty Period
            </label>
            <input
              type='text'
              id='warrantyPeriod'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  warrantyPeriod: e.target.value,
                });
              }}
            />
          </div>
          {/* Third Column */}
          <div>
            <label
              htmlFor='rackNumber'
              className='block text-sm font-medium text-black'
            >
              Rack Number
            </label>
            <input
              type='text'
              id='rackNumber'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  rackNumber: e.target.value,
                });
              }}
            />

            <label
              htmlFor='discountedPercentage'
              className='block text-sm font-medium text-black mt-4'
            >
              Discounted Percentage
            </label>
            <input
              type='number'
              id='discountedPercentage'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  discountedPercentage: parseFloat(e.target.value),
                });
              }}
            />

            <label
              htmlFor='warehouseName'
              className='block text-sm font-medium text-black mt-4'
            >
              Warehouse Name
            </label>
            <input
              type='text'
              id='warehouseName'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {}}
            />

            <label
              htmlFor='itemDescription'
              className='block text-sm font-medium text-black mt-4'
            >
              Item Description
            </label>
            <input
              type='text'
              id='itemDescription'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  itemDescription: e.target.value,
                });
              }}
            />

            <label
              htmlFor='specialCondition'
              className='block text-sm font-medium text-black mt-4'
            >
              Special Condition
            </label>
            <select
              id='specialCondition'
              className='mt-1 p-2 border-gray rounded-md w-64'
              onChange={(e) => {
                setItem({
                  ...item,
                  specialCondition: e.target.value === 'true' ? true : false,
                });
              }}
            >
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
        </div>
        <div className='flex items-center justify-center gap-8 w-full mt-8'>
          <button
            type='button'
            className='text-white bg-blueDarker hover:bg-blue font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
            onClick={handleConfirm}
          >
            Create & Continue
          </button>
          <button
            type='button'
            className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
          >
            <Link to='/'>Back To Cashier Manager</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateItems;
