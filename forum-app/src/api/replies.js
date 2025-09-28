import api from './client';

export const repliesAPI = {
  create: (threadId, data) => api.post(`/replies/${threadId}`, data),
  update: (threadId, replyId, data) => api.put(`/replies/${threadId}/reply/${replyId}`, data),
  delete: (threadId, replyId) => api.delete(`/replies/${threadId}/reply/${replyId}`),
};