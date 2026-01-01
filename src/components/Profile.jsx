import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../admin/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.fullName || "Guest User",
    email: user?.email || "guest@example.com",
    institution: user?.university || "Not set",
    major: user?.department || "Not set",
    year: user?.passoutYear || "Not set",
    linkedIn: user?.linkedinLink || "",
    github: user?.githubLink || "",
    bio: "Passionate about learning and growing.",
  });
  const [courseData] = useState({
    enrolled: 8,
    completed: 5,
    inProgress: 3,
  });

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    // Initialize Pie Chart
    if (pieChartRef.current) {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      pieChartInstance.current = new Chart(pieChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Completed", "In Progress", "Not Started"],
          datasets: [{
            data: [
              courseData.completed,
              courseData.inProgress,
              courseData.enrolled - courseData.completed - courseData.inProgress,
            ],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          cutout: '65%',
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: isDark ? '#94a3b8' : '#64748b',
                padding: 20,
                font: { size: 12, weight: '500' }
              }
            },
          },
        },
      });
    }

    // Initialize Bar Chart
    if (barChartRef.current) {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      barChartInstance.current = new Chart(barChartRef.current, {
        type: "bar",
        data: {
          labels: ["Enrolled", "Completed", "In Progress"],
          datasets: [{
            label: "Courses",
            data: [courseData.enrolled, courseData.completed, courseData.inProgress],
            backgroundColor: ["#667eea", "#10b981", "#f59e0b"],
            borderRadius: 8,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: isDark ? '#94a3b8' : '#64748b' }
            },
            y: {
              beginAtZero: true,
              grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
              ticks: { color: isDark ? '#94a3b8' : '#64748b' }
            },
          },
        },
      });
    }

    return () => {
      if (pieChartInstance.current) pieChartInstance.current.destroy();
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, [courseData, isDark]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Send profileData to backend
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getUserInitial = () => {
    if (user?.fullName) return user.fullName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  const recentActivities = [
    { id: 1, action: "Completed 'React Fundamentals' course", date: "2025-12-20", icon: "🎓" },
    { id: 2, action: "Started 'Node.js Mastery' course", date: "2025-12-18", icon: "📚" },
    { id: 3, action: "Earned 'JavaScript Pro' certificate", date: "2025-12-15", icon: "🏆" },
  ];

  const cardStyle = {
    background: isDark
      ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
      : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '20px',
    boxShadow: isDark
      ? '0 8px 30px rgba(0, 0, 0, 0.3)'
      : '0 8px 30px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    background: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
    color: isDark ? '#f1f5f9' : '#1e293b',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  };

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css"
        rel="stylesheet"
      />

      <div style={{ padding: '30px 20px', minHeight: '100vh' }}>
        <div className="container">
          {/* Page Header */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1
              style={{
                fontSize: '42px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px',
                letterSpacing: '-1px'
              }}
            >
              My Profile
            </h1>
            <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
              Manage your account settings and view your progress
            </p>
          </div>

          <div className="row g-4">
            {/* Left Column - Profile Card & Stats */}
            <div className="col-lg-4">
              {/* Profile Card */}
              <div style={{ ...cardStyle, padding: '32px', marginBottom: '24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '24px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      fontSize: '40px',
                      color: 'white',
                      fontWeight: '700',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                    }}
                  >
                    {getUserInitial()}
                  </div>
                  <h4 style={{
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontWeight: '700',
                    marginBottom: '4px'
                  }}>
                    {profileData.name}
                  </h4>
                  <p style={{
                    color: isDark ? '#94a3b8' : '#64748b',
                    fontSize: '14px',
                    marginBottom: '0'
                  }}>
                    {profileData.email}
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}>
                  <div style={{
                    background: isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
                      {courseData.enrolled}
                    </div>
                    <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}>
                      Enrolled
                    </div>
                  </div>
                  <div style={{
                    background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                      {courseData.completed}
                    </div>
                    <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}>
                      Completed
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div style={{ ...cardStyle, padding: '24px' }}>
                <h5 style={{
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontWeight: '700',
                  marginBottom: '20px',
                  fontSize: '16px'
                }}>
                  📊 Course Analytics
                </h5>
                <canvas ref={pieChartRef} style={{ maxHeight: '200px' }}></canvas>
                <div style={{ marginTop: '24px' }}>
                  <canvas ref={barChartRef} style={{ maxHeight: '150px' }}></canvas>
                </div>
              </div>
            </div>

            {/* Right Column - Details & Activity */}
            <div className="col-lg-8">
              {/* Profile Details */}
              <div style={{ ...cardStyle, padding: '32px', marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}>
                  <h5 style={{
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontWeight: '700',
                    margin: 0,
                    fontSize: '18px'
                  }}>
                    👤 Profile Details
                  </h5>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    style={{
                      background: isEditing
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 20px',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label style={{
                      color: isDark ? '#94a3b8' : '#64748b',
                      fontSize: '13px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      Institution
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={profileData.institution}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        ...inputStyle,
                        width: '100%',
                        opacity: isEditing ? 1 : 0.7
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={{
                      color: isDark ? '#94a3b8' : '#64748b',
                      fontSize: '13px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      Major / Field
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={profileData.major}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        ...inputStyle,
                        width: '100%',
                        opacity: isEditing ? 1 : 0.7
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={{
                      color: isDark ? '#94a3b8' : '#64748b',
                      fontSize: '13px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={profileData.linkedIn}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/..."
                      style={{
                        ...inputStyle,
                        width: '100%',
                        opacity: isEditing ? 1 : 0.7
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={{
                      color: isDark ? '#94a3b8' : '#64748b',
                      fontSize: '13px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={profileData.github}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="https://github.com/..."
                      style={{
                        ...inputStyle,
                        width: '100%',
                        opacity: isEditing ? 1 : 0.7
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <label style={{
                      color: isDark ? '#94a3b8' : '#64748b',
                      fontSize: '13px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="3"
                      style={{
                        ...inputStyle,
                        width: '100%',
                        opacity: isEditing ? 1 : 0.7,
                        resize: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ ...cardStyle, padding: '32px' }}>
                <h5 style={{
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontWeight: '700',
                  marginBottom: '20px',
                  fontSize: '18px'
                }}>
                  ⚡ Recent Activity
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{activity.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          color: isDark ? '#f1f5f9' : '#1e293b',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {activity.action}
                        </div>
                        <div style={{
                          color: isDark ? '#64748b' : '#94a3b8',
                          fontSize: '12px'
                        }}>
                          {activity.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logout Button */}
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    background: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 32px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;