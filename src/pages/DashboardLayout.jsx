import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ProfileNav from './ProfileNav';
import BottomNavbar from './BottomNavbar';
import Sidebar from './Sidebar';
import '../css/DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    const { isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 780);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className={`dashboard-wrapper ${isDark ? 'dark' : 'light'}`}
            style={{
                minHeight: '100vh',
                background: isDark
                    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
                    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)',
            }}
        >
            {/* Fixed Header for all Dashboard Pages */}
            <header className="dashboard-header">
                <ProfileNav isMobile={isMobile} />
            </header>

            {/* Sidebar for Desktop Navigation */}
            {!isMobile && <Sidebar />}

            {/* Scrollable Main Content Area */}
            <main className={`dashboard-main-content ${!isMobile ? 'with-sidebar' : ''}`}>
                <div className="content-wrapper">
                    {children}
                </div>
            </main>

            {/* Bottom Navigation for Mobile */}
            <BottomNavbar />
        </div>
    );
};

export default DashboardLayout;
