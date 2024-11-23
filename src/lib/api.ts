import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

export const projects = {
  list: () => api.get('/projects'),
  create: (data: { name: string; description?: string }) =>
    api.post('/projects', data),
  update: (id: number, data: { name: string; description?: string }) =>
    api.patch(`/projects/${id}`, data),
  delete: (id: number) => api.delete(`/projects/${id}`),
};

export default api;