import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { threadsAPI } from '../api/threads';
import ModernLoader from '../components/ModernLoader';

const Profile = () => {
  const { user } = useAuth();
  const [userThreads, setUserThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('threads');
  const [reputation] = useState(() => Math.floor(Math.random() * 100) + 50);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await threadsAPI.getAll();
        const allThreads = response.data.threads || response.data || [];
        const myThreads = allThreads.filter(thread => thread.author?._id === user?._id);
        setUserThreads(myThreads);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserData();
    }
  }, [user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <ModernLoader size="xl" text="Loading your profile..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-mesh">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="glass-enhanced rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 hover-lift animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center text-white font-bold text-4xl shadow-2xl animate-float">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold text-gradient-enhanced mb-2">{user?.username}</h1>
              <p className="text-gray-600 text-lg mb-4">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-2xl text-sm font-bold border border-blue-200">
                  🎖️ {user?.role?.toUpperCase()}
                </span>
                <span className="text-gray-500 text-sm flex items-center">
                  <span className="mr-2">📅</span>
                  Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <Link to="/create" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all hover-lift shadow-lg flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Create New Thread</span>
                </Link>
                <button className="bg-white/70 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl hover:bg-white/90 transition-all border border-white/30 hover-lift flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-enhanced rounded-2xl shadow-xl p-6 border border-white/20 hover-lift animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl animate-float">
                💬
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-1">{userThreads.length}</p>
              <p className="text-gray-600 font-medium">Discussions</p>
            </div>
          </div>

          <div className="glass-enhanced rounded-2xl shadow-xl p-6 border border-white/20 hover-lift animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl animate-float">
                💭
              </div>
              <p className="text-3xl font-bold text-green-600 mb-1">
                {userThreads.reduce((acc, thread) => acc + (thread.replies?.length || 0), 0)}
              </p>
              <p className="text-gray-600 font-medium">Replies Received</p>
            </div>
          </div>

          <div className="glass-enhanced rounded-2xl shadow-xl p-6 border border-white/20 hover-lift animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl animate-float">
                👁️
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-1">
                {userThreads.reduce((acc, thread) => acc + (thread.views || 0), 0)}
              </p>
              <p className="text-gray-600 font-medium">Total Views</p>
            </div>
          </div>

          <div className="glass-enhanced rounded-2xl shadow-xl p-6 border border-white/20 hover-lift animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl animate-float">
                🏆
              </div>
              <p className="text-3xl font-bold text-orange-600 mb-1">
                {reputation}
              </p>
              <p className="text-gray-600 font-medium">Reputation</p>
            </div>
          </div>
        </div>

        <div className="glass-enhanced rounded-3xl shadow-2xl border border-white/20 animate-fade-in-up">
          <div className="border-b border-white/20">
            <nav className="flex space-x-2 p-2">
              <button
                onClick={() => setActiveTab('threads')}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === 'threads'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                📝 My Discussions ({userThreads.length})
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === 'activity'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                ⚡ Recent Activity
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'threads' && (
              <div className="space-y-6">
                {userThreads.length > 0 ? (
                  userThreads.map((thread, index) => (
                    <Link key={thread._id} to={`/thread/${thread._id}`} className="block">
                      <div className="bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:shadow-lg transition-all hover-lift animate-fade-in-up">
                        <h3 className="font-bold text-gray-900 mb-3 text-lg hover:text-blue-600 transition-colors">{thread.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            <span className="mr-1">💬</span>
                            {thread.replies?.length || 0} replies
                          </span>
                          <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <span className="mr-1">👁️</span>
                            {thread.views || 0} views
                          </span>
                          <span className="flex items-center text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                            <span className="mr-1">📅</span>
                            {new Date(thread.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                      📝
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No discussions yet</h3>
                    <p className="text-gray-500 mb-6">Start sharing your thoughts with the community!</p>
                    <Link to="/create" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all hover-lift shadow-lg inline-flex items-center space-x-2">
                      <span>🚀</span>
                      <span>Create Your First Discussion</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Activity Timeline</h3>
                <p className="text-gray-500">Your recent activity and interactions will appear here soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;