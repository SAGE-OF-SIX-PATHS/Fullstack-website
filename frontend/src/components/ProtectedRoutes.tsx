import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './ui/LoadingSpinner';

interface ProtectedRouteProps {
          children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
          const { isAuthenticated, loading } = useAuth();

          // Show loading spinner while checking authentication
          if (loading) {
                    return (
                              <div className="flex justify-center items-center h-screen">
                                        <LoadingSpinner size="large" />
                              </div>
                    );
          }

          // Redirect to login if not authenticated
          if (!isAuthenticated) {
                    return <Navigate to="/login" replace />;
          }

          // Render children if authenticated
          return <>{children}</>;
};

export default ProtectedRoute;