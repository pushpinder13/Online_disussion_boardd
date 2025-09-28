import api from './client';

export const threadsAPI = {
  getAll: (params) => api.get('/threads', { params }),
  getById: (id) => api.get(`/threads/${id}`),
  create: (data) => api.post('/threads', data),
  update: (id, data) => api.put(`/threads/${id}`, data),
  delete: (id) => api.delete(`/threads/${id}`),
  adminDelete: (id) => api.delete(`/threads/${id}/admin`),
};