
import axios from 'axios';
import { exceptionHandler } from '../core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {logout } from '../core/authUtils'
axios.defaults.baseURL = "http://localhost:9090";
export const axiosPublicInstance = axios.create();
export const axiosPrivateInstance = axios.create();

// Request interceptor to manage authorization & headers
axiosPrivateInstance.interceptors.request.use(async (request: any) => {
  const tokenResponse = { accessToken: localStorage.getItem('accessToken') };
  request.headers.Authorization = `Bearer ${tokenResponse?.accessToken}`;

  return request;
}, (error: any) => {
  console.log('Req interceptor Error', error);
  return Promise.reject(error);
});
// Response interceptor to manage responses & errors
axiosPrivateInstance.interceptors.response.use(async (response: any) => {

  return response;
}, async (error: { response: any }) => {
  if (error.response && error.response.status === 401) {
    logout()
  }
  return Promise.reject(await exceptionHandler(error.response));
});

axiosPublicInstance.interceptors.response.use(async (response: any) => {
  return response;
}, async (error: { response: any }) => {
  if (error.response && error.response.status === 401) {
    // Perform logout logic
    localStorage.removeItem('accessToken');
    // Redirect to login page or handle logout
    window.location.href = '/login';
  }
  return Promise.reject(await exceptionHandler(error.response));
});


