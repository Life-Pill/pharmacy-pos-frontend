import { ChangeEvent, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useCashierContext } from '../../layout/AddCashier';
import useCashierCRUDService from '../../services/CashierCRUDService';
import LoadingSpinner from '../../../../shared/loader/LoadingSpinner';

const CashierDetails = () => {
  const { cashierDetails, setCashierDetails } = useCashierContext();
  const { createCashier, loading, profilePicture, setProfilePicture } =
    useCashierCRUDService();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfilePicture(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCashierDetails((prev: any) => ({
            ...prev,
            profileImageUrl: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    createCashier(cashierDetails);
  };

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      {/* Header */}
      <div className='flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-6 shadow-lg'>
        <h1 className='text-3xl font-bold'>Create New Cashier</h1>
        <p className='text-blue-100 text-sm mt-2'>Add a new employee to your branch</p>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-y-auto p-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-white rounded-xl shadow-md p-8'>
            {/* Profile Image Section */}
            <div className='flex flex-col items-center mb-8 pb-8 border-b border-gray-200'>
              <div className='relative'>
                {profilePicture ? (
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt='Profile Preview'
                    className='w-32 h-32 rounded-full object-cover border-4 border-blue-200'
                  />
                ) : (
                  <div className='w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-4 border-blue-200'>
                    <svg className='w-16 h-16 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                  </div>
                )}
              </div>
              <label className='mt-4 flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors shadow-md'>
                <IoCloudUploadOutline size={20} />
                <span className='font-medium'>Upload Photo</span>
                <input
                  type='file'
                  className='hidden'
                  onChange={handleImageChange}
                  accept='image/*'
                />
              </label>
              <p className='text-xs text-gray-500 mt-2'>PNG, JPG up to 5MB</p>
            </div>

            {/* Form Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* First Name */}
              <div>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-2'>
                  First Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='firstName'
                  required
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter first name'
                  value={cashierDetails.employerFirstName || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerFirstName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-2'>
                  Last Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='lastName'
                  required
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter last name'
                  value={cashierDetails.employerLastName || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerLastName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                  Email Address <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  id='email'
                  required
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='email@example.com'
                  value={cashierDetails.employerEmail || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerEmail: e.target.value,
                    })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                  Password <span className='text-red-500'>*</span>
                </label>
                <input
                  type='password'
                  id='password'
                  required
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter password'
                  value={cashierDetails.employerPassword || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerPassword: e.target.value,
                    })
                  }
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor='role' className='block text-sm font-medium text-gray-700 mb-2'>
                  Role <span className='text-red-500'>*</span>
                </label>
                <select
                  id='role'
                  required
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  value={cashierDetails.role || 'CASHIER'}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      role: e.target.value,
                    })
                  }
                >
                  <option value='CASHIER'>Cashier</option>
                  <option value='MANAGER'>Manager</option>
                  <option value='OWNER'>Owner</option>
                </select>
              </div>

              {/* PIN */}
              <div>
                <label htmlFor='pin' className='block text-sm font-medium text-gray-700 mb-2'>
                  PIN (4 digits) <span className='text-red-500'>*</span>
                </label>
                <input
                  type='number'
                  id='pin'
                  required
                  min='1000'
                  max='9999'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter 4-digit PIN'
                  value={cashierDetails.pin || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      pin: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {/* Nickname */}
              <div>
                <label htmlFor='nickname' className='block text-sm font-medium text-gray-700 mb-2'>
                  Nickname
                </label>
                <input
                  type='text'
                  id='nickname'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter nickname'
                  value={cashierDetails.employerNicName || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerNicName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  id='phone'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='0771234567'
                  value={cashierDetails.employerPhone || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerPhone: e.target.value,
                    })
                  }
                />
              </div>

              {/* NIC */}
              <div>
                <label htmlFor='nic' className='block text-sm font-medium text-gray-700 mb-2'>
                  NIC Number
                </label>
                <input
                  type='text'
                  id='nic'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='200012345678 or 991234567V'
                  value={cashierDetails.employerNic || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerNic: e.target.value,
                    })
                  }
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor='gender' className='block text-sm font-medium text-gray-700 mb-2'>
                  Gender
                </label>
                <select
                  id='gender'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  value={cashierDetails.gender || 'MALE'}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value='MALE'>Male</option>
                  <option value='FEMALE'>Female</option>
                  <option value='OTHER'>Other</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-2'>
                  Address
                </label>
                <input
                  type='text'
                  id='address'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='Enter address'
                  value={cashierDetails.employerAddress || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerAddress: e.target.value,
                    })
                  }
                />
              </div>

              {/* Salary */}
              <div>
                <label htmlFor='salary' className='block text-sm font-medium text-gray-700 mb-2'>
                  Monthly Salary (LKR)
                </label>
                <input
                  type='number'
                  id='salary'
                  min='0'
                  step='1000'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                  placeholder='50000'
                  value={cashierDetails.employerSalary || ''}
                  onChange={(e) =>
                    setCashierDetails({
                      ...cashierDetails,
                      employerSalary: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200'>
              <Link to='/manager-dashboard/Cashiers'>
                <button
                  type='button'
                  className='px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors'
                >
                  Cancel
                </button>
              </Link>
              <button
                type='button'
                onClick={handleSubmit}
                disabled={loading}
                className={`px-8 py-2.5 rounded-lg font-medium transition-all shadow-md ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}
              >
                {loading ? (
                  <span className='flex items-center gap-2'>
                    <LoadingSpinner size='sm' />
                    Creating...
                  </span>
                ) : (
                  'Create Employee'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDetails;
