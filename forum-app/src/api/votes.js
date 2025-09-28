import api from './client';

export const votesAPI = {
  voteThread: (threadId, voteType) => api.post(`/votes/thread/${threadId}`, { type: voteType }),
  voteReply: (threadId, replyId, voteType) => api.post(`/votes/thread/${threadId}/reply/${replyId}`, { type: voteType }),
};