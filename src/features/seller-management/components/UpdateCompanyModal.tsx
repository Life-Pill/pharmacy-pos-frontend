import React, { useEffect } from 'react';
import useSellerCompanyService from '../services/SellerComapanyService';

interface UpdateCompanyModalProps {
  onClose: () => void;
  id: number;
}

function UpdateCompanyModal({ onClose, id }: UpdateCompanyModalProps) {
  const {
    setFormData,
    formData,
    fetchCompanyDetailsById,
    updateCompany,
    updating,
  } = useSellerCompanyService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCompany(formData.companyId);
  };

  useEffect(() => {
    fetchCompanyDetailsById(id);
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-50 z-50 backdrop-blur-sm bg-gray-800 border-gray-200'>
      <div className='bg-gray-800 rounded-lg p-6 w-[500px] border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4 text-white'>
          Update Company
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='companyName' className='label-text'>
              Company Name
            </label>
            <input
              type='text'
              id='companyName'
              name='companyName'
              value={formData.companyName}
              onChange={handleChange}
              className='input-box'
              required
            />
          </div>
          <div className='flex justify-between'>
            <div className='mb-4'>
              <label htmlFor='companyAddress' className='label-text'>
                Company Address
              </label>
              <input
                type='text'
                id='companyAddress'
                name='companyAddress'
                value={formData.companyAddress}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='companyContact' className='label-text'>
                Company Contact
              </label>
              <input
                type='text'
                id='companyContact'
                name='companyContact'
                value={formData.companyContact}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label htmlFor='companyEmail' className='label-text'>
              Company Email
            </label>
            <input
              type='email'
              id='companyEmail'
              name='companyEmail'
              value={formData.companyEmail}
              onChange={handleChange}
              className='input-box'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='companyDescription' className='label-text'>
              Company Description
            </label>
            <input
              id='companyDescription'
              name='companyDescription'
              value={formData.companyDescription}
              className='input-box'
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='companyImage' className='label-text'>
              Company Image
            </label>
            <input
              type='text'
              id='companyImage'
              name='companyImage'
              value={formData.companyImage}
              onChange={handleChange}
              className='input-box'
            />
          </div>
          <div className='flex justify-between'>
            <div className='mb-4'>
              <label htmlFor='companyBank' className='label-text'>
                Company Bank
              </label>
              <input
                type='text'
                id='companyBank'
                name='companyBank'
                value={formData.companyBank}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='companyAccountNumber' className='label-text'>
                Company Account Number
              </label>
              <input
                type='text'
                id='companyAccountNumber'
                name='companyAccountNumber'
                value={formData.companyAccountNumber}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='mb-4'>
              <label htmlFor='companyStatus' className='label-text'>
                Company Status
              </label>
              <input
                type='text'
                id='companyStatus'
                name='companyStatus'
                value={formData.companyStatus}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='companyRating' className='label-text'>
                Company Rating
              </label>
              <input
                type='text'
                id='companyRating'
                name='companyRating'
                value={formData.companyRating}
                onChange={handleChange}
                className='input-box'
                required
              />
            </div>
          </div>

          <div className='flex justify-between'>
            <button
              type='button'
              onClick={onClose}
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            >
              Back
            </button>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              {updating ? 'Updating...' : 'Update Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCompanyModal;
