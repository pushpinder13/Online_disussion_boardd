import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TrendingSection = ({ threads = [] }) => {
  const [activeTab, setActiveTab] = useState('trending');
  
  const getTrendingThreads = () => {
    return threads
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 6);
  };

  const getRecentThreads = () => {
    return threads
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  };

  const getPopularThreads = () => {
    return threads
      .sort((a, b) => (b.replies?.length || 0) - (a.replies?.length || 0))
      .slice(0, 6);
  };

  const getThreadsByTab = () => {
    switch (activeTab) {
      case 'trending': return getTrendingThreads();
      case 'recent': return getRecentThreads();
      case 'popular': return getPopularThreads();
      default: return getTrendingThreads();
    }
  };

  const tabs = [
    { id: 'trending', label: '🔥 Trending', icon: '📈' },
    { id: 'recent', label: '⚡ Recent', icon: '🕒' },
    { id: 'popular', label: '💬 Popular', icon: '👥' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="text-3xl mr-3">🌟</span>
          Discover Amazing Content
        </h2>
      </div>

      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-2xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getThreadsByTab().map((thread, index) => (
          <Link
            key={thread._id}
            to={`/thread/${thread._id}`}
            className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                  {thread.title}
                </h3>
                <div className="ml-2 flex-shrink-0">
                  {activeTab === 'trending' && (
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-medium">
                      🔥 Hot
                    </div>
                  )}
                  {activeTab === 'recent' && (
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded-lg text-xs font-medium">
                      ⚡ New
                    </div>
                  )}
                  {activeTab === 'popular' && (
                    <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded-lg text-xs font-medium">
                      💬 Active
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {thread.content?.substring(0, 100)}...
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  {thread.replies?.length || 0}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {thread.views || 0}
                </span>
              </div>
              <div className="text-xs">
                {new Date(thread.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                {thread.author?.username?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-600">by {thread.author?.username}</span>
            </div>
          </Link>
        ))}
      </div>

      {getThreadsByTab().length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No content yet</h3>
          <p className="text-gray-500">Be the first to create amazing discussions!</p>
        </div>
      )}
    </div>
  );
};

export default TrendingSection;