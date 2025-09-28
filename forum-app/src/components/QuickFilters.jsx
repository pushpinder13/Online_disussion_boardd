import { useState } from 'react';

const QuickFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { key: 'hasReplies', label: 'Has Replies', icon: '💬' },
    { key: 'noReplies', label: 'No Replies', icon: '🔇' },
    { key: 'recent', label: 'Last 24h', icon: '🕐' },
    { key: 'popular', label: 'Popular', icon: '🔥' },
    { key: 'pinned', label: 'Pinned', icon: '📌' },
  ];

  const handleFilterToggle = (filterKey) => {
    const newFilters = { ...activeFilters };
    if (newFilters[filterKey]) {
      delete newFilters[filterKey];
    } else {
      newFilters[filterKey] = true;
    }
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-3"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
        </svg>
        <span className="font-medium">Quick Filters</span>
        <svg className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showFilters && (
        <div className="flex flex-wrap gap-2 animate-fade-in-up">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterToggle(filter.key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                activeFilters[filter.key]
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-white/70 text-gray-600 hover:bg-white/90 border border-gray-200'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          ))}
          {Object.keys(activeFilters).length > 0 && (
            <button
              onClick={() => onFilterChange({})}
              className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-all"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickFilters;