import { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../../context/UserContext';
import { mapEmployeeReponseToIEmployee } from '../utils/mapEmployeeReponseToIEmployee';
import { IEmployeeInterface } from '../../../interfaces/IEmployeeInterface';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setCookie } = useUserContext(); // Assuming you have a setUser function in your context for setting user data

  const signIn = async (
    username: string,
    password: string
  ): Promise<IEmployeeInterface | null> => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/authenticate', {
        employerEmail: username,
        employerPassword: password,
      });

      console.log(res.data);

      if (
        res.data.authenticationResponse.message === 'Successfully logged in.'
      ) {
        alert('Logged in successfully');
        const employee = mapEmployeeReponseToIEmployee(
          res.data.employerDetails
        );
        console.log(employee);

        // Set user data or store cookie if needed
        setCookie(res.data.authenticationResponse.token);

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
