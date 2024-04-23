import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import http from '../../../services/http-common';

const SignIn = async (
  username: string,
  password: string,
  navigate: ReturnType<typeof useNavigate>
): Promise<void> => {
  try {
    const res = await http.post('/auth/authenticate', {
      employerEmail: username,
      employerPassword: password,
    });
    console.log(res.data);
    if (res.data) {
      alert('Logged in successfully');
      navigate('/cashier-dashboard');
    }
  } catch (error) {
    console.log(error);
    alert('Incorrect password. Please try again.');
  }
};

export default SignIn;
