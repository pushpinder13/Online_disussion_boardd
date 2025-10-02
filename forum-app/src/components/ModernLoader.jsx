const ModernLoader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200`}></div>
        <div className={`${sizeClasses[size]} rounded-full border-4 border-blue-500 border-t-transparent animate-spin absolute top-0 left-0`}></div>
        <div className={`${sizeClasses[size]} rounded-full border-4 border-purple-500 border-t-transparent animate-spin absolute top-0 left-0`} style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
      </div>
      
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        <span className="text-gray-600 font-medium ml-2">{text}</span>
      </div>
    </div>
  );
};

export default ModernLoader;