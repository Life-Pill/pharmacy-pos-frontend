import React, { ChangeEvent, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type Props = {};

function CashierDetails({}: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='w-full p-16 px-4 sm:px-6 lg:px-8'>
      <p className='text-2xl font-bold text-center mb-4'>
        Creating A New Cashier
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center'>
        <div className='flex items-center justify-center gap-4 flex-col'>
          {previewImage ? (
            <div className='mt-4'>
              <img
                src={previewImage}
                alt='Preview'
                className='w-64 h-64 rounded-full'
              />
            </div>
          ) : (
            <div className='mt-4'>
              <img
                src='https://randomuser.me/api/portraits/men/1.jpg'
                alt='Preview'
                className='w-64 h-64 rounded-full'
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
            htmlFor='nickname'
            className='block text-sm font-medium text-black mt-4'
          >
            Nickname
          </label>
          <input
            type='text'
            id='nickname'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='nicNumber'
            className='block text-sm font-medium text-black mt-4'
          >
            NIC Number
          </label>
          <input
            type='text'
            id='nicNumber'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='telephone'
            className='block text-sm font-medium text-black mt-4'
          >
            Telephone Number
          </label>
          <input
            type='tel'
            id='telephone'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='email'
            className='block text-sm font-medium text-black mt-4'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='firstName'
            className='block text-sm font-medium text-black mt-4'
          >
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='lastName'
            className='block text-sm font-medium text-black mt-4'
          >
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />
        </div>

        {/* Second Column */}
        <div>
          <label
            htmlFor='gender'
            className='block text-sm font-medium text-black'
          >
            Gender
          </label>
          <select id='gender' className='mt-1 p-2 border-gray rounded-md w-64'>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>

          <label
            htmlFor='addressLine1'
            className='block text-sm font-medium text-black mt-4'
          >
            Address Line 1
          </label>
          <input
            type='text'
            id='addressLine1'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='addressLine2'
            className='block text-sm font-medium text-black mt-4'
          >
            Address Line 2
          </label>
          <input
            type='text'
            id='addressLine2'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='city'
            className='block text-sm font-medium text-black mt-4'
          >
            City
          </label>
          <input
            type='text'
            id='city'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='province'
            className='block text-sm font-medium text-black mt-4'
          >
            Province
          </label>
          <input
            type='text'
            id='province'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />

          <label
            htmlFor='dateOfBirth'
            className='block text-sm font-medium text-black mt-4'
          >
            Date of Birth
          </label>
          <input
            type='date'
            id='dateOfBirth'
            className='mt-1 p-2 border-gray rounded-md w-64'
          />
        </div>
      </div>
      <div className='flex items-center justify-center gap-8 w-full mt-8'>
        <button
          type='button'
          className='text-white bg-blueDarker hover:bg-blue font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
        >
          <Link to='/'>Create & Continue</Link>
        </button>
        <button
          type='button'
          className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
        >
          <Link to='/'>Back To Cashier Manager</Link>
        </button>
      </div>
    </div>
  );
}

export default CashierDetails;
