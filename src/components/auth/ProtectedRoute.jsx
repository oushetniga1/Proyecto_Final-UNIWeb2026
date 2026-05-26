import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
}