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
  const [profilePicture, setProfilePicture] = useState<File | null>();
  const user = useUserContext();

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
      !employer.employerFirstName ||
      !employer.employerLastName ||
      !employer.employerPassword ||
      !employer.employerEmail ||
      !employer.role ||
      !employer.pin
    ) {
      toast.error('Please provide all required information.');
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
      const formData = new FormData();
      
      // Create the request DTO object with required fields
      const requestDTO: any = {
        employerFirstName: employer.employerFirstName,
        employerLastName: employer.employerLastName,
        employerEmail: employer.employerEmail,
        employerPassword: employer.employerPassword,
        role: employer.role.toUpperCase(),
        pin: employer.pin
      };

      // Add optional fields if provided
      if (employer.employerNicName && employer.employerNicName.trim() !== '') {
        requestDTO.employerNicName = employer.employerNicName;
      }
      if (employer.employerPhone && employer.employerPhone.trim() !== '') {
        requestDTO.employerPhone = employer.employerPhone;
      }
      if (employer.employerNic && employer.employerNic.trim() !== '') {
        requestDTO.employerNic = employer.employerNic;
      }
      if (employer.gender && employer.gender.trim() !== '') {
        requestDTO.gender = employer.gender.toUpperCase();
      }
      if (employer.employerAddress && employer.employerAddress.trim() !== '') {
        requestDTO.employerAddress = employer.employerAddress;
      }
      if (employer.employerSalary && employer.employerSalary > 0) {
        requestDTO.employerSalary = employer.employerSalary;
      }

      // Append the requestDTO as a JSON string
      formData.append('requestDTO', JSON.stringify(requestDTO));

      // Append the file if present
      if (profilePicture) {
        formData.append('file', profilePicture, profilePicture.name);
      }

      // Get branchId from user context
      const branchId = user && user.user ? user.user.branchId : 1;

      const res = await http.post(
        `/employer/save-employer-with-image?branchId=${branchId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(res.data);
      if (res.data.code === 200) {
        const createdCashierData = res.data.data;
        toast.success(res.data.message || 'Cashier created successfully!');
        navigate('/manager-dashboard/Cashiers');
        return createdCashierData.employerId;
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.message || 'Failed to create a cashier';
      toast.error(errorMessage);
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
      const res = await http.get(`/employer/${employerId}`);
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

  const [profileImageUrl, setProfileImageUrl] = useState<any>();
  const [fetchProfilePicture, setFetchProfilePicture] =
    useState<boolean>(false);
  const fetchImageOfEmployer = async (employerId: number) => {
    try {
      setFetchProfilePicture(true);
      const res = await http.get(
        `/employer/view-profile-image/${employerId}`
      );
      console.log(res); // Check the response in console if needed

      // The API now returns a URL string in the data field
      if (res.data && res.data.code === 200 && res.data.data) {
        setProfileImageUrl(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchProfilePicture(false);
    }
  };

  const [updateState, setUpdateState] = useState<boolean>(false);
  const updateEmployerImage = async (employerId: number) => {
    const updateImageFormData = new FormData();
    if (profilePicture) {
      updateImageFormData.append('file', profilePicture, profilePicture?.name);
    } else {
      toast.warning('Please select a image');
    }
    try {
      setUpdateState(true);
      const res = await http.put(
        `/employers/update-employer-image/${employerId}`,
        updateImageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success('Image updated successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update profile picture');
    } finally {
      setUpdateState(false);
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
    fetchImageOfEmployer,
    profileImageUrl,
    fetchProfilePicture,
    updateEmployerImage,
    updateState,
  };
};
export default useCashierCRUDService;
