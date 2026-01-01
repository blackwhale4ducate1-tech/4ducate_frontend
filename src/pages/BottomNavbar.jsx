import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../css/BottomNavbar.css';

function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const navItems = [
    {
      path: '/dashboard',
      icon: 'bi-house-fill',
      label: 'Home',
      isActive: location.pathname === '/dashboard'
    },
    {
      path: '/dashboard/coursecard',
      icon: 'bi-book-fill',
      label: 'Courses',
      isActive: location.pathname === '/dashboard/coursecard'
    },
    {
      path: '/dashboard/challenges',
      icon: 'bi-bullseye',
      label: 'Challenges',
      isActive: location.pathname === '/dashboard/challenges'
    },
    {
      path: '/dashboard/community',
      icon: 'bi-people-fill',
      label: 'Clans',
      isActive: location.pathname === '/dashboard/community' || location.pathname.includes('/dashboard/community/')
    },
    {
      path: '/dashboard/profile',
      icon: 'bi-person-fill',
      label: 'Profile',
      isActive: location.pathname === '/dashboard/profile'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className="bottom-navbar"
      style={{
        background: isDark
          ? 'rgba(15, 23, 42, 0.98)'
          : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isDark
          ? '0 -4px 25px rgba(0, 0, 0, 0.5)'
          : '0 -4px 25px rgba(0, 0, 0, 0.1)',
      }}
    >
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`nav-item1 ${item.isActive ? 'active' : ''}`}
          onClick={() => handleNavigation(item.path)}
          style={{
            color: item.isActive
              ? '#667eea'
              : (isDark ? '#94a3b8' : '#6c757d'),
            background: item.isActive
              ? (isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)')
              : 'transparent',
          }}
        >
          <i className={`bi ${item.icon}`}></i>
          <span className="nav-label" style={{
            color: item.isActive ? '#667eea' : 'inherit'
          }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default BottomNavbar;