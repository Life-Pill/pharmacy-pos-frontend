import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { CashierDetailsType } from '../interfaces/CashierDetailsType';
import { toast } from 'react-toastify';
import { ComponentState, useCashierContext } from '../layout/AddCashier';
import { validateEmail } from '../../../utils/validators/EmailValidator';
import { passwordsMatch } from '../../../utils/validators/passwordValidator';
import { useNavigate } from 'react-router-dom';

const useCashierCRUDService = () => {
  const http = useAxiosInstance();
  // const user = useUserContext();
  const [loading, setLoading] = useState(false);
  const { setCurrentComponent } = useCashierContext();
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<File>(
    new File([], 'profile')
  );

  // const createCashier = async (employer: CashierDetailsType) => {
  //   if (
  //     !employer ||
  //     !employer.branchId ||
  //     !employer.employerNicName ||
  //     !employer.employerFirstName ||
  //     !employer.employerLastName ||
  //     !employer.employerPassword ||
  //     !employer.employerConfirmPassword ||
  //     !employer.employerEmail ||
  //     !employer.employerPhone ||
  //     !employer.employerAddress ||
  //     !employer.employerSalary ||
  //     !employer.employerNic ||
  //     !employer.gender ||
  //     !employer.dateOfBirth ||
  //     !employer.role ||
  //     !employer.pin
  //   ) {
  //     toast.error('Please provide all required information.');
  //     return;
  //   }

  //   if (
  //     !passwordsMatch(
  //       employer.employerPassword,
  //       employer.employerConfirmPassword
  //     )
  //   ) {
  //     toast.error('Passwords do not match.');
  //     return;
  //   }

  //   if (
  //     !['OWNER', 'CASHIER', 'MANAGER'].includes(employer.role.toUpperCase())
  //   ) {
  //     toast.error(
  //       'Invalid role. Role should be either OWNER, CASHIER, or MANAGER.'
  //     );
  //     return;
  //   }

  //   if (!validateEmail(employer.employerEmail)) {
  //     toast.error('Invalid email');
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await http.post('/employers/save-without-image', employer);

  //     console.log(res.data);
  //     if (res.data.code === 201) {
  //       const createdCashierData = res.data.data;
  //       setCurrentComponent(ComponentState.BankDetails);
  //       console.log('Created cashier:', createdCashierData.employerId);
  //       toast.success('Cashier created successfully!');
  //       return createdCashierData.employerId;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Failed to create a cashier');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateProfileImage = async (employerId: number) => {
    try {
      const res = await http.put(
        `/lifepill/v1/employers/update-employer-image/${employerId}`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const createCashier = async (employer: CashierDetailsType) => {
    if (
      !employer ||
      !employer.branchId ||
      !employer.employerNicName ||
      !employer.employerFirstName ||
      !employer.employerLastName ||
      !employer.employerPassword ||
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

    // if (
    //   !passwordsMatch(
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
    employerId: 0,
    employerNicName: '',
    employerFirstName: '',
    employerLastName: '',
    employerEmail: '',
    employerPhone: '',
    employerPassword: '',
    profileImage: '',
    branchId: 0,
    employerNic: '',
    dateOfBirth: '',
    employerAddress: '',
    pin: 0,
    role: 'CASHIER',
    employerSalary: 0,
    gender: 'MALE',
    activeStatus: true,
  });

  const fetchCashierById = async (employerId: Number) => {
    try {
      setLoading(true);
      console.log('Fetching cashier by id', employerId);
      const res = await http.get('/employers/get-by-id', {
        params: { employerId },
      });
      console.log(res.data.data);
      if (res.status === 200) {
        setCashierDetails(res.data.data);
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

  const deleteCashierById = async (id: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete cashier ${id}?`
    );
    if (confirmed) {
      try {
        setLoading(true);
        console.log('Deleting cashier by id', id);
        const res = await http.delete(`/employers/delete-employerId/${id}`);
        console.log(res);
        toast.success('Cashier deleted successfully');
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete cashier');
      } finally {
        setLoading(false);
        navigate('/manager-dashboard/Cashiers');
      }
    } else {
      // Show message if user cancels deletion
      toast.info('Deletion canceled.');
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
    deleteCashierById,
    profilePicture,
    setProfilePicture,
  };
};
export default useCashierCRUDService;
