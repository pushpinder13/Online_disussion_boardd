import { useState, useEffect } from 'react';

const ToastNotification = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          icon: '✅',
          border: 'border-green-200'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-pink-500',
          icon: '❌',
          border: 'border-red-200'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          icon: '⚠️',
          border: 'border-yellow-200'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-purple-500',
          icon: 'ℹ️',
          border: 'border-blue-200'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
    } animate-slide-in-right`}>
      <div className={`${styles.bg} text-white rounded-2xl shadow-2xl p-4 min-w-80 max-w-md border ${styles.border} backdrop-blur-sm`}>
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{styles.icon}</div>
          <div className="flex-1">
            <p className="font-medium text-white">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => {
                setIsVisible(false);
                onClose?.();
              }, 300);
            }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mt-2 bg-white/20 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-white/60 rounded-full animate-shrink"
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastNotification;