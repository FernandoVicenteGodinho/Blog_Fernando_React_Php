import api from './api';

export const getUser = () => {
    return api.get('/user');
};

export const updateUser = (data: any) => {
    return api.post('/user', data);
};
