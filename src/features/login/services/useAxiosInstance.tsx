import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from '../utils/getCookie';
import { useUserContext } from '../../../context/UserContext';
// import { useUserContext } from '../../../context/UserContext';

const useAxiosInstance = () => {
  const { cookie } = useUserContext();

  const instance = axios.create({
    // baseURL: 'http://localhost:8079/lifepill/v1',
    baseURL: 'http://18.188.108.84/lifepill/v1',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${cookie}`,
    },
  });

  // console.log(getCookie('Authorization'));
  console.log(cookie);
  // console.log(user);
  useEffect(() => {
    // Update instance headers when cookie changes
    instance.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
    console.log(`Bearer ${cookie}`);
  }, [cookie, instance]);

  useEffect(() => {
    // const cookieString = document.cookie;
    // const cookies = cookieString.split(';').reduce((acc: any, cookie) => {
    //   const [name, value] = cookie.trim().split('=');
    //   acc[name] = value;
    //   return acc;
    // }, {});

    // const token = cookies.Authorization;
    // console.log(token);
    // if (token) {
    //   console.log('Setting token:', token);
    //   instance.defaults.headers.common['Authorization'] = `Bearer ${getCookie('Authorization')}`;
    // }

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
