import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { apiUrl } from '../Environment';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          console.error('Unauthorized access. Redirecting to login.');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: You do not have permission to access this resource.');
          break;
        case 500:
          console.error('Server Error: An unexpected error occurred on the server.');
          break;
        default:
          console.error(`API Error: ${status} - ${error.message}`);
          break;
      }
    } else if (error.request) {
      console.error('Network Error: No response received from server.', error.message);
    } else {
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}

export async function get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.get<T>(url, { params, ...config });
  return response.data;
}

export async function post<T, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
}

export async function put<T, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.put<T>(url, data, config);
  return response.data;
}

export async function patch<T, U = any>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.patch<T>(url, data, config);
  return response.data;
}

export async function del<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.delete<T>(url, config);
  return response.data;
}

export default axiosInstance;