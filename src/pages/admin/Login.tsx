import { Navigate } from 'react-router-dom';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { useAuth } from '@/contexts/AuthContext';

export function AdminLoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLogin />;
}
