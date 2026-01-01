import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Loading component
const LoadingSpinner = () => {
  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: theme === 'dark'
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3dfe5 100%)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid',
          borderColor: theme === 'dark' ? '#334155' : '#f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}></div>
        <p style={{
          color: '#667eea',
          fontSize: '16px',
          fontWeight: '500',
        }}>
          Loading...
        </p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

// ProtectedRoute component with role-based access control
const ProtectedRoute = ({ children, requireAdmin = false, allowedRoles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If not authenticated, redirect to appropriate login
  if (!isAuthenticated) {
    const loginPath = requireAdmin ? '/admin/login' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requireAdmin) {
    // Admin routes require roleId 1 (Admin)
    // roleId 2 is regular user and should not have admin access
    if (user?.roleId !== 1) {
      return <Navigate to="/dashboard" state={{ error: 'Access denied. Admin privileges required.' }} replace />;
    }
  }

  // Check specific allowed roles if provided
  if (allowedRoles.length > 0) {
    if (!allowedRoles.includes(user?.roleId)) {
      return <Navigate to="/dashboard" state={{ error: 'Access denied. Insufficient permissions.' }} replace />;
    }
  }

  // If authenticated and authorized, render the protected component
  return children;
};

export default ProtectedRoute;