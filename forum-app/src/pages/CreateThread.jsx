import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { threadsAPI } from '../api/threads';

const CreateThread = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      setLoading(false);
      return;
    }
    if (!formData.category) {
      setError('Category is required');
      setLoading(false);
      return;
    }

    try {
      console.log('Creating thread with data:', formData);
      const response = await threadsAPI.create(formData);
      console.log('Thread created successfully:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Thread creation error:', err);
      if (err.response?.status === 401) {
        setError('Please log in again to create threads');
      } else if (err.response?.data?.errors) {
        setError(err.response.data.errors.map(e => e.msg).join(', '));
      } else {
        setError(err.response?.data?.message || 'Failed to create thread');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-mesh">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass-enhanced rounded-3xl shadow-2xl p-8 border border-white/20 hover-lift animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 animate-float">
              ✍️
            </div>
            <h1 className="text-3xl font-bold text-gradient-enhanced mb-2">Create New Discussion</h1>
            <p className="text-gray-600">Share your thoughts and start meaningful conversations</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl text-red-700 animate-bounce-in">
              <div className="flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📝</span>
                Title
              </label>
              <input
                type="text"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/70 backdrop-blur-sm hover:bg-white/90"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="What's on your mind? Share an engaging title..."
                required
              />
            </div>

            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">🎯</span>
                Category
              </label>
              <select
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/70 backdrop-blur-sm hover:bg-white/90"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Choose the perfect category...</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">💭</span>
                Content
              </label>
              <textarea
                rows={12}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none bg-white/70 backdrop-blur-sm hover:bg-white/90"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Share your thoughts, ideas, questions, or insights... Make it engaging and helpful for the community!"
                required
              />
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <span className="mr-1">💡</span>
                Tip: Use clear formatting and be descriptive to get better responses
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/90 transition-all hover-lift bg-white/70 backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all hover-lift shadow-lg flex items-center space-x-2"
              >
                <span>{loading ? '⏳' : '🚀'}</span>
                <span>{loading ? 'Creating Amazing Content...' : 'Create Discussion'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateThread;