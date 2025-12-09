import { ChangeEvent, useEffect, useState } from 'react';
import { IoCloudUploadOutline, IoCloseOutline } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { ComponentState, useCashierContext } from '../../layout/AddCashier';
import useCashierCRUDService from '../../services/CashierCRUDService';
import LoadingSpinner from '../../../../shared/loader/LoadingSpinner';
import { CashierDetailsType } from '../../interfaces/CashierDetailsType';
import useBankCRUDService from '../../services/BankDetailsCRUDService';

const UpdateCashierDetails = () => {
  const { employerId } = useParams();
  const [updateImage, setUpdateImage] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const {
    fetchCashierById,
    cashierDetails,
    setCashierDetails,
    loading,
    updateCashier,
    updating,
    setProfilePicture,
    fetchImageOfEmployer,
    fetchProfilePicture,
    profileImageUrl,
    profilePicture,
    updateEmployerImage,
    updateState,
  } = useCashierCRUDService();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfilePicture(file);
      setUpdateImage(true);
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const goToBankDetails = (employer: any) => {
    updateCashier(employer);
  };

  useEffect(() => {
    fetchCashierById(parseInt(employerId as string));
    fetchImageOfEmployer(parseInt(employerId as string));
    
    // Cleanup preview URL on unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-poppins'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-white mb-2'>Update Employee</h1>
              <p className='text-blue-100'>Employee ID: {employerId}</p>
            </div>
            <Link to='/manager-dashboard/Cashiers'>
              <button className='bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2'>
                <IoCloseOutline size={20} />
                Close
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center justify-center min-h-[400px]'>
            <LoadingSpinner />
          </div>
        ) : (
          <div className='bg-white rounded-xl shadow-md p-8'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
              {/* Profile Image Column */}
              <div className='lg:col-span-1 flex flex-col items-center gap-4'>
                <div className='text-center'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4'>Profile Picture</h3>
                  <div className='flex items-center justify-center mb-4'>
                    {updateImage && previewUrl ? (
                      <img
                        src={previewUrl}
                        alt='Preview'
                        className='w-40 h-40 rounded-full object-cover shadow-md border-4 border-blue-100'
                      />
                    ) : fetchProfilePicture ? (
                      <div className='w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center'>
                        <LoadingSpinner />
                      </div>
                    ) : (
                      <img
                        src={
                          profileImageUrl ||
                          'https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png'
                        }
                        alt='Profile'
                        className='w-40 h-40 rounded-full object-cover shadow-md border-4 border-blue-100'
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
                    onClick={(e) => updateEmployerImage(parseInt(employerId as string))}
                    disabled={updateState}
                  >
                    {updateState ? 'Updating Image...' : 'Update Image'}
                  </button>
                </div>
              </div>

              {/* Form Fields - Three Columns */}
              <div className='lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* First Column - Basic Information */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>Basic Information</h3>
                  
                  <div>
                    <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-1'>
                      First Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.employerFirstName}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerFirstName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-1'>
                      Last Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.employerLastName}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerLastName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor='nickname' className='block text-sm font-medium text-gray-700 mb-1'>
                      Nickname
                    </label>
                    <input
                      type='text'
                      id='nickname'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.employerNicName}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerNicName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                      Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.employerEmail}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerEmail: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor='role' className='block text-sm font-medium text-gray-700 mb-1'>
                      Role <span className='text-red-500'>*</span>
                    </label>
                    <select
                      id='role'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.role}
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
                </div>

                {/* Second Column - Contact & Personal */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>Contact & Personal</h3>
                  
                  <div>
                    <label htmlFor='telephone' className='block text-sm font-medium text-gray-700 mb-1'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='telephone'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.employerPhone}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerPhone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor='nicNumber' className='block text-sm font-medium text-gray-700 mb-1'>
                      NIC Number
                    </label>
                    <input
                      type='text'
                      id='nicNumber'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.employerNic}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerNic: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor='gender' className='block text-sm font-medium text-gray-700 mb-1'>
                      Gender
                    </label>
                    <select
                      id='gender'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.gender}
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

                  <div>
                    <label htmlFor='dateOfBirth' className='block text-sm font-medium text-gray-700 mb-1'>
                      Date of Birth
                    </label>
                    <input
                      type='date'
                      id='dateOfBirth'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.dateOfBirth?.slice(0, 10)}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor='addressLine' className='block text-sm font-medium text-gray-700 mb-1'>
                      Address
                    </label>
                    <textarea
                      id='addressLine'
                      rows={3}
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                      value={cashierDetails.employerAddress}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Third Column - Employment & Security */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>Employment & Security</h3>
                  
                  <div>
                    <label htmlFor='baseSalary' className='block text-sm font-medium text-gray-700 mb-1'>
                      Base Salary
                    </label>
                    <input
                      type='number'
                      id='baseSalary'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.employerSalary}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerSalary: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                      Password <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='password'
                      id='password'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.employerPassword}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          employerPassword: e.target.value,
                        })
                      }
                      placeholder='Leave empty to keep current password'
                    />
                  </div>

                  <div>
                    <label htmlFor='pin' className='block text-sm font-medium text-gray-700 mb-1'>
                      PIN <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='number'
                      id='pin'
                      className='w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      value={cashierDetails.pin}
                      onChange={(e) =>
                        setCashierDetails({
                          ...cashierDetails,
                          pin: parseInt(e.target.value),
                        })
                      }
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
                onClick={(e) => goToBankDetails(cashierDetails)}
                disabled={updating}
              >
                {updating ? (
                  <span className='flex items-center gap-2'>
                    <LoadingSpinner />
                    Updating...
                  </span>
                ) : (
                  'Update Employee'
                )}
              </button>
              <Link to='/manager-dashboard/Cashiers'>
                <button
                  type='button'
                  className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors'
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCashierDetails;
