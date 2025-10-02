import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { threadsAPI } from '../api/threads';
import ModernLoader from '../components/ModernLoader';

const MyThreads = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyThreads = async () => {
      try {
        const response = await threadsAPI.getAll();
        const allThreads = response.data.threads || response.data || [];
        const myThreads = allThreads.filter(thread => thread.author?._id === user?._id);
        setThreads(myThreads);
      } catch (error) {
        console.error('Failed to fetch threads:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchMyThreads();
    }
  }, [user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <ModernLoader size="xl" text="Loading your discussions..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-mesh">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="glass-enhanced rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 hover-lift animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gradient-enhanced mb-2 flex items-center justify-center md:justify-start">
                <span className="mr-3 text-3xl">📝</span>
                My Discussions
              </h1>
              <p className="text-gray-600 text-lg">Manage and track all your conversations</p>
            </div>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{threads.length}</div>
                <div className="text-sm text-gray-600">Total Threads</div>
              </div>
              <Link
                to="/create"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all hover-lift shadow-lg flex items-center space-x-2"
              >
                <span>🚀</span>
                <span>Create New Discussion</span>
              </Link>
            </div>
          </div>
        </div>

        {threads.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {threads.map((thread, index) => (
              <div key={thread._id} className="glass-enhanced rounded-3xl shadow-xl p-6 border border-white/20 hover-lift animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Link
                      to={`/thread/${thread._id}`}
                      className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors block mb-3 line-clamp-2"
                    >
                      {thread.title}
                    </Link>
                    <p className="text-gray-600 line-clamp-3 mb-4">{thread.content}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium">
                    <span className="mr-1">💬</span>
                    {thread.replies?.length || 0} replies
                  </span>
                  <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                    <span className="mr-1">👁️</span>
                    {thread.views || 0} views
                  </span>
                  <span className="flex items-center text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-sm font-medium">
                    <span className="mr-1">📅</span>
                    {new Date(thread.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  {thread.category && (
                    <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-2xl text-sm font-bold border border-blue-200">
                      {thread.category.name}
                    </span>
                  )}
                  <Link
                    to={`/thread/${thread._id}`}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium"
                  >
                    View Discussion →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-enhanced rounded-3xl shadow-2xl p-16 text-center border border-white/20 animate-fade-in-up">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl animate-float">
              📝
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No discussions yet</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">You haven't created any discussions yet. Share your thoughts and start engaging conversations!</p>
            <Link
              to="/create"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all hover-lift shadow-lg inline-flex items-center space-x-2"
            >
              <span>🚀</span>
              <span>Create Your First Discussion</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyThreads;