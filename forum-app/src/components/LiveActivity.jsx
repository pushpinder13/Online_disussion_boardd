import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LiveActivity = () => {
  const [activities, setActivities] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(12);

  useEffect(() => {
    // Simulate live activity feed
    const generateActivity = () => {
      const activityTypes = [
        { type: 'new_thread', icon: '💬', color: 'blue' },
        { type: 'new_reply', icon: '💭', color: 'green' },
        { type: 'user_joined', icon: '👋', color: 'purple' },
        { type: 'thread_liked', icon: '❤️', color: 'red' }
      ];

      const users = ['Alex', 'Sarah', 'Mike', 'Emma', 'John', 'Lisa', 'David', 'Anna'];
      const topics = ['React Tips', 'JavaScript Tricks', 'Web Design', 'Career Advice', 'Tech News'];

      const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const topic = topics[Math.floor(Math.random() * topics.length)];

      let message = '';
      switch (activity.type) {
        case 'new_thread':
          message = `${user} started a new discussion about "${topic}"`;
          break;
        case 'new_reply':
          message = `${user} replied to "${topic}"`;
          break;
        case 'user_joined':
          message = `${user} joined the community`;
          break;
        case 'thread_liked':
          message = `${user} liked "${topic}"`;
          break;
      }

      return {
        id: Date.now() + Math.random(),
        ...activity,
        message,
        timestamp: new Date(),
        user
      };
    };

    // Add initial activities
    const initialActivities = Array.from({ length: 5 }, generateActivity);
    setActivities(initialActivities);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      
      // Randomly update online users count
      if (Math.random() > 0.7) {
        setOnlineUsers(prev => Math.max(5, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="glass-enhanced rounded-3xl shadow-xl p-6 border border-white/20 sticky top-24 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Live Activity
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          {onlineUsers} online
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              activity.color === 'blue' ? 'bg-blue-100' :
              activity.color === 'green' ? 'bg-green-100' :
              activity.color === 'purple' ? 'bg-purple-100' : 'bg-red-100'
            }`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 line-clamp-2">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {getTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3">
            <div className="text-lg font-bold text-blue-600">24/7</div>
            <div className="text-xs text-gray-600">Active Community</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
            <div className="text-lg font-bold text-green-600">Fast</div>
            <div className="text-xs text-gray-600">Response Time</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link 
          to="/create"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
        >
          <span>🚀</span>
          <span>Join the Conversation</span>
        </Link>
      </div>
    </div>
  );
};

export default LiveActivity;