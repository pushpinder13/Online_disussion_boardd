import { useState } from 'react';

const ModernCard = ({ children, className = '', hover = true, glow = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/10
        ${hover ? 'transition-all duration-300 hover:border-white/20 hover:shadow-2xl' : ''}
        ${glow && isHovered ? 'shadow-2xl shadow-blue-500/20' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50" />
      
      {/* Glow effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine effect on hover */}
      {hover && (
        <div className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
          transform -skew-x-12 -translate-x-full
          ${isHovered ? 'animate-shine' : ''}
        `} />
      )}
    </div>
  );
};

export default ModernCard;