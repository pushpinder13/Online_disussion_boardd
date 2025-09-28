import { useState, useEffect } from 'react';
import { threadsAPI } from '../api/threads';

const TrendingTopics = () => {
  const [trendingThreads, setTrendingThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingThreads = async () => {
      try {
        const response = await threadsAPI.getAll({ sortBy: 'popular', limit: 5 });
        const threads = response.data.threads || response.data || [];
        setTrendingThreads(threads);
      } catch (error) {
        console.error('Failed to fetch trending threads:', error);
        setTrendingThreads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingThreads();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Trending Topics</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-100 h-3 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-xl">🔥</span>
        <h3 className="text-lg font-semibold text-gray-900">Trending Topics</h3>
      </div>
      
      <div className="space-y-3">
        {trendingThreads.length > 0 ? (
          trendingThreads.map((thread, index) => (
            <div key={thread._id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{thread.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{thread.replies?.length || 0} replies</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{thread.views || 0} views</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <span className="text-gray-500 text-sm">No trending topics yet</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingTopics;