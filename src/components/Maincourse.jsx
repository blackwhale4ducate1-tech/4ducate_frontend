import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { BASE_URL } from '../../env';

const CourseCard = ({ title, weeks, featured, description, instructor, rating, students, price, level, category }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 mb-4">
      <div 
        className={`card h-100 border-0 shadow-lg position-relative overflow-hidden transition-all ${
          featured ? 'border-gradient-primary' : ''
        }`}
        style={{
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          background: isDark
            ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {featured && (
          <div className="position-absolute" style={{ top: '16px', right: '16px', zIndex: 3 }}>
            <span className="badge px-3 py-2" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              <i className="fas fa-crown me-1"></i>FEATURED
            </span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="position-absolute w-100 h-100" style={{
          background: featured ? 'linear-gradient(145deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)' : 'transparent',
          borderRadius: '16px'
        }}></div>

        {/* Course Thumbnail with Category Badge */}
        <div className="position-relative">
          <div 
            className="card-img-top d-flex align-items-center justify-content-center position-relative overflow-hidden" 
            style={{ 
              height: '220px', 
              background: `linear-gradient(135deg, 
                ${category === 'design' ? '#667eea, #764ba2' : 
                  category === 'development' ? '#4facfe, #00f2fe' : 
                  '#f093fb, #f5576c'}
              )`,
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px'
            }}
          >
            {/* Animated Background Pattern */}
            <div className="position-absolute w-100 h-100" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: isHovered ? 'float 3s ease-in-out infinite' : 'none'
            }}></div>
            
            <div className="text-center text-white position-relative z-index-2">
              <i className={`${
                category === 'design' ? 'fas fa-palette' : 
                category === 'development' ? 'fas fa-code' : 
                'fas fa-laptop-code'
              } fa-4x mb-3`} style={{ opacity: 0.9 }}></i>
              <div className="fw-semibold" style={{ fontSize: '14px', letterSpacing: '1px' }}>
                {category ? category.toUpperCase() : 'COURSE'} COURSE
              </div>
            </div>
          </div>
          
          {/* Level Badge */}
          <div className="position-absolute" style={{ bottom: '12px', left: '16px' }}>
            <span className="badge bg-white text-dark px-3 py-2" style={{
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              {level || 'N/A'}
            </span>
          </div>
        </div>

        <div className="card-body p-4 d-flex flex-column">
          <div className="mb-3">
            <h5 className="card-title fw-bold mb-2" style={{ 
              fontSize: '18px', 
              lineHeight: '1.4',
              color: '#2d3748'
            }}>
              {title || 'Untitled Course'}
            </h5>
            <p className="card-text text-muted mb-3" style={{ 
              fontSize: '14px', 
              lineHeight: '1.6',
              color: '#718096'
            }}>
              {description || 'No description available.'}
            </p>
          </div>

          {/* Instructor Info */}
          <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
            <div className="me-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '14px'
                }}
              >
                {instructor ? instructor.split(' ').map(n => n[0]).join('') : 'N/A'}
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
                {instructor || 'Unknown Instructor'}
              </div>
              <div className="text-muted" style={{ fontSize: '12px' }}>
                Senior Instructor
              </div>
            </div>
          </div>

          {/* Rating and Students */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <div className="me-2">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas fa-star ${i < (rating || 0) ? 'text-warning' : 'text-muted'}`}
                    style={{ fontSize: '12px' }}
                  ></i>
                ))}
              </div>
              <span className="text-muted fw-semibold" style={{ fontSize: '13px' }}>
                {(rating || 0).toFixed(1)}
              </span>
            </div>
            <div className="d-flex align-items-center text-muted" style={{ fontSize: '13px' }}>
              <i className="fas fa-users me-1"></i>
              {(students || 0).toLocaleString()}
            </div>
          </div>

          {/* Course Details */}
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <span className="badge me-2" style={{
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  color: '#1565c0',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '6px 12px'
                }}>
                  <i className="fas fa-clock me-1"></i>
                  {weeks || 'N/A'} weeks
                </span>
              </div>
              <div className="text-end">
                <div className="text-muted" style={{ fontSize: '12px', textDecoration: 'line-through' }}>
                  ${(price ? Number(price) + 50 : 50).toFixed(2)}
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '20px' }}>
                  ${(price || 0).toFixed(2)}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="btn w-100 fw-semibold py-3 border-0 position-relative overflow-hidden"
              style={{
                background: featured 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '12px',
                fontSize: '14px',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => navigate('/login')}
            >
              <span className="text-white position-relative z-index-2">
                <i className="fas fa-play-circle me-2"></i>
                START LEARNING
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseApp = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/getModelData/Course`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const result = await response.json();
        // Map API response to CourseCard props
        const mappedCourses = result.data.map(course => ({
          id: course.id,
          title: course.title || 'Untitled Course',
          weeks: course.duration ? parseInt(course.duration) / 7 : null, // Convert duration (assumed in days) to weeks
          category: course.category || 'development',
          featured: course.certification || false, // Use certification as a proxy for featured
          description: course.description || 'No description available',
          instructor: course.instructorName || 'Unknown Instructor',
          rating: course.rating || 0, // Default to 0 if rating not provided
          students: course.students || 0, // Default to 0 if students not provided
          price: course.price ? parseFloat(course.price) : 0,
          level: course.level || 'N/A'
        }));
        setCourses(mappedCourses);
        setIsLoaded(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'trending' && course.featured) ||
                       (activeTab === 'newest' && course.id > courses.length - 3);
    return matchesSearch && matchesTab;
  });

  const stats = [
    { number: '50K+', label: 'Professionals Trained', icon: 'fas fa-users' },
    { number: '500+', label: 'Corporate Partners', icon: 'fas fa-building' },
    { number: '150+', label: 'Expert Instructors', icon: 'fas fa-chalkboard-teacher' },
    { number: '98%', label: 'Career Advancement', icon: 'fas fa-chart-line' }
  ];

  return (
    <>
      {/* External CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet" 
      />
      
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
          }
          
          .animate-in-down {
            animation: slideInDown 0.8s ease-out forwards;
          }
          
          .transition-all {
            transition: all 0.3s ease;
          }
          
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          }
          
          .card:hover {
            box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .hero-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
          }
          
          .hero-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
      
      <div className="min-vh-100" style={{ 
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        background: isDark ? '#0f172a' : '#f8fafc',
        transition: 'background 0.3s ease'
      }}>
        {/* Hero Section */}
        <div className="hero-bg text-white position-relative">
          <div className="container py-5">
            <div className={`row align-items-center min-vh-50 ${isLoaded ? 'animate-in-down' : ''}`}>
              <div className="col-lg-8 col-md-10 mx-auto text-center py-5">
                <div className="mb-4">
                  <span className="badge bg-white text-dark px-4 py-2 mb-4" style={{
                    borderRadius: '25px',
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '1px'
                  }}>
                    🚀 PROFESSIONAL DEVELOPMENT PLATFORM
                  </span>
                </div>
                <h1 className="display-3 fw-bold mb-4" style={{ 
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em'
                }}>
                  Elevate Your
                  <span className="d-block">Professional Journey</span>
                </h1>
                <p className="lead mb-5 opacity-90" style={{ 
                  fontSize: '20px',
                  lineHeight: '1.6',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  Industry-leading courses designed by experts for ambitious professionals 
                  ready to lead in the digital economy.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button className="btn btn-light btn-lg px-5 py-3 fw-semibold" style={{
                    borderRadius: '12px',
                    fontSize: '16px',
                    letterSpacing: '0.5px'
                  }}>
                    <i className="fas fa-play-circle me-2"></i>
                    Explore Courses
                  </button>
                  <button className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold" style={{
                    borderRadius: '12px',
                    fontSize: '16px',
                    letterSpacing: '0.5px'
                  }}>
                    <i className="fas fa-calendar me-2"></i>
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-5 shadow-sm" style={{
          background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
          transition: 'background 0.3s ease'
        }}>
          <div className="container">
            <div className={`row text-center ${isLoaded ? 'animate-in' : ''}`}>
              {stats.map((stat, index) => (
                <div key={index} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                  <div className="p-4">
                    <div className="mb-3">
                      <i className={`${stat.icon} fa-2x`} style={{
                        background: isDark
                          ? 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}></i>
                    </div>
                    <h3 className="fw-bold mb-2 gradient-text" style={{ 
                      fontSize: '2.5rem',
                      color: isDark ? '#f1f5f9' : 'inherit'
                    }}>
                      {stat.number}
                    </h3>
                    <p className="mb-0" style={{ 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: isDark ? '#94a3b8' : '#6c757d'
                    }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-5">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-3">Fetching courses...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  <i className="fas fa-exclamation-circle fa-4x text-danger opacity-50"></i>
                </div>
                <h3 className="text-muted fw-bold mb-3">Error Loading Courses</h3>
                <p className="text-muted mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                  {error}. Please try again later.
                </p>
                <button 
                  className="btn btn-primary px-4 py-3 fw-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    border: 'none'
                  }}
                  onClick={() => window.location.reload()}
                >
                  <i className="fas fa-refresh me-2"></i>
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Filters Section */}
          {!loading && !error && (
            <>
              <div className={`row mb-5 ${isLoaded ? 'animate-in' : ''}`}>
                <div className="col-12">
                  <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                    <div className="card-body p-4">
                      <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 mb-3 mb-lg-0">
                          <div className="btn-group" role="group">
                            {[
                              { key: 'all', label: 'All Courses', icon: 'fas fa-th-large' },
                              { key: 'newest', label: 'Latest', icon: 'fas fa-clock' },
                              { key: 'trending', label: 'Featured', icon: 'fas fa-fire' }
                            ].map(tab => (
                              <button 
                                key={tab.key}
                                type="button" 
                                className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-outline-primary'} px-4 py-2`}
                                style={{
                                  borderRadius: activeTab === tab.key ? '12px' : '12px',
                                  fontWeight: '600',
                                  fontSize: '14px',
                                  background: activeTab === tab.key ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'
                                }}
                                onClick={() => setActiveTab(tab.key)}
                              >
                                <i className={`${tab.icon} me-2`}></i>{tab.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <div className="input-group" style={{ borderRadius: '12px' }}>
                            <span className="input-group-text bg-white border-end-0" style={{
                              borderTopLeftRadius: '12px',
                              borderBottomLeftRadius: '12px'
                            }}>
                              <i className="fas fa-search text-muted"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control border-start-0 ps-0"
                              placeholder="Search professional courses..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              style={{
                                borderTopRightRadius: '12px',
                                borderBottomRightRadius: '12px',
                                fontSize: '14px'
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
                      <h2 className="fw-bold text-dark mb-2">
                        {activeTab === 'all' && 'Professional Development Courses'}
                        {activeTab === 'newest' && 'Latest Course Offerings'}
                        {activeTab === 'trending' && 'Featured Learning Paths'}
                      </h2>
                      <p className="text-muted mb-0">
                        Carefully curated by industry experts and thought leaders
                      </p>
                    </div>
                    <span className="badge px-3 py-2" style={{
                      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                      color: '#1565c0',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}>
                      {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Grid */}
              <div className="row">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => (
                    <CourseCard 
                      key={course.id}
                      {...course}
                    />
                  ))
                ) : (
                  <div className="col-12">
                    <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                      <div className="card-body text-center py-5">
                        <div className="mb-4">
                          <i className="fas fa-search fa-4x text-muted opacity-50"></i>
                        </div>
                        <h3 className="text-muted fw-bold mb-3">No Courses Found</h3>
                        <p className="text-muted mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                          We couldn't find any courses matching your criteria. 
                          Try adjusting your search or browse our complete catalog.
                        </p>
                        <button 
                          className="btn btn-primary px-4 py-3 fw-semibold"
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            border: 'none'
                          }}
                          onClick={() => {
                            setSearchQuery('');
                            setActiveTab('all');
                          }}
                        >
                          <i className="fas fa-refresh me-2"></i>
                          View All Courses
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* CTA Section */}
        <div className="hero-bg text-white py-5 mt-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12 mb-4 mb-lg-0 text-center text-lg-start">
                <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
                  Ready to Transform Your Career?
                </h2>
                <p className="lead mb-0 opacity-90" style={{ fontSize: '18px' }}>
                  Join over 50,000 professionals who have accelerated their careers 
                  with our industry-leading courses and expert mentorship.
                </p>
              </div>
              <div className="col-lg-4 col-md-12 text-center text-lg-end">
                <button className="btn btn-light btn-lg px-5 py-3 fw-semibold me-3" style={{
                  borderRadius: '12px',
                  fontSize: '16px'
                }}>
                  <i className="fas fa-rocket me-2"></i>
                  Start Today
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold" style={{
                  borderRadius: '12px',
                  fontSize: '16px'
                }}>
                  <i className="fas fa-phone me-2"></i>
                  Talk to Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseApp;