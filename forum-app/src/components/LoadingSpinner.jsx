const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    white: 'border-white'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`
        ${sizeClasses[size]} 
        border-2 border-gray-200 
        ${colorClasses[color]} 
        border-t-transparent 
        rounded-full 
        animate-spin
      `} />
    </div>
  );
};

export default LoadingSpinner;