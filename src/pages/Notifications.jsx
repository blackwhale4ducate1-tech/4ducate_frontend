import React, { useState } from 'react';
import '../css/Notifications.css';
import { useTheme } from '../contexts/ThemeContext';

const Notifications = () => {
    const { isDark } = useTheme();
    const [activeFilter, setActiveFilter] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'achievement',
            icon: '🏆',
            title: 'Achievement Unlocked!',
            message: 'You completed your first course! Keep up the great work.',
            time: '2 minutes ago',
            read: false,
            action: 'View Achievement'
        },
        {
            id: 2,
            type: 'course',
            icon: '📚',
            title: 'New Course Available',
            message: 'Advanced React Patterns course is now available. Start learning today!',
            time: '1 hour ago',
            read: false,
            action: 'Enroll Now'
        },
        {
            id: 3,
            type: 'community',
            icon: '👥',
            title: 'New Clan Invite',
            message: 'You have been invited to join "Code Masters" clan by Arun Kumar.',
            time: '3 hours ago',
            read: false,
            action: 'View Invite'
        },
        {
            id: 4,
            type: 'reminder',
            icon: '⏰',
            title: 'Learning Reminder',
            message: "Don't break your streak! You're on a 5-day learning streak.",
            time: '5 hours ago',
            read: true,
            action: 'Continue Learning'
        },
        {
            id: 5,
            type: 'challenge',
            icon: '🎯',
            title: 'Challenge Started',
            message: 'Weekly coding challenge has started. Participate to earn extra points!',
            time: '1 day ago',
            read: true,
            action: 'Join Challenge'
        },
        {
            id: 6,
            type: 'system',
            icon: '🔔',
            title: 'Profile Updated',
            message: 'Your profile information has been successfully updated.',
            time: '2 days ago',
            read: true,
            action: null
        },
        {
            id: 7,
            type: 'achievement',
            icon: '⭐',
            title: 'New Badge Earned',
            message: 'You earned the "Quick Learner" badge for completing 5 lessons in one day!',
            time: '3 days ago',
            read: true,
            action: 'View Badge'
        },
        {
            id: 8,
            type: 'course',
            icon: '✅',
            title: 'Course Progress',
            message: 'Great progress! You\'re 80% through the JavaScript Fundamentals course.',
            time: '4 days ago',
            read: true,
            action: 'Continue Course'
        },
    ]);

    const filterTypes = [
        { id: 'all', label: 'All', icon: '📬' },
        { id: 'achievement', label: 'Achievements', icon: '🏆' },
        { id: 'course', label: 'Courses', icon: '📚' },
        { id: 'community', label: 'Community', icon: '👥' },
        { id: 'reminder', label: 'Reminders', icon: '⏰' },
        { id: 'challenge', label: 'Challenges', icon: '🎯' },
    ];

    const filteredNotifications = activeFilter === 'all'
        ? notifications
        : notifications.filter(n => n.type === activeFilter);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const getTypeColor = (type) => {
        const colors = {
            achievement: 'linear-gradient(135deg, #f59e0b, #d97706)',
            course: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            community: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            reminder: 'linear-gradient(135deg, #10b981, #059669)',
            challenge: 'linear-gradient(135deg, #ef4444, #dc2626)',
            system: 'linear-gradient(135deg, #6b7280, #4b5563)',
        };
        return colors[type] || colors.system;
    };

    return (
        <div className={`notifications-container ${isDark ? 'dark' : 'light'}`}>
            {/* Header */}
            <div className="notifications-header">
                <div className="header-left">
                    <h1>🔔 Notifications</h1>
                    {unreadCount > 0 && (
                        <span className="unread-badge">{unreadCount} new</span>
                    )}
                </div>
                <div className="header-actions">
                    {unreadCount > 0 && (
                        <button className="action-btn" onClick={markAllAsRead}>
                            ✓ Mark all as read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button className="action-btn danger" onClick={clearAll}>
                            🗑️ Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs">
                {filterTypes.map((filter) => (
                    <button
                        key={filter.id}
                        className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter.id)}
                    >
                        {filter.icon} {filter.label}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div className="notifications-list">
                {filteredNotifications.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>No notifications</h3>
                        <p>You're all caught up! Check back later for updates.</p>
                    </div>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-card ${notification.read ? '' : 'unread'}`}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div
                                className="notification-icon"
                                style={{ background: getTypeColor(notification.type) }}
                            >
                                {notification.icon}
                            </div>
                            <div className="notification-content">
                                <div className="notification-header-row">
                                    <h4>{notification.title}</h4>
                                    <span className="notification-time">{notification.time}</span>
                                </div>
                                <p className="notification-message">{notification.message}</p>
                                {notification.action && (
                                    <button className="notification-action">
                                        {notification.action} →
                                    </button>
                                )}
                            </div>
                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                }}
                            >
                                ✕
                            </button>
                            {!notification.read && <div className="unread-indicator"></div>}
                        </div>
                    ))
                )}
            </div>

            {/* Notification Settings Card */}
            <div className="settings-card">
                <div className="settings-icon">⚙️</div>
                <div className="settings-content">
                    <h3>Notification Preferences</h3>
                    <p>Customize what notifications you receive and how you receive them.</p>
                </div>
                <button className="settings-btn">
                    Manage Settings
                </button>
            </div>
        </div>
    );
};

export default Notifications;
