import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import { threadsAPI } from '../api/threads';
import AuthModal from './AuthModal';
import ProfileModal from './ProfileModal.jsx';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, getTimeAgo } = useNotifications();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      try {
        const response = await threadsAPI.getAll({ search: query });
        setSearchResults(response.data.threads || response.data || []);
        setShowSearchResults(true);
      } catch (error) {
        console.error('Search failed:', error);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="glass-enhanced shadow-2xl border-b border-white/20 sticky top-0 z-40 bg-mesh backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-gradient-enhanced hover:scale-105 transition-all duration-300 flex items-center space-x-3 hover-glow group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg animate-float shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
                  <span className="animate-pulse">F</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-shadow font-black tracking-tight">ForumHub</span>
                <span className="text-xs text-blue-600 font-medium -mt-1">Community Platform</span>
              </div>
            </Link>

            <div className="hidden md:flex relative group" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search amazing discussions..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-80 px-6 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 border-white/40 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg hover:shadow-xl group-hover:w-96"
                />
                <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-200 border border-gray-300 rounded-lg">⌘K</kbd>
                </div>
              </form>
              
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                  {searchResults.slice(0, 5).map((thread) => (
                    <Link
                      key={thread._id}
                      to={`/thread/${thread._id}`}
                      onClick={() => setShowSearchResults(false)}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <h4 className="font-semibold text-gray-900 line-clamp-1">{thread.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{thread.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{thread.replies?.length || 0} replies</span>
                        <span>{thread.views || 0} views</span>
                      </div>
                    </Link>
                  ))}
                  {searchResults.length > 5 && (
                    <div className="px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          navigate(`/?search=${encodeURIComponent(searchQuery)}`);
                          setShowSearchResults(false);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View all {searchResults.length} results
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="relative" ref={notificationRef}>
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-xl transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a8.38 8.38 0 010-11.8L20 2H9.586a2 2 0 00-1.414.586L2 8.414A2 2 0 002 11.828L8.172 18A2 2 0 0011.828 18z" />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                    
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div 
                                key={notification.id}
                                onClick={() => !notification.read && markAsRead(notification.id)}
                                className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer ${
                                  !notification.read ? 'bg-blue-50/50' : ''
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`w-2 h-2 rounded-full mt-2 ${
                                    notification.color === 'blue' ? 'bg-blue-500' :
                                    notification.color === 'green' ? 'bg-green-500' :
                                    notification.color === 'purple' ? 'bg-purple-500' : 'bg-gray-500'
                                  } ${
                                    !notification.read ? 'animate-pulse' : ''
                                  }`}></div>
                                  <div className="flex-1">
                                    <p className={`text-sm font-medium ${
                                      !notification.read ? 'text-gray-900' : 'text-gray-700'
                                    }`}>
                                      {notification.title}
                                    </p>
                                    <p className="text-xs text-gray-500">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{getTimeAgo(notification.timestamp)}</p>
                                  </div>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-center text-gray-500">
                              <p className="text-sm">No notifications yet</p>
                            </div>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <div className="px-4 py-3 border-t border-gray-200">
                            <button 
                              onClick={markAllAsRead}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Mark all as read
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Link 
                    to="/create" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-2 font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="hidden sm:inline">Create</span>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-6 py-3 rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2 font-semibold overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="hidden sm:inline relative z-10">Admin</span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    </Link>
                  )}

                  <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-xl transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/60 transition-all duration-300 border-2 border-transparent hover:border-white/50 group backdrop-blur-sm"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-2xl ring-4 ring-white/30 group-hover:ring-white/50 transition-all duration-300 group-hover:scale-105">
                          {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <div className="hidden sm:block text-left">
                        <div className="text-gray-800 font-bold text-sm">{user?.username}</div>
                        <div className="text-gray-500 text-xs capitalize">{user?.role} Member</div>
                      </div>
                      <svg className={`w-5 h-5 text-gray-500 transition-all duration-300 ${showDropdown ? 'rotate-180 text-blue-600' : 'group-hover:text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showDropdown && (
                      <div className="absolute right-0 mt-3 w-52 glass-effect rounded-2xl shadow-2xl border border-white/20 py-2 z-50 animate-fade-in-up">
                        <Link
                          to="/profile"
                          onClick={() => setShowDropdown(false)}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white/50 flex items-center transition-colors duration-200 rounded-lg mx-2"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </Link>
                        <Link
                          to="/my-threads"
                          onClick={() => setShowDropdown(false)}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white/50 flex items-center transition-colors duration-200 rounded-lg mx-2"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          My Threads
                        </Link>
                        <button
                          onClick={() => {
                            setShowProfileModal(true);
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white/50 flex items-center transition-colors duration-200 rounded-lg mx-2"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Profile
                        </button>
                        <Link
                          to="/settings"
                          onClick={() => setShowDropdown(false)}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white/50 flex items-center transition-colors duration-200 rounded-lg mx-2"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </Link>
                        <div className="my-2 mx-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        <button
                          onClick={() => {
                            logout();
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50/50 flex items-center transition-colors duration-200 rounded-lg mx-2"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/50 font-medium"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => handleAuthClick('register')}
                    className="btn-primary"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
      
      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
};

export default Header;