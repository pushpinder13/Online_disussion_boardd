import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

const QuickActions = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthRequired = (e) => {
    e.preventDefault();
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const actions = [
    {
      icon: '🚀',
      title: 'Start Discussion',
      description: 'Share your thoughts',
      link: '/create',
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      requireAuth: true
    },
    {
      icon: '📚',
      title: 'Browse Categories',
      description: 'Explore topics',
      link: '#categories',
      bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
      requireAuth: false,
      onClick: () => document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      icon: '⭐',
      title: 'My Profile',
      description: 'View your activity',
      link: '/profile',
      bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600',
      requireAuth: true
    },
    {
      icon: '📝',
      title: 'My Threads',
      description: 'Manage discussions',
      link: '/my-threads',
      bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
      requireAuth: true
    },
    {
      icon: '🔥',
      title: 'Trending',
      description: 'Hot topics',
      link: '#trending',
      bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      requireAuth: false,
      onClick: () => document.querySelector('.trending-section')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'Preferences',
      link: '/settings',
      bgColor: 'bg-gradient-to-r from-gray-500 to-slate-600',
      requireAuth: true
    }
  ];

  const visibleActions = actions;

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {visibleActions.map((action, index) => {
          if (action.onClick) {
            return (
              <button
                key={index}
                onClick={action.requireAuth && !isAuthenticated ? handleAuthRequired : action.onClick}
                className="group relative overflow-hidden bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`absolute inset-0 ${action.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                <div className="relative z-10 text-center text-white">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${action.bgColor} mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">{action.title}</h4>
                  <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">{action.description}</p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </button>
            );
          }
          
          if (action.requireAuth && !isAuthenticated) {
            return (
              <button
                key={index}
                onClick={handleAuthRequired}
                className="group relative overflow-hidden bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`absolute inset-0 ${action.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                <div className="relative z-10 text-center text-white">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${action.bgColor} mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">{action.title}</h4>
                  <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">{action.description}</p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </button>
            );
          }
          
          return (
            <Link
              key={index}
              to={action.link}
              className="group relative overflow-hidden bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`absolute inset-0 ${action.bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shine"></div>
              <div className="relative z-10 text-center text-white">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${action.bgColor} mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">{action.title}</h4>
                <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">{action.description}</p>
                <div className="mt-4 flex justify-center">
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default QuickActions;