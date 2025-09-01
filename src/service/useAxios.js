import axios from 'axios';
import { useLogin } from '../contexts/LoginContext';

const useAxios = () => {
  const { logout } = useLogin();
  const axiosInstance = axios.create({
    baseURL: '/api',
  });

  const axiosNoAuth = axios.create({
    baseURL: '/api',
  });

  axiosInstance.interceptors.request.use((config) => {
    if (!config.skipAuth) {
      const token = localStorage.getItem('tiktokToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = localStorage.getItem('tiktokToken');
          const res = await axiosNoAuth.post('/auth/refreshToken', { token });
          const newToken = res.data.result.token;
          localStorage.setItem('tiktokToken', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          logout();
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default useAxios;
