import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../css/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      path: '/dashboard/leaderboard',
      icon: 'bi-trophy-fill',
      label: 'Rankings',
      isActive: location.pathname === '/dashboard/leaderboard'
    },
    {
      path: '/dashboard/community',
      icon: 'bi-people-fill',
      label: 'Clans',
      isActive: location.pathname.includes('/dashboard/community')
    },
    {
      path: '/dashboard/projects',
      icon: 'bi-folder-fill',
      label: 'Projects',
      isActive: location.pathname === '/dashboard/projects'
    },
    {
      path: '/dashboard/resources',
      icon: 'bi-journal-bookmark-fill',
      label: 'Resources',
      isActive: location.pathname === '/dashboard/resources'
    },
    {
      path: '/dashboard/certificates',
      icon: 'bi-award-fill',
      label: 'Certificates',
      isActive: location.pathname === '/dashboard/certificates'
    },
    {
      path: '/dashboard/resume',
      icon: 'bi-file-earmark-person-fill',
      label: 'Resume AI',
      isActive: location.pathname === '/dashboard/resume'
    },
    {
      path: '/dashboard/notifications',
      icon: 'bi-bell-fill',
      label: 'Notifications',
      isActive: location.pathname === '/dashboard/notifications'
    },
    {
      path: '/dashboard/profile',
      icon: 'bi-person-circle',
      label: 'Profile',
      isActive: location.pathname === '/dashboard/profile'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className={`sidebar ${isDark ? 'dark' : 'light'} ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
      </button>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${item.isActive ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
            title={isCollapsed ? item.label : ''}
          >
            <i className={`bi ${item.icon} sidebar-icon`}></i>
            <span className="sidebar-label">{item.label}</span>
            {item.isActive && <span className="active-indicator"></span>}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={`sidebar-footer ${isCollapsed ? 'hidden' : ''}`}>
        <div className="footer-logo">
          <i className="bi bi-mortarboard-fill"></i> 4DUCATE
        </div>
        <p className="footer-text">Learn. Grow. Succeed.</p>
      </div>
    </aside>
  );
}

export default Sidebar;