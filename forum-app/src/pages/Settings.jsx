import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext.jsx';

const Settings = () => {
  const { user } = useAuth();
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      mentions: true,
      replies: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showActivity: true
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'account', label: 'Account', icon: '⚙️' }
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-mesh">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="glass-enhanced rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-blue-100">Customize your ForumHub experience</p>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-64 bg-white/50 backdrop-blur-sm border-r border-white/20">
              <nav className="p-6 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center p-4 rounded-2xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/60'
                    }`}
                  >
                    <span className="text-xl mr-3">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-1 p-8">
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{user?.username}</h3>
                        <p className="text-gray-600">{user?.email}</p>
                        <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                          Change Avatar
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">Username</label>
                        <input
                          type="text"
                          defaultValue={user?.username}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-800 mb-2">Bio</label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about yourself..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 space-y-6">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                        <div>
                          <h3 className="font-semibold text-gray-900 capitalize">{key} Notifications</h3>
                          <p className="text-sm text-gray-600">
                            {key === 'email' && 'Receive notifications via email'}
                            {key === 'push' && 'Browser push notifications'}
                            {key === 'mentions' && 'When someone mentions you'}
                            {key === 'replies' && 'When someone replies to your posts'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 space-y-6">
                    {Object.entries(settings.privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {key === 'profileVisible' && 'Public Profile'}
                            {key === 'showEmail' && 'Show Email'}
                            {key === 'showActivity' && 'Show Activity'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {key === 'profileVisible' && 'Make your profile visible to other users'}
                            {key === 'showEmail' && 'Display your email on your profile'}
                            {key === 'showActivity' && 'Show your recent activity to others'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance Settings</h2>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {['light', 'dark', 'auto'].map((themeOption) => (
                          <button
                            key={themeOption}
                            onClick={() => setTheme(themeOption)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              theme === themeOption
                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-2xl mb-2">
                              {themeOption === 'light' && '☀️'}
                              {themeOption === 'dark' && '🌙'}
                              {themeOption === 'auto' && '🔄'}
                            </div>
                            <div className="font-medium capitalize">{themeOption}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Font Size</h3>
                      <select
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="small">Small (14px)</option>
                        <option value="medium">Medium (16px)</option>
                        <option value="large">Large (18px)</option>
                      </select>
                      <div className="mt-4 p-4 bg-white/50 rounded-xl">
                        <p className="text-gray-700">Preview: This is how your text will look with the selected font size.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                      <h3 className="font-semibold text-red-900 mb-4">Danger Zone</h3>
                      <p className="text-red-700 mb-4">Once you delete your account, there is no going back.</p>
                      <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;