import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useAuthService = () => {
  const user = useUserContext();
  const http = useAxiosInstance();
  const [logging, setLogging] = useState<boolean>();
  const navigate = useNavigate();

  const logOutCashier = async () => {
    const confirm = window.confirm('Are you sure log out ?');

    if (confirm) {
      try {
        setLogging(true);
        const res = await http.post('/session/logout/permanent', {
          username: user.user?.employerEmail,
        });

        if (res.status === 200) {
          toast.success('Logged out successfully');
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLogging(false);
      }
    }
  };

  return {
    logOutCashier,
    logging,
  };
};

export default useAuthService;
