import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Determine if current route is a dashboard route
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveTab("home");
    } else if (path.startsWith("/dashboard")) {
      // Extract the last segment of dashboard sub-routes
      const segments = path.split("/");
      const lastSegment = segments[segments.length - 1] || "dashboard";
      setActiveTab(lastSegment);
    } else {
      setActiveTab(path.substring(1));
    }
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Enhanced styles with animations
  const navbarStyles = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 -4px 25px rgba(0, 0, 0, 0.1)',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    zIndex: 1050,
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const containerStyles = {
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    padding: '0 20px'
  };

  const navListStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '12px 0',
    margin: 0,
    listStyle: 'none',
    width: '100%'
  };

  const navItemStyles = {
    textAlign: 'center',
    flex: '1 1 0',
    position: 'relative'
  };

  const navLinkStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 8px',
    textDecoration: 'none',
    color: '#1a1a1a',
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transform: 'translateY(0)',
  };

  const activeLinkStyles = {
    ...navLinkStyles,
    color: '#000',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  };

  const iconStyles = {
    fontSize: '20px',
    display: 'block',
    marginBottom: '4px',
    color: '#1a1a1a',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(1)',
  };

  const activeIconStyles = {
    ...iconStyles,
    color: '#000',
    transform: 'scale(1.1)',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
  };

  const textStyles = {
    fontSize: '10px',
    fontWeight: '500',
    display: 'none',
    transition: 'all 0.3s ease',
    opacity: 0.8,
  };

  const activeTextStyles = {
    ...textStyles,
    fontWeight: '600',
    opacity: 1,
  };

  const buttonStyles = {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '1.4',
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'middle',
    cursor: 'pointer',
    userSelect: 'none',
    border: '1px solid transparent',
    borderRadius: '8px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    margin: '0 3px',
    position: 'relative',
    overflow: 'hidden',
  };

  const primaryButtonStyles = {
    ...buttonStyles,
    color: '#fff',
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
    boxShadow: '0 2px 8px rgba(26, 26, 26, 0.2)',
  };

  const outlineButtonStyles = {
    ...buttonStyles,
    color: '#1a1a1a',
    backgroundColor: 'transparent',
    borderColor: '#1a1a1a',
  };

  const mobileMenuStyles = {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '200px',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    opacity: showMobileMenu ? 1 : 0,
    visibility: showMobileMenu ? 'visible' : 'hidden',
    transform: showMobileMenu ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(10px) scale(0.95)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const mobileButtonStyles = {
    ...buttonStyles,
    width: '100%',
    justifyContent: 'center',
  };

  // Navigation items with Bootstrap Icons
  const navItems = isDashboardRoute
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2', path: '/dashboard' },
        { id: 'challenges', label: 'Challenges', icon: 'bi-trophy-fill', path: '/dashboard/challenges' },
        { id: 'community', label: 'Community', icon: 'bi-people-fill', path: '/dashboard/community' },
        { id: 'coursecard', label: 'Courses', icon: 'bi-book-fill', path: '/dashboard/coursecard' },
        { id: 'intern', label: 'Intern', icon: 'bi-briefcase-fill', path: '/dashboard/intern' },
        { id: 'resources', label: 'Resources', icon: 'bi-folder-fill', path: '/dashboard/resources' },
        { id: 'projects', label: 'Projects', icon: 'bi-tools', path: '/dashboard/projects' },
        { id: 'certificates', label: 'Certificates', icon: 'bi-award-fill', path: '/dashboard/certificates' },
      ]
    : [
        { id: 'home', label: 'Home', icon: 'bi-house-fill', path: '/' },
        { id: 'courses', label: 'Courses', icon: 'bi-book-fill', path: '/courses' },
        { id: 'certificate', label: 'Verify', icon: 'bi-patch-check-fill', path: '/certificate' },
        { id: 'who', label: 'Who We Are', icon: 'bi-info-circle-fill', path: '/who' },
        { id: 'reach', label: 'Reach', icon: 'bi-envelope-fill', path: '/reach' },
      ];

  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            40%, 43% {
              transform: translate3d(0, -8px, 0) scale(1.05);
            }
            70% {
              transform: translate3d(0, -4px, 0) scale(1.02);
            }
            90% {
              transform: translate3d(0, -2px, 0) scale(1.01);
            }
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(26, 26, 26, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(26, 26, 26, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(26, 26, 26, 0);
            }
          }

          .nav-link:hover {
            transform: translateY(-3px) !important;
            background-color: rgba(0, 0, 0, 0.04) !important;
          }

          .nav-link:hover .nav-icon {
            transform: scale(1.15) !important;
            animation: bounce 0.6s ease !important;
          }

          .nav-link:active {
            transform: translateY(-1px) !important;
          }

          .nav-link.active::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            background-color: #1a1a1a;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          .btn-primary:hover {
            transform: translateY(-2px) !important;
            boxShadow: 0 6px 20px rgba(26, 26, 26, 0.3) !important;
            background-color: #000 !important;
          }

          .btn-outline:hover {
            background-color: #1a1a1a !important;
            color: #fff !important;
            transform: translateY(-2px) !important;
            boxShadow: 0 4px 15px rgba(26, 26, 26, 0.2) !important;
          }

          .mobile-menu-btn:hover {
            transform: rotate(90deg) !important;
          }

          @media (min-width: 768px) {
            .navbar-text-show { 
              display: inline !important; 
            }
            .navbar-desktop-show { 
              display: flex !important; 
            }
            .navbar-mobile-hide { 
              display: none !important; 
            }
          }
          
          @media (max-width: 767px) {
            .navbar-text-show { 
              display: none !important; 
            }
            .navbar-desktop-show { 
              display: none !important; 
            }
            .navbar-mobile-hide { 
              display: block !important; 
            }
          }
        `}
      </style>
      <nav style={navbarStyles}>
        <div style={containerStyles}>
          <ul style={navListStyles}>
            {/* Dynamic Navigation Items */}
            {navItems.map((item) => (
              <li key={item.id} style={navItemStyles}>
                <Link
                  to={item.path}
                  className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                  style={activeTab === item.id ? activeLinkStyles : navLinkStyles}
                  onClick={() => handleTabClick(item.id)}
                >
                  <i 
                    className={`bi ${item.icon} nav-icon`}
                    style={activeTab === item.id ? activeIconStyles : iconStyles}
                  />
                  <span 
                    className="navbar-text-show" 
                    style={activeTab === item.id ? activeTextStyles : textStyles}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}

            {/* Login / Join Now - Desktop View (Hidden on Dashboard Routes) */}
            {!isDashboardRoute && (
              <li style={navItemStyles} className="navbar-desktop-show">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', paddingTop: '4px' }}>
                  <button
                    className="btn-outline"
                    style={outlineButtonStyles}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="btn-primary"
                    style={primaryButtonStyles}
                    onClick={() => navigate("/register")}
                  >
                    Join Now
                  </button>
                </div>
              </li>
            )}

            {/* Mobile Menu Toggle Button (Hidden on Dashboard Routes) */}
            {!isDashboardRoute && (
              <li style={navItemStyles} className="navbar-mobile-hide">
                <button
                  className="mobile-menu-btn"
                  style={{
                    ...navLinkStyles, 
                    padding: '12px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onClick={toggleMobileMenu}
                  aria-expanded={showMobileMenu}
                >
                  <i className={`bi ${showMobileMenu ? 'bi-x-lg' : 'bi-three-dots'}`} style={{
                    fontSize: '18px',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }} />
                </button>

                {/* Enhanced Mobile Menu */}
                <div style={mobileMenuStyles}>
                  <button
                    className="btn-outline"
                    style={{...mobileButtonStyles, ...outlineButtonStyles}}
                    onClick={() => {
                      navigate("/login");
                      setShowMobileMenu(false);
                    }}
                  >
                    <i className="bi bi-lock-fill" style={{ marginRight: '8px' }} />
                    Login
                  </button>
                  <button
                    className="btn-primary"
                    style={{...mobileButtonStyles, ...primaryButtonStyles}}
                    onClick={() => {
                      navigate("/register");
                      setShowMobileMenu(false);
                    }}
                  >
                    <i className="bi bi-rocket-takeoff-fill" style={{ marginRight: '8px' }} />
                    Join Now
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
      
      {/* Body padding to prevent content overlap */}
      {/* <div style={{ paddingBottom: '80px' }}></div> */}
    </>
  );
};

export default Navbar;