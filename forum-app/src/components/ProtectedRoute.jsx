import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to home');
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    console.log('User not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('User authenticated:', user);
  return children;
};

export default ProtectedRoute;