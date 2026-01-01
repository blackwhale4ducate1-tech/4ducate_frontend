import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';
import { BASE_URL } from '../../env';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [userSearch, setUserSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, statsRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/admin/analytics`),
        axios.get(`${BASE_URL}/api/admin/stats`)
      ]);

      if (analyticsRes.data.success) {
        setAnalytics(analyticsRes.data.analytics);
      }

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (page = 1, search = '') => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/users`, {
        params: { page, limit: 20, search }
      });

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers(currentPage, userSearch);
    }
  }, [activeTab, currentPage, userSearch]);

  if (loading) {
    return (
      <div className={`admin-dashboard-loading ${theme}`}>
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`admin-dashboard ${theme}`}>
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={fetchDashboardData} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={activeTab === 'leaderboard' ? 'active' : ''}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
      </div>

      {activeTab === 'overview' && analytics && (
        <div className="overview-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>Total Users</h3>
                <p className="stat-number">{analytics.overview.totalUsers}</p>
                <span className="stat-change">
                  +{analytics.overview.recentUsers} this week
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>Total Courses</h3>
                <p className="stat-number">{analytics.overview.totalCourses}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Total Enrollments</h3>
                <p className="stat-number">{analytics.overview.totalEnrollments}</p>
                <span className="stat-change">
                  +{analytics.overview.recentEnrollments} this week
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <h3>Total Challenges</h3>
                <p className="stat-number">{analytics.overview.totalChallenges}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <h3>Challenge Submissions</h3>
                <p className="stat-number">{analytics.overview.totalSubmissions}</p>
              </div>
            </div>

            {stats && (
              <>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-content">
                    <h3>Completion Rate</h3>
                    <p className="stat-number">{stats.completionRate}%</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <h3>Avg Progress</h3>
                    <p className="stat-number">{Math.round(stats.avgProgress)}%</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-content">
                    <h3>Avg Score</h3>
                    <p className="stat-number">{Math.round(stats.avgChallengeScore)}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="charts-section">
            <div className="chart-card">
              <h3>Top Courses by Enrollment</h3>
              <div className="top-courses-list">
                {analytics.topCourses && analytics.topCourses.map((course, index) => (
                  <div key={course.id} className="top-course-item">
                    <span className="rank">#{index + 1}</span>
                    <div className="course-info">
                      <h4>{course.title}</h4>
                      <p>{course.category}</p>
                    </div>
                    <span className="enrollment-count">
                      {course.enrollmentCount || 0} enrollments
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && analytics && (
        <div className="analytics-section">
          <div className="growth-charts">
            <div className="chart-card">
              <h3>User Growth (Last 30 Days)</h3>
              <div className="simple-chart">
                {analytics.userGrowth && analytics.userGrowth.length > 0 ? (
                  <div className="chart-bars">
                    {analytics.userGrowth.map((item, index) => (
                      <div key={index} className="chart-bar-container">
                        <div
                          className="chart-bar"
                          style={{ height: `${(item.count / Math.max(...analytics.userGrowth.map(i => i.count))) * 100}%` }}
                        ></div>
                        <span className="chart-label">{new Date(item.date).getDate()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>

            <div className="chart-card">
              <h3>Enrollment Growth (Last 30 Days)</h3>
              <div className="simple-chart">
                {analytics.enrollmentGrowth && analytics.enrollmentGrowth.length > 0 ? (
                  <div className="chart-bars">
                    {analytics.enrollmentGrowth.map((item, index) => (
                      <div key={index} className="chart-bar-container">
                        <div
                          className="chart-bar enrollment"
                          style={{ height: `${(item.count / Math.max(...analytics.enrollmentGrowth.map(i => i.count))) * 100}%` }}
                        ></div>
                        <span className="chart-label">{new Date(item.date).getDate()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-section">
          <div className="users-header">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Enrollments</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.roleId === 1 ? 'Admin' : 'User'}</td>
                    <td>{user.enrolledCourses ? user.enrolledCourses.length : 0}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && analytics && (
        <div className="leaderboard-section">
          <h2>Top Challenge Performers</h2>
          <div className="leaderboard-list">
            {analytics.topPerformers && analytics.topPerformers.map((performer, index) => (
              <div key={performer.id} className="leaderboard-item">
                <div className="rank-badge">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </div>
                <div className="performer-info">
                  <h4>{performer.user?.fullName || 'Unknown'}</h4>
                  <p>{performer.challenge?.title || 'Challenge'}</p>
                </div>
                <div className="performer-stats">
                  <span className="score">Score: {performer.score}</span>
                  <span className="rank">Rank: #{performer.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
