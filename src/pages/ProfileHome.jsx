import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../admin/AuthContext';
import apiClient from '../utils/apiClient';

// CourseCard component
const CourseCard = ({ title, image, progress, isDark, onContinue }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="col-lg-6 col-md-6 col-sm-12 mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? (isDark ? '0 20px 50px rgba(102, 126, 234, 0.3)' : '0 20px 50px rgba(102, 126, 234, 0.15)')
            : (isDark ? '0 8px 30px rgba(0, 0, 0, 0.4)' : '0 8px 30px rgba(0, 0, 0, 0.08)'),
          background: isDark
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={image}
            alt={title}
            style={{
              height: '180px',
              width: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#667eea',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            {progress || 0}% Complete
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <h5
            style={{
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontWeight: '700',
              fontSize: '17px',
              marginBottom: '12px',
              letterSpacing: '-0.3px'
            }}
          >
            {title}
          </h5>

          {/* Progress Bar */}
          <div
            style={{
              background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              borderRadius: '10px',
              height: '8px',
              marginBottom: '16px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                width: `${progress || 0}%`,
                height: '100%',
                borderRadius: '10px',
                transition: 'width 0.5s ease'
              }}
            />
          </div>

          <button
            onClick={onContinue}
            style={{
              width: '100%',
              background: isHovered
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)',
              color: isHovered ? 'white' : '#667eea',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isHovered ? '0 8px 24px rgba(102, 126, 234, 0.4)' : 'none'
            }}
          >
            <span>Continue Learning</span>
            <span style={{
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
            }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Quick Action Card
const QuickActionCard = ({ icon, title, description, color, onClick, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="col-lg-3 col-md-6 col-sm-6 mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={onClick}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '16px',
          padding: '24px 20px',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? `0 16px 40px ${color}40`
            : (isDark ? '0 8px 24px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.06)'),
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          height: '100%'
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <span style={{ fontSize: '24px' }}>{icon}</span>
        </div>
        <h6
          style={{
            color: isDark ? '#f1f5f9' : '#1e293b',
            fontWeight: '600',
            fontSize: '15px',
            marginBottom: '6px'
          }}
        >
          {title}
        </h6>
        <p
          style={{
            color: isDark ? '#94a3b8' : '#64748b',
            fontSize: '12px',
            margin: 0,
            lineHeight: '1.5'
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

function ProfileHome() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [lightBulbGlow, setLightBulbGlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLightBulbGlow(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await apiClient.get('/api/my-courses');
      if (response.data.success) {
        setEnrolledCourses(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  const getUserName = () => {
    if (user?.fullName) {
      // Return first name only for greeting
      const firstName = user.fullName.split(' ')[0];
      return firstName;
    }
    if (user?.email) return user.email.split('@')[0];
    return 'Learner';
  };

  const quickActions = [
    { icon: '📚', title: 'My Courses', description: 'Continue your learning journey', color: '#667eea', path: '/dashboard/coursecard' },
    { icon: '🏆', title: 'Challenges', description: 'Test your skills', color: '#f59e0b', path: '/dashboard/challenges' },
    { icon: '👥', title: 'Clans', description: 'Join a community', color: '#10b981', path: '/dashboard/community' },
    { icon: '📄', title: 'Resume AI', description: 'Analyze your resume', color: '#ec4899', path: '/dashboard/resume' },
  ];

  const sampleCourses = [
    { id: 1, title: 'Web Development Mastery', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop', progress: 65 },
    { id: 2, title: 'Game Development Basics', image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop', progress: 30 },
  ];

  const displayCourses = enrolledCourses.length > 0
    ? enrolledCourses.map(e => ({
      id: e.course?.id,
      title: e.course?.title,
      image: e.course?.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      progress: e.progress || 0
    }))
    : sampleCourses;

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

      <div
        style={{
          minHeight: '100vh',
          padding: '30px 20px'
        }}
      >
        <div className="container">
          {/* Welcome Card */}
          <div
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: isDark
                ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                : '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative backgrounds */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
                borderRadius: '50%',
                filter: 'blur(30px)'
              }}
            />

            <div className="row align-items-center position-relative">
              <div className="col-lg-8 col-md-7">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: '14px',
                      color: isDark ? '#94a3b8' : '#64748b'
                    }}
                  >
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}
                  >
                    Day Streak: 🔥 5
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: '36px',
                    fontWeight: '800',
                    marginBottom: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f472b6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-1px'
                  }}
                >
                  Hello, {getUserName()}! 👋
                </h1>
                <p
                  style={{
                    color: isDark ? '#94a3b8' : '#64748b',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    maxWidth: '500px'
                  }}
                >
                  Welcome back to your learning journey! Continue exploring and mastering new skills with our comprehensive courses.
                </p>
                <p
                  style={{
                    fontStyle: 'italic',
                    fontSize: '14px',
                    color: isDark ? '#64748b' : '#94a3b8',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>💡</span>
                  "Knowledge is the key to unlocking your potential"
                </p>
              </div>
              <div className="col-lg-4 col-md-5 text-center d-none d-md-block">
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    position: 'relative',
                    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.5s ease',
                    transform: lightBulbGlow ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <span
                    style={{
                      fontSize: '60px',
                      filter: lightBulbGlow
                        ? 'drop-shadow(0 0 20px rgba(255, 235, 59, 0.6))'
                        : 'drop-shadow(0 0 10px rgba(255, 235, 59, 0.3))',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    📖
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '10px',
                      fontSize: '28px',
                      filter: lightBulbGlow
                        ? 'drop-shadow(0 0 15px rgba(255, 235, 59, 0.8))'
                        : 'drop-shadow(0 0 5px rgba(255, 235, 59, 0.4))',
                      transition: 'all 0.5s ease',
                      transform: lightBulbGlow ? 'scale(1.1) rotate(10deg)' : 'scale(1) rotate(0deg)'
                    }}
                  >
                    💡
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row mb-4">
            <div className="col-12 mb-3">
              <h4
                style={{
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontWeight: '700',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span>⚡</span> Quick Actions
              </h4>
            </div>
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                {...action}
                isDark={isDark}
                onClick={() => navigate(action.path)}
              />
            ))}
          </div>

          {/* Your Courses Section */}
          <div className="row mb-4">
            <div className="col-12 mb-3">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4
                  style={{
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontWeight: '700',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    margin: 0
                  }}
                >
                  <span>📚</span> Your Courses
                </h4>
                <button
                  onClick={() => navigate('/dashboard/coursecard')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#667eea',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  View All <span>→</span>
                </button>
              </div>
            </div>
            {displayCourses.slice(0, 2).map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                image={course.image}
                progress={course.progress}
                isDark={isDark}
                onContinue={() => navigate(`/dashboard/coursecard`)}
              />
            ))}
          </div>

          {/* AI Banner */}
          <div
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: isDark
                ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                : '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(103, 58, 183, 0.15) 100%)',
                borderRadius: '50%',
                filter: 'blur(30px)'
              }}
            />

            <div className="row align-items-center">
              <div className="col-lg-8">
                <span
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    marginBottom: '16px',
                    display: 'inline-block',
                    letterSpacing: '0.5px'
                  }}
                >
                  🚀 COMING SOON
                </span>
                <h3
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    marginTop: '12px',
                    marginBottom: '12px',
                    background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  🤖 Build Your Own AI
                </h3>
                <p
                  style={{
                    color: isDark ? '#94a3b8' : '#64748b',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}
                >
                  Join the future of technology with our upcoming AI development course. Learn to build intelligent systems from scratch!
                </p>
                <button
                  style={{
                    background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '14px 28px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(156, 39, 176, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px) scale(1.02)';
                    e.target.style.boxShadow = '0 12px 32px rgba(156, 39, 176, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 8px 24px rgba(156, 39, 176, 0.4)';
                  }}
                >
                  Pre Register Now
                </button>
              </div>
              <div className="col-lg-4 text-center d-none d-lg-block">
                <div
                  style={{
                    fontSize: '80px',
                    filter: 'drop-shadow(0 10px 30px rgba(156, 39, 176, 0.3))'
                  }}
                >
                  🤖
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHome;