import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import http from '../../../services/http-common';
import { mapEmployeeReponseToIEmployee } from '../utils/mapEmployeeReponseToIEmployee';

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
    const employee = mapEmployeeReponseToIEmployee(res.data.employerDetails);
    console.log(employee);

    if (res.data.authenticationResponse.message === 'Successfully logged in.') {
      alert('Logged in successfully');
      navigate('/cashier-dashboard');
    }
  } catch (error) {
    console.log(error);
    alert('Incorrect password. Please try again.');
  }
};

export default SignIn;
