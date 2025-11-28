import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { toast } from 'react-toastify';
import { useState } from 'react';

const useAuthService = () => {
  const http = useAxiosInstance();
  const { user, setUser, setCookie } = useUserContext();
  const navigate = useNavigate();
  const [logging, setLogging] = useState<boolean>();

  const logOut = async () => {
    const confirm = window.confirm('Are you sure log out ?');

    if (confirm) {
      try {
        setLogging(true);
        const res = await http.post('/auth/logout', {
          username: user?.employerEmail,
        });

        if (res.status === 200) {
          toast.success('Logged out successfully');
          // Clear user data and token using context (will remove from localStorage)
          setUser(null);
          setCookie(null);
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLogging(false);
      }
    }
  };

  return { logOut, logging };
};

export default useAuthService;
