import { useState, useEffect } from 'react';

const StatsCard = ({ icon, title, value, trend, color = 'blue' }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500'
  };

  return (
    <div className="group relative overflow-hidden bg-black/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${colorClasses[color]} mb-4 shadow-lg`}>
        <span className="text-white text-xl">{icon}</span>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-gray-300 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-white">
            {animatedValue.toLocaleString()}
          </span>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm ${
              trend > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              <svg className={`w-4 h-4 ${trend > 0 ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
    </div>
  );
};

export default StatsCard;