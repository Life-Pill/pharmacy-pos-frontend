import axios from 'axios';
import { useEffect } from 'react';
import { useUserContext } from '../../../context/UserContext';

const useAxiosInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8079/lifepill/v1',
    headers: {
      'Content-type': 'application/json',
    },
  });

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').reduce((acc: any, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {});

    const token = cookies.Authorization;
    if (token) {
      console.log('Setting token:', token);
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

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
