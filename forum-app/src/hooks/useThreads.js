import { useState, useEffect } from 'react';
import { threadsAPI } from '../api/threads';

export const useThreads = (params = {}) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const response = await threadsAPI.getAll(params);
      setThreads(response.data.threads || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch threads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [JSON.stringify(params)]);

  return { threads, loading, error, refetch: fetchThreads };
};