import axios from 'axios';
import { useEffect } from 'react';
import { useUserContext } from '../../../context/UserContext';

const useAxiosInstance = () => {
  const { cookie } = useUserContext();

  const instance = axios.create({
    baseURL: 'http://localhost:8081/lifepill/v1',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${cookie}`,
    },
  });

  useEffect(() => {
    instance.interceptors.response.use(
      (response) => {
        // Handle successful responses
        return response;
      },
      (error) => {
        // Handle error responses
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log('Response error status:', error.response.status);
          console.log('Response error data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request error:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }, [instance]);

  return instance;
};

export default useAxiosInstance;
