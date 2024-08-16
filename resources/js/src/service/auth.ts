import api from './api';

export const login = (data: any) => {
    return api.post('/login', data);
};

export const logout = () => {
    return api.post('/logout');
};

export const register = (data: any) => {
    return api.post('/register', data);
};

export const validateToken = () => {
    return api.get('/validator');
};
