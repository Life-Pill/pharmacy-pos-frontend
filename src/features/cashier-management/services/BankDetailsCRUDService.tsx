import { useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { EmployerBankDetails } from '../interfaces/EmployerBankDetails';
import { toast } from 'react-toastify';
import { ComponentState, useCashierContext } from '../layout/AddCashier';

const useBankCRUDService = () => {
  const [loading, setLoading] = useState(false);
  const http = useAxiosInstance();
  const { setCurrentComponent } = useCashierContext();
  const updateBankDetails = async (
    bankDetails: EmployerBankDetails,
    employerID: number
  ) => {
    setLoading(true);
    try {
      console.log('Bank Details', bankDetails);
      const res = await http.put(
        `/employers/updateBankAccountDetails/${employerID}`,
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

  return { updateBankDetails, loading };
};

export default useBankCRUDService;
