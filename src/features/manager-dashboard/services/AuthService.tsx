import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { toast } from 'react-toastify';
import { useState } from 'react';

const useAuthService = () => {
  const http = useAxiosInstance();
  const user = useUserContext();
  const navigate = useNavigate();
  const [logging, setLogging] = useState<boolean>();

  const logOut = async () => {
    // Prompt for confirmation before logging out
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return; // If user cancels logout, do nothing

    try {
      setLogging(true);
      const res = await http.post('session/logout/permanent', {
        user: user.user?.employerEmail,
      });

      if (res.status === 200) {
        toast.success('Successfully logged out');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLogging(false);
    }
  };

  return { logOut, logging };
};

export default useAuthService;
