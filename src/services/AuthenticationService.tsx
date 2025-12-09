import { toast } from 'react-toastify';
import { useUserContext } from '../context/UserContext';
import useAxiosInstance from '../features/login/services/useAxiosInstance';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useAuthenticationService = () => {
  const { user, setUser, setCookie } = useUserContext();
  const navigate = useNavigate();
  const [log, setLog] = useState<boolean>();
  const http = useAxiosInstance();

  const logInUsingPin = async (pin: string) => {
    try {
      setLog(true);
      console.log(user?.employerEmail);
      console.log(pin);
      
      const res = await http.post('/session/authenticate/cached', {
        username: user?.employerEmail,
        pin: parseInt(pin),
      });
      
      console.log(res);
      
      if (res.data.code === 200) {
        const { authenticationResponse, employerDetails } = res.data.data;
        const { access_token, refresh_token } = authenticationResponse;
        
        // Set the token in context (will save to localStorage)
        setCookie(access_token);
        
        // Store refresh token
        if (refresh_token) {
          localStorage.setItem('refreshToken', refresh_token);
        }
        
        // Update user data in context
        if (employerDetails) {
          setUser(employerDetails);
        }
        
        toast.success(res.data.message || 'Successfully authenticated');
        navigate('/cashier-dashboard');
      } else {
        toast.error(res.data.message || 'Authentication failed');
      }
    } catch (error: any) {
      console.error('Cached authentication error:', error);
      toast.error(error?.response?.data?.message || 'Authentication failed');
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
      console.log(user);
      const res = await http.post('auth/logout', {
        user: user?.employerEmail,
      });

      if (res.status === 200) {
        toast.success('Successfully logged out');
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
  };

  return {
    logInUsingPin,
    log,
    logOut,
    logging,
  };
};

export default useAuthenticationService;
