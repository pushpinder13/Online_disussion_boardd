import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateCategoryModal from './CreateCategoryModal';
import { useAuth } from '../context/AuthContext';

const CategoryShowcase = ({ categories = [], onCategorySelect, onCategoryCreated }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [categoryIconMap, setCategoryIconMap] = useState({});
  const { isAuthenticated, user } = useAuth();

  const categoryIcons = {
    'Technology': '💻',
    'Science': '🔬',
    'Sports': '⚽',
    'Entertainment': '🎬',
    'Gaming': '🎮',
    'Music': '🎵',
    'Art': '🎨',
    'Food': '🍕',
    'Travel': '✈️',
    'Health': '💪',
    'Education': '📚',
    'Business': '💼'
  };

  const defaultIcons = ['🌟', '🚀', '💡', '🎯', '🔥', '⭐', '💫', '🌈'];

  const getCategoryIcon = (categoryName, categoryId) => {
    if (categoryIcons[categoryName]) {
      return categoryIcons[categoryName];
    }
    
    if (!categoryIconMap[categoryId]) {
      const iconIndex = categoryId.charCodeAt(categoryId.length - 1) % defaultIcons.length;
      setCategoryIconMap(prev => ({
        ...prev,
        [categoryId]: defaultIcons[iconIndex]
      }));
      return defaultIcons[iconIndex];
    }
    
    return categoryIconMap[categoryId];
  };

  return (
    <div id="categories" className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-3xl shadow-xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
          <span className="text-3xl mr-3">🎯</span>
          Explore Categories
        </h2>
        <p className="text-gray-300">Find your perfect discussion topic</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <button
            key={category._id}
            onClick={() => onCategorySelect(category._id)}
            onMouseEnter={() => setHoveredCategory(category._id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-white/10 hover:border-blue-400/50 animate-fade-in-up ${index >= 8 ? 'category-hidden hidden' : ''}`}
            style={{ animationDelay: `${(index % 8) * 0.1}s` }}
          >
            <div className="text-center">
              <div className={`text-4xl mb-3 transition-transform duration-300 ${
                hoveredCategory === category._id ? 'scale-110' : ''
              }`}>
                {getCategoryIcon(category.name, category._id)}
              </div>
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                {category.description || 'Join the discussion'}
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  {(category._id.charCodeAt(category._id.length - 1) % 45) + 5}
                </span>
                <span>•</span>
                <span>Active</span>
              </div>
            </div>

            {hoveredCategory === category._id && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border-2 border-blue-400/50 animate-fade-in-up"></div>
            )}
          </button>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-white mb-2">No categories yet</h3>
          <p className="text-gray-300">Categories will appear here once created</p>
        </div>
      )}
      
      {categories.length > 8 && (
        <div className="text-center mt-6">
          <button 
            onClick={() => {
              const hiddenCategories = document.querySelectorAll('.category-hidden');
              hiddenCategories.forEach(cat => cat.classList.remove('category-hidden'));
              document.querySelector('.view-all-btn').style.display = 'none';
            }}
            className="view-all-btn text-blue-400 hover:text-blue-300 font-medium"
          >
            View All {categories.length} Categories →
          </button>
        </div>
      )}

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="font-semibold text-white mb-2">Can't find your topic?</h3>
          <p className="text-gray-300 text-sm mb-4">
            Start a new discussion or create a new category!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/create"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <span>💡</span>
              <span>Start Discussion</span>
            </Link>
            {user?.role === 'admin' && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                <span>🏷️</span>
                <span>Create Category</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <CreateCategoryModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCategoryCreated={onCategoryCreated}
      />
    </div>
  );
};

export default CategoryShowcase;