import api from './client';

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/users', { params }),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getThreads: (params) => api.get('/threads', { params }),
  updateThread: (id, data) => api.put(`/threads/${id}`, data),
  deleteThread: (id) => api.delete(`/threads/${id}`),
};