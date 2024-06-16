import { ChangeEvent, useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { ComponentState, useCashierContext } from '../../layout/AddCashier';
import useCashierCRUDService from '../../services/CashierCRUDService';
import Loader from '../../../../shared/loader/Loader';
import { CashierDetailsType } from '../../interfaces/CashierDetailsType';
import useBankCRUDService from '../../services/BankDetailsCRUDService';
import { LoaderIcon } from 'lucide-react';

const UpdateCashierDetails = () => {
  const { employerId } = useParams();
  const [updateImage, setUpdateImage] = useState<boolean>(false);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfilePicture(file);
          setUpdateImage(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const goToBankDetails = (employer: any) => {
    updateCashier(employer);
  };

  useEffect(() => {
    fetchCashierById(parseInt(employerId as string));
    fetchImageOfEmployer(parseInt(employerId as string));
  }, []);

  return (
    <div className='w-full p-16 px-4 sm:px-6 lg:px-8'>
      <p className='text-2xl font-bold text-center mb-4'>Update The Cashier</p>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-center justify-center'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className='flex items-center justify-center gap-4 flex-col'>
              <div className='mt-4'>
                {updateImage ? (
                  <img
                    src={profilePicture?.path}
                    alt='Preview'
                    className='w-64 h-64 rounded-full'
                  />
                ) : fetchProfilePicture ? (
                  <Loader />
                ) : (
                  <img
                    src={
                      profileImageUrl ||
                      'https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png'
                    }
                    alt='Profile'
                    className='w-64 h-64 rounded-full'
                  />
                )}
              </div>

              <label className='w-64 flex flex-row items-center p-2 justify-center gap-2 bg-white rounded-lg'>
                <IoCloudUploadOutline size={25} />
                <span className='text-base leading-normal'>
                  Select an image
                </span>
                <input
                  type='file'
                  className='hidden'
                  onChange={handleImageChange}
                  accept='image/*'
                />
              </label>

              <button
                type='button'
                className='text-white bg-blueDarker hover:bg-blue-600 font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
                onClick={(e) =>
                  updateEmployerImage(parseInt(employerId as string))
                }
              >
                {updateState ? 'Updating...' : 'Update Image'}
              </button>
            </div>

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
                value={cashierDetails.employerNicName}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    employerNicName: e.target.value,
                  })
                }
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
                value={cashierDetails.employerNic}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    employerNic: e.target.value,
                  })
                }
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
                value={cashierDetails.employerPhone}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    employerPhone: e.target.value,
                  })
                }
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
                value={cashierDetails.employerEmail}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    employerEmail: e.target.value,
                  })
                }
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
                value={cashierDetails.employerFirstName}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    employerFirstName: e.target.value,
                  })
                }
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
              <label
                htmlFor='gender'
                className='block text-sm font-medium text-black'
              >
                Gender
              </label>
              <select
                id='gender'
                className='mt-1 p-2 border-gray rounded-md w-64'
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

              <label
                htmlFor='addressLine'
                className='block text-sm font-medium text-black mt-4'
              >
                Address
              </label>
              <input
                type='text'
                id='addressLine1'
                className='mt-1 p-2 border-gray rounded-md w-64'
                value={cashierDetails.employerAddress}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    employerAddress: e.target.value,
                  })
                }
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
                value={cashierDetails.dateOfBirth?.slice(0, 10)}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    dateOfBirth: e.target.value,
                  })
                }
              />

              <label
                htmlFor='role'
                className='block text-sm font-medium text-black mt-4'
              >
                Role
              </label>
              <input
                type='text'
                id='role'
                className='mt-1 p-2 border-gray rounded-md w-64'
                value={cashierDetails.role}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    role: e.target.value,
                  })
                }
              />

              <label
                htmlFor='baseSalary'
                className='block text-sm font-medium text-black mt-4'
              >
                Base Salary
              </label>
              <input
                type='text'
                id='baseSalary'
                className='mt-1 p-2 border-gray rounded-md w-64'
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
              <label
                htmlFor='password'
                className='block text-sm font-medium text-black mt-4'
              >
                Password
              </label>
              <input
                type='text'
                id='password'
                className='mt-1 p-2 border-gray rounded-md w-64'
                value={cashierDetails.employerPassword}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    employerPassword: e.target.value,
                  })
                }
              />

              <label
                htmlFor='pin'
                className='block text-sm font-medium text-black mt-4'
              >
                Pin
              </label>
              <input
                type='number'
                accept='number'
                id='pin'
                className='mt-1 p-2 border-gray rounded-md w-64'
                value={cashierDetails.pin}
                onChange={(e) =>
                  setCashierDetails({
                    ...cashierDetails,
                    pin: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </>
        )}
      </div>

      <div className='flex items-center justify-center gap-8 w-full mt-8'>
        {updating ? (
          <Loader />
        ) : (
          <button
            type='button'
            className='text-white bg-blueDarker hover:bg-blue font-medium py-2.5 px-5 me-2 mb-2 rounded-lg'
            onClick={(e) => goToBankDetails(cashierDetails)}
          >
            Update Employer
          </button>
        )}
        <button
          type='button'
          className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-gray hover:bg-gray'
        >
          <Link to='/manager-dashboard'>Back To Cashier Manager</Link>
        </button>
      </div>
    </div>
  );
};

export default UpdateCashierDetails;
