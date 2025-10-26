import axios from 'axios';
import { store } from '../../redux/store';
import { clearAuth } from '../../redux/slices/authSlice';

// Create instance
const api = axios.create({
    baseURL: 'http://192.168.1.4:8000', // Replace with your server
    timeout: 10000,
});

// Request interceptor: add token automatically
api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token; // from Redux
        if (token && config.headers) {
            // Use AxiosHeaders set method
            (config.headers as any)['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle 401 Unauthorized globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, clear auth
            store.dispatch(clearAuth());
            console.warn('Token expired. Logged out.');
        }
        return Promise.reject(error);
    }
);

export default api;
