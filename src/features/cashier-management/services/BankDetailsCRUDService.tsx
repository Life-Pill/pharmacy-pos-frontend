import { useEffect, useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { EmployerBankDetails } from '../interfaces/EmployerBankDetails';
import { toast } from 'react-toastify';
import { ComponentState, useCashierContext } from '../layout/AddCashier';

const useBankCRUDService = () => {
  const [loading, setLoading] = useState(false);
  const http = useAxiosInstance();
  const { setCurrentComponent } = useCashierContext();
  const [cashierBankDetails, setCashierBankDetails] =
    useState<EmployerBankDetails>({} as EmployerBankDetails);

  const updateBankDetails = async (
    bankDetails: EmployerBankDetails,
    employerID: number
  ) => {
    if (
      !bankDetails ||
      !employerID ||
      !bankDetails.bankName ||
      !bankDetails.bankBranchName ||
      !bankDetails.bankAccountNumber
    ) {
      toast.error('Please fill out all required fields');
      return;
    }

    //check bank account number type
    if (isNaN(bankDetails.bankAccountNumber)) {
      toast.error('Bank account number should be a number');
      return;
    }

    setLoading(true);
    try {
      console.log('Bank Details', bankDetails);
      const res = await http.put(
        `/employers/updateEmployerBankAccountDetailsWithId/${employerID}`,
        bankDetails
      );
      if (res.status === 200) {
        toast.success('Bank details updated successfully');
        setCurrentComponent(ComponentState.DetailsSummary); // Set the current component to Details
      }
    } catch (error) {
      toast.error('Error updating bank details');
    } finally {
      setLoading(false);
    }
  };

  const fetchBankDetailsById = async (
    id: number
  ): Promise<EmployerBankDetails | null> => {
    setLoading(true);
    try {
      const res = await http.get(`/employers/bank-details/${id}`);
      console.log('bank details fetched here', res.data);
      const bankDetails: EmployerBankDetails = res.data.data;
      setCashierBankDetails(bankDetails); // Update the state
      return bankDetails; // Return the bank details
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch bank details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateBankDetails,
    loading,
    fetchBankDetailsById,
    setCashierBankDetails,
    cashierBankDetails,
  };
};

export default useBankCRUDService;
