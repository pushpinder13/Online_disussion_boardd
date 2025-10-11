import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { threadsAPI } from '../../api/threads';
import { categoriesAPI } from '../../api/categories';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalThreads: 0,
    totalReplies: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentThreads, setRecentThreads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [threadsRes, categoriesRes] = await Promise.all([
          threadsAPI.getAll({ sortBy: 'recent' }),
          categoriesAPI.getAll()
        ]);
        
        const threads = threadsRes.data.threads || threadsRes.data || [];
        const categories = categoriesRes.data.categories || categoriesRes.data || [];
        
        // Calculate real statistics
        const totalReplies = threads.reduce((acc, thread) => acc + (thread.replies?.length || 0), 0);
        const uniqueAuthors = new Set(threads.map(thread => thread.author?._id || thread.author)).size;
        
        setStats({
          totalUsers: uniqueAuthors || 1,
          totalThreads: threads.length || 0,
          totalReplies: totalReplies,
          activeUsers: Math.min(uniqueAuthors, threads.length) || 1
        });
        
        setRecentThreads(threads.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setStats({
          totalUsers: 0,
          totalThreads: 0,
          totalReplies: 0,
          activeUsers: 0
        });
        setRecentThreads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-xl p-6 shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Total Users</p>
              <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-400 text-sm font-medium">+12%</span>
            <span className="text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-xl p-6 shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Total Threads</p>
              <p className="text-3xl font-bold text-white">{stats.totalThreads}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-400 text-sm font-medium">+8%</span>
            <span className="text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-xl p-6 shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Total Replies</p>
              <p className="text-3xl font-bold text-white">{stats.totalReplies}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💭</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-400 text-sm font-medium">+15%</span>
            <span className="text-gray-400 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-xl p-6 shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Active Users</p>
              <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-400 text-sm font-medium">+5%</span>
            <span className="text-gray-400 text-sm ml-2">from yesterday</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-xl p-6 shadow-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentThreads.map((thread) => (
              <div key={thread._id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">💬</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{thread.title}</p>
                  <p className="text-xs text-gray-400">by {thread.author?.username} • {new Date(thread.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-xl p-6 shadow-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/users" className="p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-blue-400 hover:bg-white/10 transition-colors block">
              <div className="text-center">
                <span className="text-2xl block mb-2">👥</span>
                <span className="text-sm font-medium text-gray-300">Manage Users</span>
              </div>
            </Link>
            <Link to="/admin/categories" className="p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-blue-400 hover:bg-white/10 transition-colors block">
              <div className="text-center">
                <span className="text-2xl block mb-2">📁</span>
                <span className="text-sm font-medium text-gray-300">Categories</span>
              </div>
            </Link>
            <Link to="/admin/threads" className="p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-blue-400 hover:bg-white/10 transition-colors block">
              <div className="text-center">
                <span className="text-2xl block mb-2">💬</span>
                <span className="text-sm font-medium text-gray-300">Threads</span>
              </div>
            </Link>
            <button className="p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-blue-400 hover:bg-white/10 transition-colors">
              <div className="text-center">
                <span className="text-2xl block mb-2">⚙️</span>
                <span className="text-sm font-medium text-gray-300">Settings</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;