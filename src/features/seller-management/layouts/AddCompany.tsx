import React from 'react';
import { Link } from 'react-router-dom';
import { IoCloudUploadOutline } from 'react-icons/io5';
import useSellerCompanyService from '../services/SellerComapanyService';
import LoadingSpinner from '../../../shared/loader/LoadingSpinner';

const AddCompany = () => {
  const { setFormData, addCompany, formData, adding } = useSellerCompanyService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCompany();
  };

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      {/* Header */}
      <div className='flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-6 shadow-lg'>
        <h1 className='text-3xl font-bold'>Add Supplier Company</h1>
        <p className='text-blue-100 text-sm mt-2'>Create a new supplier company</p>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-y-auto p-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-white rounded-xl shadow-md p-8'>
            <form onSubmit={handleSubmit}>
              {/* Company Logo Section */}
              <div className='flex flex-col items-center mb-8 pb-8 border-b border-gray-200'>
                <div className='relative'>
                  {formData.companyImage ? (
                    <img
                      src={formData.companyImage}
                      alt='Company Logo'
                      className='w-32 h-32 rounded-lg object-cover border-4 border-blue-200 shadow-md'
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/128?text=Company+Logo';
                      }}
                    />
                  ) : (
                    <div className='w-32 h-32 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-4 border-blue-200 shadow-md'>
                      <svg className='w-16 h-16 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                      </svg>
                    </div>
                  )}
                </div>
                <p className='text-sm text-gray-600 mt-4'>Enter logo URL below</p>
              </div>

              {/* Form Fields - 2 Column Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Company Information Section */}
                <div className='md:col-span-2'>
                  <h3 className='text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200'>
                    Company Information
                  </h3>
                </div>

                {/* Company Name */}
                <div className='md:col-span-2'>
                  <label htmlFor='companyName' className='block text-sm font-medium text-gray-700 mb-2'>
                    Company Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='companyName'
                    name='companyName'
                    value={formData.companyName}
                    onChange={handleChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='Enter company name'
                    required
                  />
                </div>

                {/* Company Address */}
                <div className='md:col-span-2'>
                  <label htmlFor='companyAddress' className='block text-sm font-medium text-gray-700 mb-2'>
                    Address <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='companyAddress'
                    name='companyAddress'
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='Enter company address'
                    required
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label htmlFor='companyContact' className='block text-sm font-medium text-gray-700 mb-2'>
                    Contact Number <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='companyContact'
                    name='companyContact'
                    value={formData.companyContact}
                    onChange={handleChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='0771234567'
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor='companyEmail' className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='email'
                    id='companyEmail'
                    name='companyEmail'
                    value={formData.companyEmail}
                    onChange={handleChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='company@example.com'
                    required
                  />
                </div>

                {/* Company Logo URL */}
                <div className='md:col-span-2'>
                  <label htmlFor='companyImage' className='block text-sm font-medium text-gray-700 mb-2'>
                    Company Logo URL <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='url'
                    id='companyImage'
                    name='companyImage'
                    value={formData.companyImage}
                    onChange={handleChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='https://example.com/logo.png'
                    required
                  />
                </div>

                {/* Description */}
                <div className='md:col-span-2'>
                  <label htmlFor='companyDescription' className='block text-sm font-medium text-gray-700 mb-2'>
                    Description
                  </label>
                  <textarea
                    id='companyDescription'
                    name='companyDescription'
                    value={formData.companyDescription}
                    onChange={handleChange}
                    rows={3}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none'
                    placeholder='Enter company description'
                  />
                </div>

                {/* Banking Information Section */}
                <div className='md:col-span-2 mt-4'>
                  <h3 className='text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200'>
                    Banking Information
                  </h3>
                </div>

                {/* Bank Name */}
                <div>
                  <label htmlFor='companyBank' className='block text-sm font-medium text-gray-700 mb-2'>
                    Bank Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='companyBank'
                    name='companyBank'
                    value={formData.companyBank}
                    onChange={handleChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='Bank of Ceylon'
                    required
                  />
                </div>

                {/* Account Number */}
                <div>
                  <label htmlFor='companyAccountNumber' className='block text-sm font-medium text-gray-700 mb-2'>
                    Account Number <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='companyAccountNumber'
                    name='companyAccountNumber'
                    value={formData.companyAccountNumber}
                    onChange={handleChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='1234567890'
                    required
                  />
                </div>

                {/* Additional Details Section */}
                <div className='md:col-span-2 mt-4'>
                  <h3 className='text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200'>
                    Additional Details
                  </h3>
                </div>

                {/* Status */}
                <div>
                  <label htmlFor='companyStatus' className='block text-sm font-medium text-gray-700 mb-2'>
                    Status <span className='text-red-500'>*</span>
                  </label>
                  <select
                    id='companyStatus'
                    name='companyStatus'
                    value={formData.companyStatus}
                    onChange={handleChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    required
                  >
                    <option value=''>Select status</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                    <option value='Pending'>Pending</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label htmlFor='companyRating' className='block text-sm font-medium text-gray-700 mb-2'>
                    Rating (1-5) <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    id='companyRating'
                    name='companyRating'
                    value={formData.companyRating}
                    onChange={handleChange}
                    min='1'
                    max='5'
                    step='0.1'
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                    placeholder='4.5'
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200'>
                <Link to='/manager-dashboard/Sellers'>
                  <button
                    type='button'
                    className='px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors'
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type='submit'
                  disabled={adding}
                  className={`px-8 py-2.5 rounded-lg font-medium transition-all shadow-md ${
                    adding
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }`}
                >
                  {adding ? (
                    <span className='flex items-center gap-2'>
                      <LoadingSpinner size='sm' />
                      Creating...
                    </span>
                  ) : (
                    'Create Company'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
