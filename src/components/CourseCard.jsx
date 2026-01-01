import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../admin/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { BASE_URL } from '../../env';
import apiClient from '../utils/apiClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faGraduationCap,
  faClock,
  faCertificate,
  faTrophy,
  faSearch,
  faThLarge,
  faBookmark,
  faCheckCircle,
  faStar,
  faExclamationTriangle,
  faRefresh,
  faPlayCircle,
} from '@fortawesome/free-solid-svg-icons';

// Error Boundary Component
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-danger fa-3x mb-3"
            />
            <h4 className="text-dark mb-3">Something went wrong</h4>
            <p className="text-muted mb-4">
              An unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
            </p>
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
                <summary className="text-muted">Error Details</summary>
                <p>{this.state.error && this.state.error.toString()}</p>
                <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const CourseCard = ({ course, enrolledCourses, onEnrollmentChange }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Provide default values for course properties
  const safeCourse = {
    id: course.id || '',
    title: course.title || 'Untitled Course',
    description: course.description || 'No description available',
    level: course.level || 'Intermediate',
    thumbnailUrl:
      course.thumbnailUrl ||
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: course.price || 0,
    discount: course.discount || 0,
    duration: course.duration || '0',
    instructorName: course.instructorName || 'Unknown Instructor',
    tags: course.tags || '',
    category: course.category || 'General',
    certification: course.certification || false,
  };

  // Find enrollment data for this course
  const enrollmentData = enrolledCourses.find(
    (enrolled) => enrolled.courseId === safeCourse.id
  );
  const isEnrolled = !!enrollmentData;
  const progress = enrollmentData ? enrollmentData.progressPercent || 0 : 0;

  const levelColors = {
    Beginner: { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' },
    Intermediate: { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
    Advanced: { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' },
  };

  const progressColor = progress >= 80 ? '#10b981' : progress >= 50 ? '#f59e0b' : '#3b82f6';

  const handleEnrollment = async () => {
    if (!user) {
      alert('Please login to enroll in courses');
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: Include cookies
        body: JSON.stringify({
          courseId: safeCourse.id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log('Enrollment successful:', result);
        alert(`Successfully enrolled in ${safeCourse.title}!`);
        onEnrollmentChange();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert(error.message || 'Failed to enroll in course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (duration) => {
    const hours = parseInt(duration) || 0;
    if (hours >= 60) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return days > 0 ? `${days}d ${remainingHours}h` : `${remainingHours}h`;
    }
    return `${hours}h`;
  };

  const getLastAccessed = () => {
    if (!enrollmentData || !enrollmentData.updatedAt) return null;
    const updatedAt = new Date(enrollmentData.updatedAt);
    const now = new Date();
    const diffHours = Math.floor((now - updatedAt) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 mb-4">
      <div
        className="card h-100 border-0 position-relative overflow-hidden"
        style={{
          borderRadius: '16px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? (isDark ? '0 25px 50px rgba(102,126,234,0.4)' : '0 25px 50px rgba(0,0,0,0.15)')
            : (isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.08)'),
          background: isDark
            ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          backdropFilter: 'blur(10px)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Course Image with Overlay */}
        <div className="position-relative" style={{ height: '220px', overflow: 'hidden' }}>
          <img
            src={safeCourse.thumbnailUrl}
            className="card-img-top"
            alt="Course preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />

          {/* Gradient Overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
              opacity: isHovered ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
            }}
          ></div>

          {/* Level Badge */}
          <span
            className="badge position-absolute top-0 end-0 m-3 px-3 py-2"
            style={{
              backgroundColor: levelColors[safeCourse.level]
                ? levelColors[safeCourse.level].bg
                : levelColors['Intermediate'].bg,
              color: levelColors[safeCourse.level]
                ? levelColors[safeCourse.level].text
                : levelColors['Intermediate'].text,
              border: `1px solid ${levelColors[safeCourse.level]
                  ? levelColors[safeCourse.level].border
                  : levelColors['Intermediate'].border
                }`,
              fontSize: '12px',
              fontWeight: '600',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
            }}
          >
            {safeCourse.level}
          </span>

          {/* Price Badge */}
          {safeCourse.price > 0 && (
            <span
              className="badge position-absolute top-0 start-0 m-3 px-3 py-2"
              style={{
                backgroundColor: safeCourse.discount > 0 ? '#ef4444' : '#3b82f6',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
              }}
            >
              {safeCourse.discount > 0 ? (
                <>
                  <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>
                    ${safeCourse.price}
                  </span>{' '}
                  ${Math.round(safeCourse.price * (1 - safeCourse.discount / 100))}
                </>
              ) : (
                `$${safeCourse.price}`
              )}
            </span>
          )}

          {/* Progress Indicator */}
          {isEnrolled && (
            <div className="position-absolute bottom-0 start-0 w-100 p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-white fw-semibold" style={{ fontSize: '13px' }}>
                  Progress: {progress}%
                </span>
                <span className="text-white opacity-75" style={{ fontSize: '12px' }}>
                  {formatDuration(safeCourse.duration)}
                </span>
              </div>
              <div
                className="progress"
                style={{
                  height: '6px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                }}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: progressColor,
                    borderRadius: '10px',
                    transition: 'width 0.5s ease',
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Play Button Overlay */}
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center text-white"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <FontAwesomeIcon icon={faPlay} style={{ fontSize: '20px', marginLeft: '3px' }} />
            </div>
          </div>
        </div>

        <div className="card-body d-flex flex-column p-4">
          {/* Course Title */}
          <h5
            className="card-title mb-3"
            style={{
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontWeight: '700',
              fontSize: '18px',
              lineHeight: '1.4',
              letterSpacing: '-0.02em',
            }}
          >
            {safeCourse.title}
          </h5>

          {/* Course Description */}
          <p className="text-muted mb-3" style={{ fontSize: '14px', lineHeight: '1.5' }}>
            {safeCourse.description.substring(0, 100) + '...'}
          </p>

          {/* Instructor Info */}
          <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '12px',
              }}
            >
              {safeCourse.instructorName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
                {safeCourse.instructorName}
              </div>
              <div className="text-muted" style={{ fontSize: '12px' }}>
                Lead Instructor
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-3">
            {safeCourse.tags ? (
              safeCourse.tags
                .split(',')
                .slice(0, 3)
                .map((tag, index) => (
                  <span
                    key={index}
                    className="badge me-2 mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
                      color: '#0277bd',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      border: '1px solid #81d4fa',
                    }}
                  >
                    {tag.trim()}
                  </span>
                ))
            ) : (
              <span
                className="badge me-2 mb-1"
                style={{
                  background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
                  color: '#0277bd',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #81d4fa',
                }}
              >
                {safeCourse.category}
              </span>
            )}
          </div>

          {/* Category and Last Accessed */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <span className="badge bg-light text-dark me-2" style={{ fontSize: '12px' }}>
                {safeCourse.category}
              </span>
              {safeCourse.certification && (
                <FontAwesomeIcon
                  icon={faCertificate}
                  className="text-warning"
                  title="Certification Available"
                />
              )}
            </div>
            {isEnrolled && getLastAccessed() && (
              <div className="text-muted" style={{ fontSize: '12px' }}>
                Last: {getLastAccessed()}
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            className="btn mt-auto fw-bold text-uppercase border-0"
            style={{
              background: isEnrolled
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '13px',
              letterSpacing: '0.5px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isEnrolled
                ? '0 4px 14px rgba(16, 185, 129, 0.4)'
                : '0 4px 14px rgba(59, 130, 246, 0.4)',
            }}
            onClick={handleEnrollment}
            disabled={isLoading || isEnrolled}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  style={{ width: '1rem', height: '1rem' }}
                ></span>
                Enrolling...
              </>
            ) : isEnrolled ? (
              <>
                <FontAwesomeIcon icon={faPlayCircle} className="me-2" />
                Continue Learning
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faBookmark} className="me-2" />
                Start Course
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    level: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    duration: PropTypes.string,
    instructorName: PropTypes.string,
    tags: PropTypes.string,
    category: PropTypes.string,
    certification: PropTypes.bool,
  }).isRequired,
  enrolledCourses: PropTypes.arrayOf(
    PropTypes.shape({
      courseId: PropTypes.string,
      userId: PropTypes.string,
      progressPercent: PropTypes.number,
      courseFinished: PropTypes.bool,
      updatedAt: PropTypes.string,
    })
  ).isRequired,
  onEnrollmentChange: PropTypes.func.isRequired,
};

const UserProfile = ({ user }) => (
  <div className="d-flex align-items-center">
    <div
      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
      style={{
        width: '45px',
        height: '45px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: '16px',
      }}
    >
      {user && user.fullName ? user.fullName.split(' ').map((n) => n[0]).join('') : 'U'}
    </div>
    <div>
      <div className="fw-bold text-dark" style={{ fontSize: '16px' }}>
        {user ? user.fullName : 'Guest User'}
      </div>
      <div className="text-muted" style={{ fontSize: '13px' }}>
        Student • Learning Path
      </div>
    </div>
  </div>
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    id: PropTypes.string,
    token: PropTypes.string,
  }),
};

const StatCard = ({ icon, value, label, color, change }) => {
  const { isDark } = useTheme();

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div
        className="card border-0 h-100"
        style={{
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '50px',
                height: '50px',
                background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`,
                color: color,
              }}
            >
              <FontAwesomeIcon icon={icon} className="fa-lg" />
            </div>
            {change !== undefined && (
              <span
                className="badge px-2 py-1"
                style={{
                  backgroundColor: change > 0 ? '#dcfce7' : '#fee2e2',
                  color: change > 0 ? '#166534' : '#991b1b',
                  fontSize: '11px',
                  borderRadius: '12px',
                }}
              >
                {change > 0 ? '+' : ''}{change}%
              </span>
            )}
          </div>
          <h3 className="fw-bold mb-1" style={{ color: isDark ? '#f1f5f9' : '#1e293b', fontSize: '24px' }}>
            {value}
          </h3>
          <p className="text-muted mb-0" style={{ fontSize: '14px', fontWeight: '500' }}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  change: PropTypes.number,
};

const CourseDashboard = () => {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!BASE_URL) {
      console.error('BASE_URL is not defined');
      setError('Configuration error: API URL is not defined');
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/getModelData/Course`);
        if (response.ok) {
          const result = await response.json();
          const coursesData = Array.isArray(result.data) ? result.data : result || [];
          setCourses(coursesData);
        } else {
          throw new Error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolledCourses = async () => {
      if (!user) {
        console.warn('User not available, skipping enrolled courses fetch');
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}/api/my-courses`, {
          credentials: 'include', // Include cookies for authentication
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.enrollments)) {
            setEnrolledCourses(result.enrollments);
          } else {
            setEnrolledCourses([]);
          }
        } else {
          console.error('Failed to fetch enrolled courses');
          setEnrolledCourses([]);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        setError('Failed to load enrolled courses');
      }
    };

    fetchCourses();
    if (isAuthenticated && user?.id) {
      fetchEnrolledCourses();
    }
    setIsLoaded(true);
  }, [isAuthenticated, user?.id]);

  const handleEnrollmentChange = () => {
    if (!BASE_URL) {
      console.error('BASE_URL is not defined');
      setError('Configuration error: API URL is not defined');
      return;
    }
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/getModelData/Course`);
        if (response.ok) {
          const result = await response.json();
          const coursesData = Array.isArray(result.data) ? result.data : result || [];
          setCourses(coursesData);
        } else {
          throw new Error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolledCourses = async () => {
      if (!user) {
        console.warn('User not available, skipping enrolled courses fetch');
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}/api/my-courses`, {
          credentials: 'include', // Include cookies for authentication
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.enrollments)) {
            setEnrolledCourses(result.enrollments);
          } else {
            setEnrolledCourses([]);
          }
        } else {
          console.error('Failed to fetch enrolled courses');
          setEnrolledCourses([]);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        setError('Failed to load enrolled courses');
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
  };

  const stats = [
    {
      icon: faGraduationCap,
      value: enrolledCourses.length.toString(),
      label: 'Courses Enrolled',
      color: '#3b82f6',
      change: 15,
    },
    {
      icon: faClock,
      value: `${enrolledCourses.reduce((total, course) => {
        const courseData = courses.find((c) => c.id === course.courseId);
        return total + (courseData ? parseInt(courseData.duration) || 0 : 0);
      }, 0)}h`,
      label: 'Hours Learned',
      color: '#10b981',
      change: 23,
    },
    {
      icon: faCertificate,
      value: enrolledCourses.filter((course) => course.courseFinished).length.toString(),
      label: 'Certificates Earned',
      color: '#f59e0b',
      change: 12,
    },
    {
      icon: faTrophy,
      value: `${enrolledCourses.length > 0
          ? Math.round(
            enrolledCourses.reduce((sum, course) => sum + (course.progressPercent || 0), 0) /
            enrolledCourses.length
          )
          : 0
        }%`,
      label: 'Average Progress',
      color: '#ef4444',
      change: 8,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const safeTitle = course.title || '';
    const safeDescription = course.description || '';
    const safeCategory = course.category || '';

    const matchesSearch =
      safeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      safeDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      safeCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const isEnrolled = enrolledCourses.some((enrolled) => enrolled.courseId === course.id);
    const isCompleted = enrolledCourses.some(
      (enrolled) => enrolled.courseId === course.id && enrolled.courseFinished
    );

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'enrolled' && isEnrolled) ||
      (activeFilter === 'completed' && isCompleted) ||
      (activeFilter === 'recommended' && !isEnrolled);

    return matchesSearch && matchesFilter;
  });

  const filters = [
    { key: 'all', label: 'All Courses', icon: faThLarge, count: courses.length },
    {
      key: 'enrolled',
      label: 'My Courses',
      icon: faBookmark,
      count: enrolledCourses.length,
    },
    {
      key: 'completed',
      label: 'Completed',
      icon: faCheckCircle,
      count: enrolledCourses.filter((c) => c.courseFinished).length,
    },
    {
      key: 'recommended',
      label: 'Recommended',
      icon: faStar,
      count: courses.filter((course) => !enrolledCourses.some((enrolled) => enrolled.courseId === course.id))
        .length,
    },
  ];

  if (loading && courses.length === 0) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning fa-3x mb-3" />
          <h4 className="text-muted mb-3">Failed to Load Courses</h4>
          <p className="text-muted mb-4">{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setError(null);
              handleEnrollmentChange();
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <>
        {/* External CSS */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
          rel="stylesheet"
        />

        <style>
          {`
            @keyframes slideInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            .animate-in {
              animation: slideInUp 0.6s ease-out forwards;
            }

            .fade-in {
              animation: fadeIn 0.8s ease-out forwards;
            }

            .gradient-bg {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              position: relative;
              overflow: hidden;
            }

            .gradient-bg::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
              opacity: 0.6;
            }

            .glass-effect {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }

            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              background: #f8fafc;
            }
          `}
        </style>

        <div style={{
          padding: '30px 20px',
          minHeight: '100vh'
        }}>
          {/* Page Header */}
          <div className="container" style={{ marginBottom: '32px', textAlign: 'center' }}>
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
              Course Catalog
            </h1>
            <p
              style={{
                color: isDark ? '#94a3b8' : '#64748b',
                fontSize: '16px',
                maxWidth: '500px',
                margin: '0 auto'
              }}
            >
              Continue your professional development journey with our courses
            </p>
          </div>

          {/* Stats Section */}
          <div className="container-fluid px-4 py-4">
            <div className={`row ${isLoaded ? 'animate-in' : ''}`}>
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="container-fluid px-4 pb-5">
            {/* Filters and Search */}
            <div className={`row mb-4 ${isLoaded ? 'animate-in' : ''}`}>
              <div className="col-12">
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: '16px',
                    background: isDark
                      ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
                      : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-lg-8 col-md-12 mb-3 mb-lg-0">
                        <div className="d-flex flex-wrap gap-2">
                          {filters.map((filter) => (
                            <button
                              key={filter.key}
                              className={`btn ${activeFilter === filter.key ? 'btn-primary' : 'btn-outline-primary'
                                } d-flex align-items-center`}
                              style={{
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '14px',
                                padding: '10px 20px',
                                background:
                                  activeFilter === filter.key
                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    : 'transparent',
                                border: activeFilter === filter.key ? 'none' : '2px solid #e2e8f0',
                                transition: 'all 0.3s ease',
                              }}
                              onClick={() => setActiveFilter(filter.key)}
                            >
                              <FontAwesomeIcon icon={filter.icon} className="me-2" />
                              {filter.label}
                              <span
                                className="badge ms-2"
                                style={{
                                  backgroundColor:
                                    activeFilter === filter.key ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                                  color: activeFilter === filter.key ? 'white' : '#64748b',
                                  fontSize: '11px',
                                }}
                              >
                                {filter.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="input-group">
                          <span
                            className="input-group-text bg-white border-end-0"
                            style={{ borderRadius: '12px 0 0 12px', border: '2px solid #e2e8f0' }}
                          >
                            <FontAwesomeIcon icon={faSearch} className="text-muted" />
                          </span>
                          <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                              borderRadius: '0 12px 12px 0',
                              border: '2px solid #e2e8f0',
                              fontSize: '14px',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Section Header */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '24px' }}>
                      {activeFilter === 'all' && 'All Available Courses'}
                      {activeFilter === 'enrolled' && 'My Learning Path'}
                      {activeFilter === 'completed' && 'Completed Courses'}
                      {activeFilter === 'recommended' && 'Recommended for You'}
                    </h2>
                    <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                      {activeFilter === 'enrolled' && 'Continue where you left off'}
                      {activeFilter === 'recommended' && 'Courses tailored to your learning goals'}
                      {activeFilter === 'completed' && 'Your achievements and certifications'}
                      {activeFilter === 'all' && 'Explore our complete course catalog'}
                    </p>
                  </div>
                  <span
                    className="badge px-3 py-2"
                    style={{
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
                      color: '#0277bd',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600',
                    }}
                  >
                    {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Authentication Warning */}
            {!isAuthenticated && (
              <div className="row mb-4">
                <div className="col-12">
                  <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-3" />
                    <div>
                      <strong>Please login to enroll in courses</strong>
                      <br />
                      <small>
                        You can browse courses, but you'll need to login to enroll and track your
                        progress.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Grid */}
            <div className="row">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <CourseCard
                    key={course.id || index}
                    course={course}
                    enrolledCourses={enrolledCourses}
                    onEnrollmentChange={handleEnrollmentChange}
                  />
                ))
              ) : (
                <div className="col-12">
                  <div
                    className="card border-0 shadow-sm text-center py-5"
                    style={{
                      borderRadius: '20px',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    }}
                  >
                    <div className="card-body">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="fa-4x text-muted opacity-50 mb-4"
                      />
                      <h4 className="text-muted fw-bold mb-3">No Courses Found</h4>
                      <p className="text-muted mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        We couldn't find any courses matching your criteria. Try adjusting your search
                        or browse all available courses.
                      </p>
                      <button
                        className="btn btn-primary px-4 py-3 fw-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '12px',
                          border: 'none',
                        }}
                        onClick={() => {
                          setSearchQuery('');
                          setActiveFilter('all');
                        }}
                      >
                        <FontAwesomeIcon icon={faRefresh} className="me-2" />
                        View All Courses
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Loading More Courses */}
            {loading && courses.length > 0 && (
              <div className="row mt-4">
                <div className="col-12 text-center">
                  <div className="spinner-border text-primary me-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="text-muted">Loading more courses...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </ErrorBoundary>
  );
};

export default CourseDashboard;