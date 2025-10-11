const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  pulse = false,
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
    dark: 'bg-gray-800 text-white',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${variants[variant]}
      ${sizes[size]}
      ${pulse ? 'animate-pulse' : ''}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;