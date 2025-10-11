import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useThreads } from '../hooks/useThreads';
import { useCategories } from '../hooks/useCategories';
import HeroSection from '../components/HeroSection';
import TrendingSection from '../components/TrendingSection';
import LiveActivity from '../components/LiveActivity';
import CategoryShowcase from '../components/CategoryShowcase';
import QuickActions from '../components/QuickActions';
import VoteSystem from '../components/VoteSystem';
import AdvancedSearch from '../components/AdvancedSearch';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchFilters, setSearchFilters] = useState({});
  const [searchInput, setSearchInput] = useState(searchQuery || '');
  
  const { threads: allThreads, loading: threadsLoading } = useThreads({
    ...(selectedCategory && { category: selectedCategory }),
    ...(searchQuery && { search: searchQuery })
  });
  const { categories, refetch: refetchCategories } = useCategories();

  const handleCategoryCreated = () => {
    refetchCategories();
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleTagClick = (tag) => {
    setSearchInput(tag);
    handleSearch(tag);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchInput);
    }
  };

  const stats = {
    discussions: allThreads?.length || 0,
    categories: categories?.length || 0,
    replies: allThreads?.reduce((acc, t) => acc + (t.replies?.length || 0), 0) || 0,
    views: allThreads?.reduce((acc, t) => acc + (t.views || 0), 0) || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-5 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-5 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-float-slow" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-float-slow" style={{animationDelay: '6s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>
      
      <div className="relative z-10">
        <HeroSection stats={stats} />
        
        {/* Main content container with better spacing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
          {/* Quick Actions - Redesigned */}
          <section className="relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 animate-gradient-text">
                Quick Actions
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Jump into conversations, explore topics, or manage your profile
              </p>
            </div>
            <QuickActions />
          </section>
          
          {/* Enhanced Search Section */}
          <section className="relative">
            <div className="bg-gradient-to-r from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-4xl shadow-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Discover Conversations</h3>
                <p className="text-gray-300">Search through thousands of discussions and find your community</p>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="flex-1 relative group w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search discussions, users, topics, tags..."
                    className="relative w-full px-8 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg backdrop-blur-sm"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <kbd className="px-3 py-1 text-xs font-semibold text-gray-400 bg-white/10 border border-white/20 rounded-lg">⌘K</kbd>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAdvancedSearch(true)}
                    className="group px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition-all duration-300 font-semibold flex items-center space-x-3 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    <span>Advanced</span>
                  </button>
                  
                  <button 
                    onClick={() => handleSearch('trending')}
                    className="px-8 py-5 bg-white/10 border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all duration-300 font-semibold backdrop-blur-sm"
                  >
                    🎯 Trending
                  </button>
                </div>
              </div>
              
              {/* Popular search tags */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {['Technology', 'Gaming', 'Science', 'Sports', 'Music', 'Art', 'Programming', 'AI'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-full hover:bg-white/10 hover:text-white transition-all duration-200 text-sm cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </section>
        
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
        
          {/* Main Content Grid - Redesigned */}
          <section className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main content area */}
            <div className="xl:col-span-3 space-y-8">
              {/* Trending Section */}
              <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="p-8 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🔥</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Trending Discussions</h3>
                        <p className="text-gray-300">Most active conversations right now</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all text-sm">
                        Today
                      </button>
                      <button className="px-4 py-2 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-all text-sm">
                        Week
                      </button>
                    </div>
                  </div>
                </div>
                <TrendingSection threads={allThreads} />
              </div>
              
              {/* Categories Section */}
              <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="p-8 border-b border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Explore Categories</h3>
                      <p className="text-gray-300">Find discussions by topic</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <CategoryShowcase 
                    categories={categories} 
                    onCategorySelect={setSelectedCategory}
                    onCategoryCreated={handleCategoryCreated}
                  />
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Live Activity */}
              <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-lg">⚡</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Live Activity</h4>
                      <p className="text-gray-300 text-sm">Real-time updates</p>
                    </div>
                  </div>
                </div>
                <LiveActivity />
              </div>
              
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-500">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <span className="text-xl">📊</span>
                  <span>Community Stats</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Online Users</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">1,247</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">New Today</span>
                    <span className="text-white font-semibold">+89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Active Threads</span>
                    <span className="text-white font-semibold">342</span>
                  </div>
                </div>
              </div>
              
              {/* Featured Users */}
              <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-500">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <span className="text-xl">⭐</span>
                  <span>Top Contributors</span>
                </h4>
                <div className="space-y-3">
                  {['Alice Johnson', 'Bob Smith', 'Carol Davis'].map((name, index) => (
                    <div key={name} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                        'bg-gradient-to-r from-orange-400 to-red-500'
                      }`}>
                        {name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{name}</div>
                        <div className="text-gray-400 text-xs">{150 - index * 20} posts</div>
                      </div>
                      <div className="text-xs text-gray-400">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>



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
                    <div key={thread._id} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all animate-fade-in-up hover-lift overflow-hidden" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex">
                        <div className="p-4">
                          <VoteSystem 
                            threadId={thread._id}
                            initialUpvotes={thread.upvotes || Math.floor(Math.random() * 50)}
                            initialDownvotes={thread.downvotes || Math.floor(Math.random() * 10)}
                          />
                        </div>
                        <Link to={`/thread/${thread._id}`} className="flex-1 p-6 hover:bg-white/5 transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-white text-lg hover:text-blue-400 transition-colors line-clamp-2">{thread.title}</h3>
                            <div className="flex items-center space-x-2 ml-4">
                              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                                {categories.find(c => c._id === thread.category)?.name || 'General'}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">{thread.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6 text-sm text-gray-400">
                              <span className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                  {thread.author?.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span>{thread.author?.username || 'Anonymous'}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>{thread.replies?.length || 0}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{thread.views || 0}</span>
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(thread.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
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
        
        <AdvancedSearch 
          isOpen={showAdvancedSearch}
          onClose={() => setShowAdvancedSearch(false)}
          onSearch={(filters) => {
            setSearchFilters(filters);
            console.log('Search with filters:', filters);
          }}
        />
      </div>
    </div>
  );
};

export default Home;