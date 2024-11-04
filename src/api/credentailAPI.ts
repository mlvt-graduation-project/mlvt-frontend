import axios from 'axios';
import { apiUrl } from '../Environment';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
  //   const token = localStorage.getItem('token'); 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxzdGFuMTUxMjAyQGdtYWlsLmNvbSIsImV4cCI6MTczMDk3MTcwNiwidXNlcklEIjo3fQ.o5bbt0xo42OvDJajXFz7ar82s5g8EIPqfxIxmitd4cM'; 

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;