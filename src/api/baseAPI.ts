import axios from 'axios';
import { apiUrl } from '../Environment';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: false
});

export default axiosInstance;