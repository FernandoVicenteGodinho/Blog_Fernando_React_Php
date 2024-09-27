import api from './api';

export const getPosts = () => {
  return api.get('/posts');
};

export const getPost = (id: string) => {
  return api.get(`/posts/${id}`);
};

export const createPost = (data: any) => {
  return api.post('/posts', data);
};
