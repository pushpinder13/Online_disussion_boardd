import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Threads', path: '/admin/threads', icon: '💬' },
    { name: 'Categories', path: '/admin/categories', icon: '📁' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-mesh flex flex-col lg:flex-row">
      <div className="w-full lg:w-72 glass-enhanced shadow-2xl border-r border-white/20 backdrop-blur-xl">
        <div className="p-8 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-2xl animate-float">
              <span className="animate-pulse">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-enhanced">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-600">Control Center</p>
            </div>
          </div>
        </div>

        <nav className="p-6 space-y-3 flex lg:flex-col overflow-x-auto lg:overflow-x-visible">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-4 rounded-2xl transition-all duration-300 whitespace-nowrap group hover-lift animate-fade-in-up ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white/60 backdrop-blur-sm hover:bg-white/80 text-gray-700 hover:text-gray-900 border border-white/30'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <span className={`text-2xl mr-4 transition-transform duration-300 ${
                location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'
              }`}>{item.icon}</span>
              <span className="font-bold">{item.name}</span>
              {location.pathname === item.path && (
                <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block absolute bottom-6 left-6 right-6">
          <Link
            to="/"
            className="flex items-center p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 group"
          >
            <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">🏠</span>
            <span className="font-bold">Back to Forum</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="glass-enhanced shadow-2xl border-b border-white/20 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gradient-enhanced mb-1">Admin Dashboard</h2>
              <p className="text-gray-600">Manage your community with powerful tools</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-bold text-gray-800">{user?.username}</div>
                    <div className="text-sm text-gray-600">Administrator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;