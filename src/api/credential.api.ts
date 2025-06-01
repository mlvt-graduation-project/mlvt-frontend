import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create an axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api', // use environment variables for flexibility
    timeout: 1000000, // Set a timeout limit
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can add authorization headers or modify config here
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        // Handle errors globally
        if (error.response) {
            console.error(`API error: ${error.response.status} - ${error.response.data}`);
        } else {
            console.error('Network error or request was not processed');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
