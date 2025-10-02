import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useThreads } from '../hooks/useThreads';
import { useCategories } from '../hooks/useCategories';
import HeroSection from '../components/HeroSection';
import TrendingSection from '../components/TrendingSection';
import LiveActivity from '../components/LiveActivity';
import CategoryShowcase from '../components/CategoryShowcase';
import QuickActions from '../components/QuickActions';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  const { threads: allThreads, loading: threadsLoading } = useThreads({
    ...(selectedCategory && { category: selectedCategory }),
    ...(searchQuery && { search: searchQuery })
  });
  const { categories, refetch: refetchCategories } = useCategories();

  const handleCategoryCreated = () => {
    refetchCategories();
  };

  const stats = {
    discussions: allThreads?.length || 0,
    categories: categories?.length || 0,
    replies: allThreads?.reduce((acc, t) => acc + (t.replies?.length || 0), 0) || 0,
    views: allThreads?.reduce((acc, t) => acc + (t.views || 0), 0) || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="relative z-10">
        <HeroSection stats={stats} />
        <div className="max-w-7xl mx-auto px-4 py-12">
        
        <div className="mb-8">
          <QuickActions />
        </div>
        
        {searchQuery && (
          <div className="mb-8">
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🔍</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Search Results for "{searchQuery}"
                </h2>
              </div>
              <p className="text-gray-300">
                Found {allThreads?.length || 0} discussions matching your search
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              <TrendingSection threads={allThreads} />
            </div>
          </div>
          <div>
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              <LiveActivity />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <CategoryShowcase 
            categories={categories} 
            onCategorySelect={setSelectedCategory}
            onCategoryCreated={handleCategoryCreated}
          />
        </div>

        {selectedCategory && (
          <div className="mb-12">
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {categories.find(c => c._id === selectedCategory)?.name || 'Category'} Discussions
                </h2>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all border border-white/20"
                >
                  ✕ Clear Filter
                </button>
              </div>
              
              {threadsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-4">Loading threads...</p>
                </div>
              ) : allThreads?.length > 0 ? (
                <div className="space-y-4">
                  {allThreads.map((thread, index) => (
                    <Link key={thread._id} to={`/thread/${thread._id}`} className="block">
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all animate-fade-in-up hover-lift border border-white/10 hover:border-white/20" style={{animationDelay: `${index * 0.1}s`}}>
                        <h3 className="font-bold text-white mb-2 hover:text-blue-400 transition-colors">{thread.title}</h3>
                        <p className="text-gray-300 mb-4 line-clamp-2">{thread.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>{thread.replies?.length || 0} replies</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>👁️</span>
                            <span>{thread.views || 0} views</span>
                          </span>
                          <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 animate-bounce">📭</div>
                  <h3 className="text-xl font-bold text-white mb-2">No discussions in this category yet</h3>
                  <p className="text-gray-300 mb-6">Be the first to start a discussion in {categories.find(c => c._id === selectedCategory)?.name || 'this category'}!</p>
                  <Link to="/create" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center space-x-2 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105">
                    <span>🚀</span>
                    <span>Create Discussion</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;