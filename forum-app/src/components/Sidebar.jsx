import ActiveUsers from './ActiveUsers';

const Sidebar = ({ categories, selectedCategory, onCategorySelect, loading }) => {
  return (
    <aside className="w-full lg:w-80 glass-effect rounded-3xl shadow-xl p-6 h-fit lg:sticky lg:top-28 border border-white/20">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Categories</h2>
      </div>
      
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 h-12 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <button
            onClick={() => onCategorySelect(null)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
              !selectedCategory 
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-2 border-blue-200 shadow-sm' 
                : 'hover:bg-white/50 border-2 border-transparent hover:border-white/30'
            }`}
          >
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 mr-3 group-hover:scale-110 transition-transform"></div>
              <span className="font-semibold">All Categories</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
          
          {categories.filter(cat => cat.isActive !== false).map((category, index) => (
            <button
              key={category._id}
              onClick={() => onCategorySelect(category._id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 group animate-fade-in-up ${
                selectedCategory === category._id 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-2 border-blue-200 shadow-sm' 
                  : 'hover:bg-white/50 border-2 border-transparent hover:border-white/30'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3 group-hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: category.color || '#6B7280' }}
                ></div>
                <span className="font-semibold">{category.name}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-900">Stats</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <span className="text-gray-700 text-xs">Categories</span>
            <span className="font-bold text-blue-600 text-sm">{categories.length}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <span className="text-gray-700 text-xs">Active</span>
            <span className="font-bold text-green-600 text-sm">{categories.filter(cat => cat.isActive !== false).length}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <ActiveUsers />
      </div>
    </aside>
  );
};

export default Sidebar;