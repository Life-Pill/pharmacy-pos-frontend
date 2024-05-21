import { useEffect, useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';
import { toast } from 'react-toastify';
import { ComponentState, useCashierContext } from '../layout/AddCashier';
import { validateEmail } from '../../../utils/validators/EmailValidator';
import { passwordsMatch } from '../../../utils/validators/passwordValidator';

const useCashierCRUDService = () => {
  const http = useAxiosInstance();
  const user = useUserContext();
  const [loading, setLoading] = useState(false);
  const { setCurrentComponent } = useCashierContext();
  const [updating, setUpdating] = useState(false);

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

    if (
      !passwordsMatch(
        employer.employerPassword,
        employer.employerConfirmPassword
      )
    ) {
      toast.error('Passwords do not match.');
      return;
    }

    if (
      !['OWNER', 'CASHIER', 'MANAGER'].includes(employer.role.toUpperCase())
    ) {
      toast.error(
        'Invalid role. Role should be either OWNER, CASHIER, or MANAGER.'
      );
      return;
    }

    if (!validateEmail(employer.employerEmail)) {
      toast.error('Invalid email');
      return;
    }

    setLoading(true);
    try {
      const res = await http.post('/employers/save-without-image', employer);

      console.log(res.data);
      if (res.data.code === 201) {
        const createdCashierData = res.data.data;
        setCurrentComponent(ComponentState.BankDetails);
        console.log('Created cashier:', createdCashierData.employerId);
        toast.success('Cashier created successfully!');
        return createdCashierData.employerId;
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create a cashier');
    } finally {
      setLoading(false);
    }
  };

  const [cashierDetails, setCashierDetails] = useState({
    employerNicName: '',
    employerFirstName: '',
    employerLastName: '',
    employerEmail: '',
    employerPhone: '',
    employerPassword: '',
    employerConfirmPassword: '',
    profileImage: '',
    branchId: 0,
    employerNic: '',
    dateOfBirth: '',
    employerAddress: '',
    pin: 0,
    role: 'CASHIER',
    employerSalary: 0,
    gender: 'MALE',
  });

  const fetchCashierById = async (id: Number) => {
    try {
      setLoading(true);
      console.log('Fetching cashier by id', id);
      const res = await http.get('/employers/get-by-id', { params: { id } });
      console.log(res);
      if (res.status === 200) {
        setCashierDetails(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const updateCashier = async (employer: any) => {
    try {
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

      // if (   !passwordsMatch(
      //     employer.employerPassword,
      //     employer.employerConfirmPassword
      //   )
      // ) {
      //   toast.error('Passwords do not match.');
      //   return;
      // }

      if (
        !['OWNER', 'CASHIER', 'MANAGER'].includes(employer.role.toUpperCase())
      ) {
        toast.error(
          'Invalid role. Role should be either OWNER, CASHIER, or MANAGER.'
        );
        return;
      }

      if (!validateEmail(employer.employerEmail)) {
        toast.error('Invalid email');
        return;
      }

      setUpdating(true);
      const res = await http.put(
        `/employers/update/${employer.employerId}`,
        employer
      );
      if (res.status === 200) {
        toast.success('Cashier updated successfully!');
        setCurrentComponent(ComponentState.BankDetails);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Failed to update cashier');
    } finally {
      setUpdating(false);
    }
  };

  return {
    createCashier,
    loading,
    fetchCashierById,
    cashierDetails,
    setCashierDetails,
    updateCashier,
    updating,
  };
};
export default useCashierCRUDService;
