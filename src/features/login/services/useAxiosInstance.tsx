import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useUserContext } from '../../../context/UserContext';

const useAxiosInstance = () => {
  const { cookie } = useUserContext();

  // Create axios instance once using useMemo
  const instance = useMemo(() => {
    return axios.create({
      // baseURL: 'http://localhost:8079/lifepill/v1',
      // baseURL: 'http://18.188.108.84:8079/lifepill/v1',
      baseURL: 'http://35.208.197.159:9191/lifepill/v1/',
      headers: {
        'Content-type': 'application/json',
      },
    });
  }, []);

  useEffect(() => {
    // Request interceptor to dynamically add token to each request
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        // Get the latest token from localStorage to ensure we have the most recent one
        const storedCookie = localStorage.getItem('cookie');
        const token = storedCookie ? JSON.parse(storedCookie) : null;
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Don't override Content-Type for FormData - let browser set it with boundary
        if (config.data instanceof FormData) {
          delete config.headers['Content-type'];
          delete config.headers['Content-Type'];
        }
        
        console.log('Request URL:', `${config.baseURL || ''}${config.url || ''}`);
        console.log('Request token:', token);
        console.log('Request data type:', config.data?.constructor?.name);
        console.log('Request headers:', config.headers);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    const responseInterceptor = instance.interceptors.response.use(
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

    // Cleanup interceptors on unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [instance, cookie]);

  return instance;
};

export default useAxiosInstance;
