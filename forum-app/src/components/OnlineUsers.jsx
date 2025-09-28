import { useState, useEffect } from 'react';

const OnlineUsers = () => {
  const [onlineUsers] = useState([
    { id: 1, username: 'john_doe', avatar: 'J', status: 'online' },
    { id: 2, username: 'sarah_dev', avatar: 'S', status: 'online' },
    { id: 3, username: 'mike_admin', avatar: 'M', status: 'away' },
    { id: 4, username: 'lisa_user', avatar: 'L', status: 'online' },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="text-lg font-semibold text-gray-900">Online Now</h3>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          {onlineUsers.filter(u => u.status === 'online').length}
        </span>
      </div>
      
      <div className="space-y-3">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
              <p className="text-xs text-gray-500 capitalize">{user.status}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All Members →
        </button>
      </div>
    </div>
  );
};

export default OnlineUsers;