import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Re-use spinner from ProtectedRoute
const LoadingSpinner = () => {
  const { theme } = useTheme();
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
      background: theme === 'dark'
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3dfe5 100%)'
    }}>
      <div style={{
        width: '50px', height: '50px', border: '4px solid',
        borderColor: theme === 'dark' ? '#334155' : '#f3f3f3',
        borderTop: '4px solid #667eea', borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`@keyframes spin { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }`}</style>
    </div>
  );
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};

export default PublicRoute;
