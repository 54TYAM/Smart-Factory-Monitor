import axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/api';
  }
  // Android emulator uses 10.0.2.2 to reach host machine
  return 'http://10.0.2.2:5000/api';
};

const BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
};

export const machineAPI = {
  getAll: () => api.get('/machines'),
  getById: (id: string) => api.get(`/machines/${id}`),
  update: (id: string, data: any) => api.put(`/machines/${id}`, data),
};

export const alertAPI = {
  getAll: () => api.get('/alerts'),
  acknowledge: (id: string) => api.put(`/alerts/${id}/acknowledge`),
};

export const maintenanceAPI = {
  getAll: () => api.get('/maintenance'),
  create: (data: any) => api.post('/maintenance', data),
  update: (id: string, data: any) => api.put(`/maintenance/${id}`, data),
};

export default api;
