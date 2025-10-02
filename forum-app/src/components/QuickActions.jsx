import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuickActions = () => {
  const { isAuthenticated } = useAuth();

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
    <div className="glass-enhanced rounded-3xl shadow-xl p-6 border border-white/20 animate-fade-in-up">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        <span className="mr-2">⚡</span>
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {visibleActions.map((action, index) => {
          if (action.onClick) {
            return (
              <button
                key={index}
                onClick={action.onClick}
                className={`group p-4 rounded-2xl ${action.bgColor} hover:shadow-lg transition-all hover-lift animate-fade-in-up`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-center text-white">
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <h4 className="font-bold text-sm">{action.title}</h4>
                  <p className="text-xs opacity-90">{action.description}</p>
                </div>
              </button>
            );
          }
          
          return (
            <Link
              key={index}
              to={action.link}
              className={`group p-4 rounded-2xl ${action.bgColor} hover:shadow-lg transition-all hover-lift animate-fade-in-up`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="text-center text-white">
                <div className="text-3xl mb-2">{action.icon}</div>
                <h4 className="font-bold text-sm">{action.title}</h4>
                <p className="text-xs opacity-90">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;