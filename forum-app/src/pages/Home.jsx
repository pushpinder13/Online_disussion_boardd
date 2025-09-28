import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useThreads } from '../hooks/useThreads';
import { useCategories } from '../hooks/useCategories';
import ThreadCard from '../components/ThreadCard';
import Sidebar from '../components/Sidebar';

import SearchBar from '../components/SearchBar';
import QuickFilters from '../components/QuickFilters';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [quickFilters, setQuickFilters] = useState({});
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  
  const { threads: allThreads, loading: threadsLoading } = useThreads({
    sortBy,
    ...(selectedCategory && { category: selectedCategory }),
    ...(searchTerm && { search: searchTerm })
  });

  // Apply quick filters
  const threads = allThreads?.filter(thread => {
    if (quickFilters.hasReplies && (!thread.replies || thread.replies.length === 0)) return false;
    if (quickFilters.noReplies && thread.replies && thread.replies.length > 0) return false;
    if (quickFilters.recent) {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      if (new Date(thread.createdAt) < oneDayAgo) return false;
    }
    if (quickFilters.pinned && !thread.isPinned) return false;
    return true;
  }) || [];
  
  const { categories, loading: categoriesLoading } = useCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">
            Welcome to ForumHub
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Join the conversation, share ideas, and connect with like-minded people
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="text-2xl font-bold text-blue-600">{allThreads?.length || 0}</div>
              <div className="text-sm text-gray-600">Discussions</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="text-2xl font-bold text-green-600">{categories?.length || 0}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="text-2xl font-bold text-purple-600">
                {allThreads?.reduce((acc, t) => acc + (t.replies?.length || 0), 0) || 0}
              </div>
              <div className="text-sm text-gray-600">Replies</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div className="text-2xl font-bold text-orange-600">
                {allThreads?.reduce((acc, t) => acc + (t.views || 0), 0) || 0}
              </div>
              <div className="text-sm text-gray-600">Views</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link 
              to="/create" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Start Discussion</span>
            </Link>
            <button 
              onClick={() => setShowCategoriesModal(true)}
              className="bg-white/70 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl hover:bg-white/90 transition-all flex items-center space-x-2 border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l2 2-2 2M5 7l2 2-2 2" />
              </svg>
              <span>Explore Topics</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:hidden mb-4">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="hidden lg:block">
            <Sidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              loading={categoriesLoading}
            />
          </div>
          
          <main className="flex-1 min-w-0">
            {!selectedCategory && allThreads?.length > 0 && (
              <div className="glass-effect rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <span className="text-2xl mr-2">⭐</span>
                    Featured Discussions
                  </h2>
                  <button 
                    onClick={() => {
                      setSortBy('popular');
                      document.querySelector('#main-discussions')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allThreads.slice(0, 4).map((thread) => (
                    <Link 
                      key={thread._id} 
                      to={`/thread/${thread._id}`}
                      className="bg-white/50 backdrop-blur-sm rounded-xl p-4 hover:bg-white/70 transition-all border border-white/30 group"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {thread.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="glass-effect rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border border-white/20">
              <div id="main-discussions" className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {selectedCategory ? 'Category Discussions' : 'Latest Discussions'}
                  </h2>
                  <p className="text-gray-600">
                    {selectedCategory ? 'Explore discussions in this category' : 'Discover trending topics and join the conversation'}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm font-medium"
                    >
                      <option value="recent">🕒 Most Recent</option>
                      <option value="popular">🔥 Most Popular</option>
                      <option value="views">👁️ Most Viewed</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <SearchBar onSearch={setSearchTerm} />
              </div>
              
              <QuickFilters 
                onFilterChange={setQuickFilters}
                activeFilters={quickFilters}
              />

              {threadsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 h-32 rounded-2xl"></div>
                    </div>
                  ))}
                </div>
              ) : threads.length > 0 ? (
                <div className="space-y-5">
                  {threads.map((thread, index) => (
                    <div key={thread._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <ThreadCard thread={thread} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <div className="text-4xl">💬</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No discussions yet</h3>
                  <p className="text-gray-500 mb-6">Be the first to start a conversation!</p>
                  <Link to="/create" className="btn-primary inline-flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Start Discussion</span>
                  </Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {showCategoriesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-96 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Explore Categories</h2>
                <button 
                  onClick={() => setShowCategoriesModal(false)}
                  className="text-white/80 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-80">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => {
                      setSelectedCategory(category._id);
                      setShowCategoriesModal(false);
                    }}
                    className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color || '#6B7280' }}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.description || 'No description'}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;