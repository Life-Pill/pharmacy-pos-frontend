import { toast } from 'react-toastify';
import { useUserContext } from '../context/UserContext';
import useAxiosInstance from '../features/login/services/useAxiosInstance';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useAuthenticationService = () => {
  const user = useUserContext();
  const navigate = useNavigate();
  const [log, setLog] = useState<boolean>();
  const http = useAxiosInstance();

  const logInUsingPin = async (pin: string) => {
    try {
      setLog(true);
      console.log(user.user?.employerEmail);
      console.log(pin);
      const res = await http.post('/session/authenticate/cached', {
        username: user.user?.employerEmail,
        pin: parseInt(pin),
      });
      console.log(res);
      if (res.status === 200) {
        toast.success('Successfully authenticated');
        navigate('/cashier-dashboard');
      } else {
        toast.error('Authentication failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Authentication failed');
    } finally {
      setLog(false);
    }
  };

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

  return {
    logInUsingPin,
    log,
    logOut,
    logging
  };
};

export default useAuthenticationService;
