import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { mapEmployeeReponseToIEmployee } from '../utils/mapEmployeeReponseToIEmployee';
import { IEmployeeInterface } from '../../../interfaces/IEmployeeInterface';
import useAxiosInstance from './useAxiosInstance';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setCookie, setUser } = useUserContext(); // Assuming you have a setUser function in your context for setting user data
  const http = useAxiosInstance();

  const signIn = async (
    username: string,
    password: string
  ): Promise<IEmployeeInterface | null> => {
    setLoading(true);
    try {
      const res = await http.post('/auth/authenticate', {
        employerEmail: username,
        employerPassword: password,
      });

      console.log(res.data);

      if (
        res.data.code === 200 &&
        res.data.data?.authenticationResponse?.accessToken &&
        res.data.data?.employerDetails
      ) {
        alert('Logged in successfully');
        const employee = mapEmployeeReponseToIEmployee(
          res.data.data.employerDetails
        );

        console.log(employee);

        // Set user data and access token (both will be persisted to localStorage by context)
        setUser(employee);
        setCookie(res.data.data.authenticationResponse.accessToken);
        
        // Store refresh token if needed
        localStorage.setItem('refreshToken', res.data.data.authenticationResponse.refreshToken);

        return employee;
      }
    } catch (error) {
      console.log(error);
      alert('Incorrect password. Please try again.');
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { signIn, loading };
};

export default useSignIn;
