import React, { useState } from 'react';
import { Menu, Bell, User, Moon, Sun } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../admin/AuthContext';

function ProfileNav({ isMobile }) {
  const [menuHover, setMenuHover] = useState(false);
  const [bellHover, setBellHover] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const [themeHover, setThemeHover] = useState(false);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navStyles = {
    background: isDark
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    boxShadow: isDark
      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: isDark
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '16px',
    margin: '10px 20px',
    padding: '12px 24px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const titleStyles = {
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    margin: '0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const iconBaseColor = isDark ? '#94a3b8' : '#6c757d';

  const menuIconStyles = {
    cursor: 'pointer',
    color: menuHover ? '#667eea' : iconBaseColor,
    transition: 'all 0.3s ease',
    width: '24px',
    height: '24px',
    transform: menuHover ? 'translateY(-2px) rotate(5deg)' : 'translateY(0) rotate(0)',
    filter: menuHover ? 'drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3))' : 'none'
  };

  const bellIconStyles = {
    cursor: 'pointer',
    color: bellHover ? '#f59e0b' : iconBaseColor,
    transition: 'all 0.3s ease',
    width: '24px',
    height: '24px',
    transform: bellHover ? 'translateY(-2px) rotate(-10deg)' : 'translateY(0) rotate(0)',
    filter: bellHover ? 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))' : 'none'
  };

  const themeIconStyles = {
    cursor: 'pointer',
    color: themeHover ? (isDark ? '#fbbf24' : '#667eea') : iconBaseColor,
    transition: 'all 0.3s ease',
    width: '24px',
    height: '24px',
    transform: themeHover ? 'translateY(-2px) rotate(15deg)' : 'translateY(0) rotate(0)',
    filter: themeHover ? `drop-shadow(0 2px 4px ${isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(102, 126, 234, 0.3)'})` : 'none'
  };

  const profileIconStyles = {
    width: '40px',
    height: '40px',
    background: profileHover
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : isDark
        ? 'linear-gradient(135deg, #475569 0%, #334155 100%)'
        : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: profileHover
      ? '0 8px 24px rgba(102, 126, 234, 0.4)'
      : isDark
        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
        : '0 4px 12px rgba(0, 0, 0, 0.1)',
    transform: profileHover ? 'scale(1.08)' : 'scale(1)',
    border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(255, 255, 255, 0.9)'
  };

  // Mobile responsive styles
  const mobileNavStyles = {
    ...navStyles,
    padding: '10px 16px',
    margin: '8px 10px',
    borderRadius: '12px'
  };

  const mobileTitleStyles = {
    ...titleStyles,
    fontSize: '18px'
  };

  const mobileIconStyles = {
    width: '20px',
    height: '20px'
  };

  const mobileProfileIconStyles = {
    ...profileIconStyles,
    width: '34px',
    height: '34px',
    borderRadius: '10px'
  };

  // Check if screen is mobile (780px or less)
  const isMobileScreen = window.innerWidth <= 780;

  const getUserInitial = () => {
    if (user?.fullName) return user.fullName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <nav
              className="d-flex justify-content-between align-items-center"
              style={isMobileScreen ? mobileNavStyles : navStyles}
            >
              {/* Left Side */}
              <div className="d-flex align-items-center">
                {isMobileScreen && (
                  <div className="me-3">
                    <Menu
                      style={isMobileScreen ? { ...menuIconStyles, ...mobileIconStyles } : menuIconStyles}
                      onMouseEnter={() => setMenuHover(true)}
                      onMouseLeave={() => setMenuHover(false)}
                      onClick={() => navigate('/dashboard/profile')}
                    />
                  </div>
                )}
                <h2 style={isMobileScreen ? mobileTitleStyles : titleStyles}>
                  📚 4DUCATE
                </h2>
              </div>

              {/* Right Side */}
              <div className="d-flex align-items-center" style={{ gap: isMobileScreen ? '12px' : '16px' }}>
                {/* Theme Toggle */}
                <div
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    borderRadius: '10px',
                    background: themeHover
                      ? (isDark ? 'rgba(251, 191, 36, 0.15)' : 'rgba(102, 126, 234, 0.1)')
                      : 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={() => setThemeHover(true)}
                  onMouseLeave={() => setThemeHover(false)}
                  onClick={toggleTheme}
                >
                  {isDark ? (
                    <Sun style={isMobileScreen ? { ...themeIconStyles, ...mobileIconStyles } : themeIconStyles} />
                  ) : (
                    <Moon style={isMobileScreen ? { ...themeIconStyles, ...mobileIconStyles } : themeIconStyles} />
                  )}
                </div>

                {/* Notification Bell */}
                <div
                  className="position-relative"
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    borderRadius: '10px',
                    background: bellHover
                      ? 'rgba(245, 158, 11, 0.15)'
                      : 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={() => setBellHover(true)}
                  onMouseLeave={() => setBellHover(false)}
                  onClick={() => navigate('/dashboard/notifications')}
                >
                  <Bell style={isMobileScreen ? { ...bellIconStyles, ...mobileIconStyles } : bellIconStyles} />
                  {/* Notification Badge */}
                  <span
                    className="position-absolute"
                    style={{
                      top: '4px',
                      right: '4px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      color: 'white',
                      fontWeight: '600',
                      boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                      border: isDark ? '2px solid #1e293b' : '2px solid white',
                      minWidth: '18px',
                      textAlign: 'center'
                    }}
                  >
                    3
                  </span>
                </div>

                {/* Profile Icon */}
                <div
                  style={isMobileScreen ? mobileProfileIconStyles : profileIconStyles}
                  onMouseEnter={() => setProfileHover(true)}
                  onMouseLeave={() => setProfileHover(false)}
                  onClick={() => navigate('/dashboard/profile')}
                >
                  {user?.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: isMobileScreen ? '8px' : '10px'
                      }}
                    />
                  ) : (
                    <span style={{
                      fontSize: isMobileScreen ? '14px' : '16px',
                      fontWeight: '600'
                    }}>
                      {getUserInitial()}
                    </span>
                  )}
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                  zIndex: 0
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
                  borderRadius: '50%',
                  filter: 'blur(15px)',
                  zIndex: 0
                }}
              />
            </nav>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .container-fluid {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        
        .row {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        
        .col-12 {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        
        h2 {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 780px) {
          nav {
            margin: 8px 10px !important;
            padding: 10px 16px !important;
          }
        }
        
        /* Ensure icons are clickable */
        svg {
          pointer-events: auto !important;
        }
      `}</style>
    </>
  );
}

export default ProfileNav;