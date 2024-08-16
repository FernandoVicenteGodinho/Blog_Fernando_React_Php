import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.status === 401 || error.message === "Unauthenticated") {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            window.location.href = '/blog';
        }
        return Promise.reject(error);
    }
);

export default api;
