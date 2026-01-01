import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/AdminNavigation.css';

const AdminNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: 'bi-speedometer2',
      description: 'Overview & Analytics'
    },
    {
      title: 'Model Manager',
      path: '/admin/manage',
      icon: 'bi-database-fill',
      description: 'Manage All Models'
    },
    {
      title: 'Users',
      path: '/admin/manage/UserDetails',
      icon: 'bi-people-fill',
      description: 'User Management'
    },
    {
      title: 'Courses',
      path: '/admin/manage/Course',
      icon: 'bi-book-fill',
      description: 'Course Management'
    },
    {
      title: 'Challenges',
      path: '/admin/manage/Challenge',
      icon: 'bi-trophy-fill',
      description: 'Challenge Management'
    },
    {
      title: 'Communities',
      path: '/admin/manage/Community',
      icon: 'bi-chat-dots-fill',
      description: 'Community Management'
    },
    {
      title: 'Internships',
      path: '/admin/manage/InternPosition',
      icon: 'bi-briefcase-fill',
      description: 'Internship Postings'
    },
    {
      title: 'Enrollments',
      path: '/admin/manage/EnrolledCourse',
      icon: 'bi-person-check-fill',
      description: 'Course Enrollments'
    },
    {
      title: 'Reports',
      path: '/admin/reports',
      icon: 'bi-file-earmark-bar-graph-fill',
      description: 'Analytics & Reports'
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: 'bi-gear-fill',
      description: 'System Settings'
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/admin/login');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  const sidebarVariants = {
    open: { width: '280px' },
    closed: { width: '80px' }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        className={`admin-navigation ${theme} desktop-nav`}
        initial={false}
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="admin-nav-header">
          <div className="admin-brand">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="brand-content"
              >
                <i className="bi bi-shield-check brand-icon"></i>
                <div className="brand-text">
                  <h2>Admin Panel</h2>
                  <p>4DUCATE</p>
                </div>
              </motion.div>
            )}
            {!isSidebarOpen && (
              <i className="bi bi-shield-check brand-icon-small"></i>
            )}
          </div>
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            title={isSidebarOpen ? 'Collapse' : 'Expand'}
          >
            <i className={`bi ${isSidebarOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
          </button>
        </div>

        <div className="admin-user-info">
          <div className="user-avatar">
            <img
              src={user?.profilePhoto || 'https://via.placeholder.com/50'}
              alt={user?.fullName}
            />
            <span className="user-status"></span>
          </div>
          {isSidebarOpen && (
            <motion.div
              className="user-details"
              variants={itemVariants}
              initial="closed"
              animate="open"
            >
              <h4>{user?.fullName || 'Admin'}</h4>
              <p>{user?.roleId === 1 ? 'Super Admin' : 'Admin'}</p>
            </motion.div>
          )}
        </div>

        <div className="admin-nav-menu">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              title={!isSidebarOpen ? item.title : ''}
            >
              <i className={`bi ${item.icon}`}></i>
              {isSidebarOpen && (
                <motion.div
                  className="nav-item-content"
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                >
                  <span className="nav-title">{item.title}</span>
                  <span className="nav-description">{item.description}</span>
                </motion.div>
              )}
              {isActive(item.path) && <div className="active-indicator"></div>}
            </Link>
          ))}
        </div>

        <div className="admin-nav-footer">
          <button
            className="nav-item theme-toggle"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
            {isSidebarOpen && (
              <motion.span
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </motion.span>
            )}
          </button>

          <button
            className="nav-item logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <i className="bi bi-box-arrow-right"></i>
            {isSidebarOpen && (
              <motion.span
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <div className={`admin-mobile-topbar ${theme}`}>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className="bi bi-list"></i>
        </button>
        <div className="mobile-brand">
          <i className="bi bi-shield-check"></i>
          <span>Admin Panel</span>
        </div>
        <button className="mobile-theme-toggle" onClick={toggleTheme}>
          <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            <motion.div
              className={`admin-mobile-menu ${theme}`}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mobile-menu-header">
                <div className="mobile-user-info">
                  <img
                    src={user?.profilePhoto || 'https://via.placeholder.com/50'}
                    alt={user?.fullName}
                  />
                  <div>
                    <h4>{user?.fullName || 'Admin'}</h4>
                    <p>{user?.roleId === 1 ? 'Super Admin' : 'Admin'}</p>
                  </div>
                </div>
                <button onClick={toggleMobileMenu}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <div className="mobile-menu-items">
                {navigationItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <div>
                      <span className="nav-title">{item.title}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mobile-menu-footer">
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminNavigation;
