import { useState } from 'react';
import { SellerCompany } from '../interfaces/SellerCompany';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { toast } from 'react-toastify';

const useSellerCompanyService = () => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<SellerCompany[]>();
  const http = useAxiosInstance();
  const [filteredCompanies, setFilteredCompanies] = useState<SellerCompany[]>();
  const [showAddCompanyModal, setShowAddCompanyModal] =
    useState<boolean>(false);
  const [showUpdateCompanyModal, setShowUpdateCompanyModal] =
    useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await http.get(
        '/supplier-company/get-all'
      );
      console.log(res.data);

      setCompanies(res.data.data);
      setFilteredCompanies(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(companies);
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState<SellerCompany>({
    companyId: 0,
    companyName: '',
    companyAddress: '',
    companyContact: '',
    companyEmail: '',
    companyDescription: '',
    companyImage: '',
    companyStatus: '',
    companyRating: '',
    companyBank: '',
    companyAccountNumber: '',
  });

  const addCompany = async () => {
    console.log(formData);
    try {
      setAdding(true);
      const res = await http.post('/supplier-company/save', formData);
      console.log(res.data);
      toast.success('Company added successfully');
      setFormData({
        companyId: 0,
        companyName: '',
        companyAddress: '',
        companyContact: '',
        companyEmail: '',
        companyDescription: '',
        companyImage: '',
        companyStatus: '',
        companyRating: '',
        companyBank: '',
        companyAccountNumber: '',
      });
      fetchCompanies();
      setShowAddCompanyModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const fetchCompanyDetailsById = async (id: number) => {
    try {
      setLoading(true);
      const res = await http.get(
        `/supplier-company/get-by-id/${id}`
      );
      console.log(res.data);
      setFormData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (id: number) => {
    try {
      setUpdating(true);
      const res = await http.put(
        `/supplier-company/update/${id}`,
        formData
      );
      console.log(res);
      toast.success('Company updated successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const deleteCompany = async (id: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete company ${id}?`
    );

    if (confirmed) {
      try {
        setDeleting(true);
        const res = await http.delete(
          `/supplier-company/delete/${id}`
        );
        console.log(res);
        toast.success('Company deleted successfully');
        fetchCompanies();
      } catch (error) {
        console.log(error);
      } finally {
        setDeleting(false);
      }
    } else {
      // Show message if user cancels deletion
      toast.info('Deletion canceled.');
    }
  };

  return {
    fetchCompanies,
    companies,
    setFilteredCompanies,
    filteredCompanies,
    loading,
    setFormData,
    addCompany,
    formData,
    fetchCompanyDetailsById,
    updateCompany,
    showAddCompanyModal,
    setShowAddCompanyModal,
    showUpdateCompanyModal,
    setShowUpdateCompanyModal,
    updating,
    adding,
    deleting,
    deleteCompany,
  };
};

export default useSellerCompanyService;
