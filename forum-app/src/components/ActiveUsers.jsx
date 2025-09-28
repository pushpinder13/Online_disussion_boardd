import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ActiveUsers = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, just show current user if authenticated
    if (isAuthenticated && user) {
      setActiveUsers([{
        _id: user._id,
        username: user.username,
        avatar: user.username?.charAt(0).toUpperCase(),
        status: 'online',
        lastSeen: new Date()
      }]);
    } else {
      setActiveUsers([]);
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || activeUsers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="text-sm font-semibold text-gray-900">Active Now</h3>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          {activeUsers.length}
        </span>
      </div>
      
      <div className="space-y-2">
        {activeUsers.map((activeUser) => (
          <div key={activeUser._id} className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {activeUser.avatar}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">{activeUser.username}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveUsers;