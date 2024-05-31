import { useEffect, useState } from 'react';
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

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await http.get(
        '/supplierCompanies/getAll-Supplier-Companies'
      );
      console.log(res.data);

      setCompanies(res.data);
      setFilteredCompanies(res.data);
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
      const res = await http.post('/supplierCompanies/save', formData);
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
        `supplierCompanies/get-supplier-company/${id}`
      );
      console.log(res.data);
      setFormData(res.data);
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
        `supplierCompanies/update-supplier-company/${id}`,
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

  const deleteCompany = async () => {};

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
  };
};

export default useSellerCompanyService;
