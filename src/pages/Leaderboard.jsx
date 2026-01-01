import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../css/Leaderboard.css';

const Leaderboard = () => {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState('weekly');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [leaderboardData, setLeaderboardData] = useState([]);

    // Simulated leaderboard data
    const mockData = {
        weekly: [
            { rank: 1, name: 'Arun Kumar', avatar: '👨‍💻', points: 2450, streak: 15, courses: 8, badge: '🥇' },
            { rank: 2, name: 'Priya Sharma', avatar: '👩‍💻', points: 2280, streak: 12, courses: 7, badge: '🥈' },
            { rank: 3, name: 'Rahul Verma', avatar: '🧑‍💻', points: 2150, streak: 10, courses: 6, badge: '🥉' },
            { rank: 4, name: 'Sneha Patel', avatar: '👩‍🎓', points: 1980, streak: 8, courses: 5, badge: '🏅' },
            { rank: 5, name: 'Vikram Singh', avatar: '👨‍🎓', points: 1850, streak: 7, courses: 5, badge: '🏅' },
            { rank: 6, name: 'Ananya Reddy', avatar: '👩‍💼', points: 1720, streak: 6, courses: 4, badge: '⭐' },
            { rank: 7, name: 'Karthik Nair', avatar: '👨‍💼', points: 1650, streak: 5, courses: 4, badge: '⭐' },
            { rank: 8, name: 'Divya Menon', avatar: '👩‍🔬', points: 1580, streak: 5, courses: 3, badge: '⭐' },
            { rank: 9, name: 'Arjun Das', avatar: '👨‍🔬', points: 1490, streak: 4, courses: 3, badge: '⭐' },
            { rank: 10, name: 'Meera Iyer', avatar: '👩‍🏫', points: 1420, streak: 4, courses: 3, badge: '⭐' },
        ],
        monthly: [
            { rank: 1, name: 'Priya Sharma', avatar: '👩‍💻', points: 8950, streak: 28, courses: 15, badge: '🥇' },
            { rank: 2, name: 'Arun Kumar', avatar: '👨‍💻', points: 8720, streak: 25, courses: 14, badge: '🥈' },
            { rank: 3, name: 'Sneha Patel', avatar: '👩‍🎓', points: 7890, streak: 22, courses: 12, badge: '🥉' },
            { rank: 4, name: 'Rahul Verma', avatar: '🧑‍💻', points: 7650, streak: 20, courses: 11, badge: '🏅' },
            { rank: 5, name: 'Ananya Reddy', avatar: '👩‍💼', points: 7200, streak: 18, courses: 10, badge: '🏅' },
            { rank: 6, name: 'Vikram Singh', avatar: '👨‍🎓', points: 6890, streak: 16, courses: 9, badge: '⭐' },
            { rank: 7, name: 'Divya Menon', avatar: '👩‍🔬', points: 6540, streak: 15, courses: 8, badge: '⭐' },
            { rank: 8, name: 'Karthik Nair', avatar: '👨‍💼', points: 6280, streak: 14, courses: 7, badge: '⭐' },
            { rank: 9, name: 'Meera Iyer', avatar: '👩‍🏫', points: 5920, streak: 12, courses: 7, badge: '⭐' },
            { rank: 10, name: 'Arjun Das', avatar: '👨‍🔬', points: 5650, streak: 11, courses: 6, badge: '⭐' },
        ],
        allTime: [
            { rank: 1, name: 'Sneha Patel', avatar: '👩‍🎓', points: 45200, streak: 120, courses: 42, badge: '🥇' },
            { rank: 2, name: 'Arun Kumar', avatar: '👨‍💻', points: 42800, streak: 98, courses: 38, badge: '🥈' },
            { rank: 3, name: 'Priya Sharma', avatar: '👩‍💻', points: 41500, streak: 95, courses: 35, badge: '🥉' },
            { rank: 4, name: 'Vikram Singh', avatar: '👨‍🎓', points: 38900, streak: 85, courses: 32, badge: '🏅' },
            { rank: 5, name: 'Rahul Verma', avatar: '🧑‍💻', points: 36200, streak: 78, courses: 29, badge: '🏅' },
            { rank: 6, name: 'Ananya Reddy', avatar: '👩‍💼', points: 33800, streak: 72, courses: 27, badge: '⭐' },
            { rank: 7, name: 'Karthik Nair', avatar: '👨‍💼', points: 31500, streak: 65, courses: 25, badge: '⭐' },
            { rank: 8, name: 'Divya Menon', avatar: '👩‍🔬', points: 29800, streak: 60, courses: 23, badge: '⭐' },
            { rank: 9, name: 'Arjun Das', avatar: '👨‍🔬', points: 27200, streak: 55, courses: 21, badge: '⭐' },
            { rank: 10, name: 'Meera Iyer', avatar: '👩‍🏫', points: 25600, streak: 50, courses: 19, badge: '⭐' },
        ]
    };

    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLeaderboardData(mockData[activeTab]);
            setIsLoading(false);
        }, 500);
    }, [activeTab]);

    const categories = [
        { id: 'all', label: 'All Categories', icon: '📚' },
        { id: 'programming', label: 'Programming', icon: '💻' },
        { id: 'design', label: 'Design', icon: '🎨' },
        { id: 'business', label: 'Business', icon: '📈' },
        { id: 'data', label: 'Data Science', icon: '📊' },
    ];

    // Current user stats (simulated)
    const currentUser = {
        rank: 24,
        name: 'You',
        avatar: '🙋',
        points: 890,
        streak: 3,
        courses: 2,
        badge: '⭐'
    };

    const handleGoToChallenges = () => {
        navigate('/dashboard/challenges');
    };

    return (
        <div className="leaderboard-container">
            {/* Header */}
            <div className="leaderboard-header">
                <div className="header-content">
                    <h1>🏆 Leaderboard</h1>
                    <p>Compete with others and climb to the top!</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-value">10K+</span>
                        <span className="stat-label">Active Learners</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">500+</span>
                        <span className="stat-label">Courses Completed</span>
                    </div>
                </div>
            </div>

            {/* Your Rank Card */}
            <div className="your-rank-card">
                <div className="rank-info">
                    <div className="rank-avatar">{currentUser.avatar}</div>
                    <div className="rank-details">
                        <h3>Your Current Rank</h3>
                        <div className="rank-number">#{currentUser.rank}</div>
                    </div>
                </div>
                <div className="rank-stats">
                    <div className="mini-stat">
                        <span className="mini-value">{currentUser.points}</span>
                        <span className="mini-label">Points</span>
                    </div>
                    <div className="mini-stat">
                        <span className="mini-value">🔥 {currentUser.streak}</span>
                        <span className="mini-label">Day Streak</span>
                    </div>
                    <div className="mini-stat">
                        <span className="mini-value">{currentUser.courses}</span>
                        <span className="mini-label">Courses</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="leaderboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
                    onClick={() => setActiveTab('weekly')}
                >
                    📅 This Week
                </button>
                <button
                    className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
                    onClick={() => setActiveTab('monthly')}
                >
                    📆 This Month
                </button>
                <button
                    className={`tab-btn ${activeTab === 'allTime' ? 'active' : ''}`}
                    onClick={() => setActiveTab('allTime')}
                >
                    ⏳ All Time
                </button>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        {cat.icon} {cat.label}
                    </button>
                ))}
            </div>

            {/* Leaderboard Table */}
            <div className="leaderboard-table">
                {isLoading ? (
                    <div className="loading-state">
                        <div className="loader"></div>
                        <p>Loading leaderboard...</p>
                    </div>
                ) : (
                    <>
                        {/* Top 3 Podium */}
                        <div className="top-three-podium">
                            {leaderboardData.slice(0, 3).map((user, index) => (
                                <div key={user.rank} className={`podium-item rank-${index + 1}`}>
                                    <div className="podium-avatar">
                                        <span className="avatar-emoji">{user.avatar}</span>
                                        <span className="badge-emoji">{user.badge}</span>
                                    </div>
                                    <h4 className="podium-name">{user.name}</h4>
                                    <div className="podium-points">{user.points.toLocaleString()} pts</div>
                                    <div className="podium-stand">
                                        <span className="stand-rank">{user.rank}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Rest of the leaderboard */}
                        <div className="leaderboard-list">
                            {leaderboardData.slice(3).map((user) => (
                                <div key={user.rank} className="leaderboard-row">
                                    <div className="row-rank">#{user.rank}</div>
                                    <div className="row-user">
                                        <span className="user-avatar">{user.avatar}</span>
                                        <span className="user-name">{user.name}</span>
                                    </div>
                                    <div className="row-stats">
                                        <span className="stat-badge">🔥 {user.streak}</span>
                                        <span className="stat-badge">📚 {user.courses}</span>
                                    </div>
                                    <div className="row-points">{user.points.toLocaleString()} pts</div>
                                    <div className="row-badge">{user.badge}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Challenge Card */}
            <div className={`challenge-card ${isDark ? 'dark' : ''}`}>
                <div className="challenge-icon">🚀</div>
                <div className="challenge-content">
                    <h3>Weekly Challenge</h3>
                    <p>Complete 5 courses this week to earn bonus 500 points!</p>
                    <div className="challenge-progress">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '40%' }}></div>
                        </div>
                        <span>2/5 Courses</span>
                    </div>
                    <button
                        className="challenge-btn"
                        onClick={handleGoToChallenges}
                    >
                        🎯 View All Challenges
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
