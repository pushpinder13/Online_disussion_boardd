import { useState } from 'react';
import { categoriesAPI } from '../api/categories';

const CreateCategoryModal = ({ isOpen, onClose, onCategoryCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', 
    '#EF4444', '#EC4899', '#6366F1', '#14B8A6'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await categoriesAPI.create(formData);
      onCategoryCreated();
      onClose();
      setFormData({ name: '', description: '', color: '#3B82F6' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-enhanced rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-bounce-in">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <span className="mr-2">🏷️</span>
              Create New Category
            </h2>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Category Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Technology, Sports, Gaming..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of this category..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Color Theme
            </label>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({...formData, color})}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? '⏳ Creating...' : '🚀 Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;