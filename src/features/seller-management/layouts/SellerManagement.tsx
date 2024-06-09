import React, { useEffect, useState } from 'react';
import useSellerCompanyService from '../services/SellerComapanyService';
import { Loader } from 'lucide-react';
import AddCompanyModal from '../components/AddCompanyModal';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import UpdateCompanyModal from '../components/UpdateCompanyModal';

function SellerManagement() {
  const {
    fetchCompanies,
    companies,
    filteredCompanies,
    setFilteredCompanies,
    loading,
    showAddCompanyModal,
    setShowAddCompanyModal,
    showUpdateCompanyModal,
    setShowUpdateCompanyModal,
    deleteCompany,
    deleting,
  } = useSellerCompanyService();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = (searchName: string) => {
    const filtered = companies?.filter((company) =>
      company.companyName?.includes(searchName)
    );
    setFilteredCompanies(filtered);
  };

  const handleAddCompany = () => {
    setShowAddCompanyModal(true);
  };

  const [companyId, setCompanyId] = useState<number>(0);

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mt-4 p-2'>
        <button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={handleAddCompany}
        >
          Add Company
        </button>

        <input
          type='text'
          placeholder='Search by phone number'
          className='px-4 py-2 border rounded-md outline-none'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className='overflow-y-auto max-h-[650px] relative '>
        {loading ? (
          <Loader />
        ) : (
          <table className='table-auto w-full text-sm text-left'>
            <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
              <tr>
                <th className='px-4 py-2'>Company Name</th>
                <th className='px-4 py-2'>Address</th>
                <th className='px-4 py-2'>Contact</th>
                <th className='px-4 py-2'>Account Number</th>
                <th className='px-4 py-2'>Bank</th>
                <th className='px-4 py-2'>Description</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Rating</th>
                <th className='px-4 py-2'></th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {filteredCompanies?.map((company) => (
                <tr key={company.companyId}>
                  <td className='border px-4 py-2 text-black'>
                    {company.companyName}
                  </td>
                  <td className='border px-4 py-2'>{company.companyAddress}</td>
                  <td className='border px-4 py-2'>{company.companyContact}</td>
                  <td className='border px-4 py-2'>
                    {company.companyAccountNumber}
                  </td>
                  <td className='border px-4 py-2'>{company.companyBank}</td>
                  <td className='border px-4 py-2'>
                    {company.companyDescription}
                  </td>
                  <td className='border px-4 py-2'>{company.companyEmail}</td>

                  <td className='border px-4 py-2'>{company.companyRating}</td>
                  <td className='border px-4 py-2'>{company.companyStatus}</td>
                  <td className='px-6 py-4 flex flex-col'>
                    {/* Update Button */}
                    <button
                      className='text-white font-bold py-2 px-4 rounded transition-transform hover:scale-110'
                      onClick={(e) => {
                        setCompanyId(company.companyId);
                        setShowUpdateCompanyModal(true);
                      }}
                    >
                      <BsPencilSquare className='text-blueDarker font-bold text-lg' />
                    </button>

                    <button
                      className='text-white font-bold py-2 px-4 rounded transition-transform hover:scale-110'
                      onClick={(e) => {
                        deleteCompany(company.companyId);
                      }}
                    >
                      {deleting ? (
                        <Loader />
                      ) : (
                        <BsTrash className='text-red font-bold text-lg' />
                      )}
                    </button>
                    {/* Add more cells with company details as needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showAddCompanyModal && (
        <AddCompanyModal
          onClose={() => {
            setShowAddCompanyModal(false);
            fetchCompanies();
          }}
        />
      )}
      {showUpdateCompanyModal && (
        <UpdateCompanyModal
          onClose={() => {
            setShowUpdateCompanyModal(false);
            fetchCompanies();
          }}
          id={companyId}
        />
      )}
    </div>
  );
}

export default SellerManagement;
