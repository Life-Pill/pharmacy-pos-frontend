import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';
import { toast } from 'react-toastify';
import { ComponentState, useCashierContext } from '../layout/AddCashier';

const useCashierCRUDService = () => {
  const http = useAxiosInstance();
  const user = useUserContext();
  const [loading, setLoading] = useState(false);
  const { setCurrentComponent } = useCashierContext();

  const createCashier = async (employer: CashierDetailsType) => {
    if (
      !employer ||
      !employer.branchId ||
      !employer.employerNicName ||
      !employer.employerFirstName ||
      !employer.employerLastName ||
      !employer.employerPassword ||
      !employer.employerConfirmPassword ||
      !employer.employerEmail ||
      !employer.employerPhone ||
      !employer.employerAddress ||
      !employer.employerSalary ||
      !employer.employerNic ||
      !employer.gender ||
      !employer.dateOfBirth ||
      !employer.role ||
      !employer.pin
    ) {
      toast.error('Please provide all required information.');
      return;
    }

    if (employer.employerPassword !== employer.employerConfirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // console.log('Employer', employer);
      const res = await http.post('/employers/save-without-image', employer);
      console.log(res);

      if (res.status === 200) {
        toast.success(`${employer.employerFirstName} created successfully!`);
        setCurrentComponent(ComponentState.BankDetails);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create a cashier');
    } finally {
      setLoading(false);
    }
  };

  return { createCashier, loading };
};

export default useCashierCRUDService;
function setCurrentComponent(BankDetails: any) {
  throw new Error('Function not implemented.');
}
