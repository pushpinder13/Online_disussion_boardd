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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <HeroSection stats={stats} />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {searchQuery && (
          <div className="mb-8">
            <div className="glass-enhanced rounded-3xl shadow-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                Found {allThreads?.length || 0} discussions matching your search
              </p>
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <QuickActions />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <TrendingSection threads={allThreads} />
          </div>
          <div>
            <LiveActivity />
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
            <div className="glass-enhanced rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {categories.find(c => c._id === selectedCategory)?.name || 'Category'} Discussions
                </h2>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-white/50 transition-all"
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
                      <div className="bg-white/50 rounded-2xl p-6 hover:bg-white/70 transition-all animate-fade-in-up hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                        <h3 className="font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">{thread.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{thread.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{thread.replies?.length || 0} replies</span>
                          <span>{thread.views || 0} views</span>
                          <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No discussions in this category yet</h3>
                  <p className="text-gray-500 mb-6">Be the first to start a discussion in {categories.find(c => c._id === selectedCategory)?.name || 'this category'}!</p>
                  <Link to="/create" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center space-x-2">
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
  );
};

export default Home;