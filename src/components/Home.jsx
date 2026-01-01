import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
  BookOpen,
  Users,
  Award,
  Star,
  TrendingUp,
  Shield,
  Play,
  Clock,
  CheckCircle,
  Target,
  Zap,
  Globe,
  Briefcase,
  Code,
  Camera,
  Headphones,
  MessageCircle,
  GraduationCap,
  Heart,
  ArrowRight,
  PlayCircle,
  Calendar,
  Trophy,
  Monitor,
  BookMarked,
  UserCheck,
  Building,
  Lightbulb,
  Rocket,
  User
} from 'lucide-react';

export default function CorporateHomePage() {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({ rating: 0, package: 0, students: 0 });

  // Refs for animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const sectionsRef = useRef([]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (isVisible.stats) {
      const animateCounter = (target, key, suffix = '') => {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: current }));
        }, 16);
      };

      animateCounter(4.1, 'rating');
      animateCounter(12, 'package');
      animateCounter(100, 'students');
    }
  }, [isVisible.stats]);

  const addToRefs = (el, index) => {
    sectionsRef.current[index] = el;
  };

  return (
    <div className="corporate-homepage" style={{
      background: isDark ? '#0f172a' : '#ffffff',
      transition: 'background 0.3s ease'
    }}>
      {/* Hero Section */}
      <section
        id="hero"
        ref={(el) => addToRefs(el, 0)}
        className="position-relative overflow-hidden"
        style={{
          background: isDark
            ? `linear-gradient(135deg, #0f172a 0%, #1e293b ${30 + mousePosition.x * 0.2}%, #0f172a 100%)`
            : `linear-gradient(135deg, #1e3c72 0%, #2a5298 ${30 + mousePosition.x * 0.2}%, #1e3c72 100%)`,
          minHeight: '100vh',
          color: isDark ? 'white' : 'black'
        }}
      >  {/* Animated Background Elements */}
        <div className="position-absolute w-100 h-100" style={{ opacity: 0.1 }}>
          <div
            className="position-absolute rounded-circle"
            style={{
              width: '300px',
              height: '300px',
              background: 'rgba(255, 255, 255, 0.1)',
              top: '10%',
              left: `${20 + mousePosition.x * 0.1}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s ease'
            }}
          />
          <div
            className="position-absolute rounded-circle"
            style={{
              width: '200px',
              height: '200px',
              background: 'rgba(255, 255, 255, 0.05)',
              bottom: '20%',
              right: `${10 + mousePosition.y * 0.1}%`,
              transform: 'translate(50%, 50%)',
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6 text-white">
              <div className={`${isVisible.hero ? 'animate__animated animate__fadeInLeft' : 'opacity-0'}`}>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-warning rounded-circle p-2 me-3">
                    <Rocket className="text-dark" size={24} />
                  </div>
                  <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                    #1 Learning Platform
                  </span>
                </div>

                <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: '1.2' }}>
                  Unlock Your Potential with
                  <span className="text-warning d-block">4Ducate</span>
                  <span className="text-info">Excellence</span>
                </h1>

                <p className="lead mb-4 text-light" style={{ fontSize: '1.25rem' }}>
                  Transform your career with cutting-edge courses, live mentorship, and industry-ready projects.
                  Join thousands of successful professionals who started their journey with us.
                </p>

                <div className="d-flex flex-wrap gap-3 mb-4">
                  <button className="btn btn-warning btn-sm btn-md-lg px-3 px-lg-4 py-2 d-flex align-items-center">
                    <BookOpen className="me-2" size={15} color={isDark ? '#fbbf24' : '#000'} />
                    Explore Courses
                    <ArrowRight className="ms-2" size={16} color={isDark ? '#fbbf24' : '#000'} />
                  </button>
                  <button className="btn btn-outline-light btn-sm btn-md-lg px-3 px-lg-4 py-2 d-flex align-items-center">
                    <PlayCircle className="me-2" size={15} color={isDark ? '#10b981' : '#fff'} />
                    Watch Demo
                  </button>
                </div>

                <div className="d-flex align-items-center text-light">
                  <div className="d-flex me-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-warning" size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span>Rated 4.9/5 by 1000+ students</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className={`${isVisible.hero ? 'animate__animated animate__fadeInRight' : 'opacity-0'} text-center`}>
                <div className="position-relative">
                  <div
                    className="rounded-4 shadow-lg overflow-hidden"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <div className="p-4">
                      <div className="bg-white rounded-3 p-4 mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary rounded-circle p-2 me-3">
                              <Monitor className="text-white" size={20} />
                            </div>
                            <div>
                              <h6 className="mb-0 text-dark">Live Class</h6>
                              <small className="text-muted">Advanced React Development</small>
                            </div>
                          </div>
                          <span className="badge bg-success">LIVE</span>
                        </div>
                        <div className="progress mb-3" style={{ height: '6px' }}>
                          <div className="progress-bar bg-primary" style={{ width: '65%' }}></div>
                        </div>
                        <div className="d-flex justify-content-between text-sm">
                          <span className="text-muted">45 min remaining</span>
                          <span className="text-primary">156 students</span>
                        </div>
                      </div>

                      <div className="row g-3">
                        <div className="col-6">
                          <div className="bg-white rounded-3 p-3 text-center">
                            <Trophy className="text-warning mb-2" size={24} />
                            <div className="fw-bold text-dark">95%</div>
                            <small className="text-muted">Success Rate</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bg-white rounded-3 p-3 text-center">
                            <Users className="text-info mb-2" size={24} />
                            <div className="fw-bold text-dark">1000+</div>
                            <small className="text-muted">Students</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div
                    className="position-absolute bg-warning rounded-circle p-3 shadow"
                    style={{
                      top: '10%',
                      left: '-5%',
                      animation: 'float 3s ease-in-out infinite'
                    }}
                  >
                    <Lightbulb className="text-dark" size={24} />
                  </div>

                  <div
                    className="position-absolute bg-info rounded-circle p-3 shadow"
                    style={{
                      bottom: '15%',
                      right: '-5%',
                      animation: 'float 3s ease-in-out infinite 1.5s'
                    }}
                  >
                    <Target className="text-white" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="position-absolute bottom-0 w-100">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-100" style={{ height: '80px' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        ref={(el) => addToRefs(el, 1)}
        className="py-5 bg-light"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className={`card border-0 shadow-sm h-100 ${isVisible.stats ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}>
                <div className="card-body text-center p-4">
                  <div className="bg-primary rounded-circle p-3 d-inline-flex mb-3">
                    <Star className="text-white" size={32} />
                  </div>
                  <h2 className="display-4 fw-bold text-primary mb-2">
                    {counters.rating.toFixed(1)}
                  </h2>
                  <p className="text-muted mb-0">Google Ratings</p>
                  <div className="d-flex justify-content-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-warning" size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className={`card border-0 shadow-sm h-100 ${isVisible.stats ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-flex mb-3">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <h2 className="display-4 fw-bold text-success mb-2">
                    {Math.floor(counters.package)} LPA
                  </h2>
                  <p className="text-muted mb-0">Highest Package</p>
                  <small className="text-success">↑ 20% from last year</small>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className={`card border-0 shadow-sm h-100 ${isVisible.stats ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                <div className="card-body text-center p-4">
                  <div className="bg-info rounded-circle p-3 d-inline-flex mb-3">
                    <Users className="text-white" size={32} />
                  </div>
                  <h2 className="display-4 fw-bold text-info mb-2">
                    {Math.floor(counters.students)}+
                  </h2>
                  <p className="text-muted mb-0">Students Trained</p>
                  <small className="text-info">Active learners</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Class Section */}
      <section
        id="live-class"
        ref={(el) => addToRefs(el, 2)}
        className="py-5 bg-white"
      >
        <div className="container">
          <div className="text-center mb-5">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="bg-danger rounded-circle p-1 me-2 position-relative">
                <div className="bg-danger rounded-circle" style={{ width: '12px', height: '12px', animation: 'pulse 2s infinite' }}></div>
              </div>
              <h2 className="h3 mb-0 text-uppercase fw-bold">Live Classes</h2>
            </div>
            <p className="lead text-muted">Interactive Learning Experience - Join Live Sessions</p>
          </div>

          <div className={`card shadow-lg border-0 ${isVisible['live-class'] ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}>
            <div className="row g-0">
              <div className="col-lg-4">
                <div className="bg-gradient-primary text-white h-100 d-flex align-items-center justify-content-center p-5">
                  <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-circle p-4 mb-3 d-inline-flex">
                      <Monitor size={48} />
                    </div>
                    <h4 className="fw-bold">Live Interactive Session</h4>
                    <p className="mb-0">Real-time learning with expert instructors</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="card-body p-5">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary px-3 py-2 me-3">
                      <Clock size={16} className="me-1" />
                      01hr 30min
                    </span>
                    <span className="badge bg-success px-3 py-2">
                      <Users size={16} className="me-1" />
                      45 Students Joined
                    </span>
                  </div>

                  <h4 className="fw-bold mb-3">Advanced React Development Masterclass</h4>
                  <p className="text-muted mb-4">
                    Join our comprehensive React development session covering hooks, context API,
                    performance optimization, and real-world project implementation.
                    Learn from industry experts with hands-on coding experience.
                  </p>

                  <div className="d-flex align-items-center mb-4">
                    <div className="me-3">
                      <img
                        src="/api/placeholder/50/50"
                        alt="Instructor"
                        className="rounded-circle"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </div>
                    <div>
                      <h6 className="mb-0">Expert Tutor from <span className="text-primary fw-bold">4Ducate</span></h6>
                      <small className="text-muted">Senior React Developer • 8+ years experience</small>
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <button className="btn btn-primary btn-sm btn-md-lg px-3 px-lg-4 py-2">
                      <Play className="me-2" size={15} />
                      Join Live Class
                    </button>
                    <button className="btn btn-outline-primary btn-sm btn-md-lg px-3 px-lg-4 py-2">
                      <BookOpen className="me-2" size={15} />
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        ref={(el) => addToRefs(el, 3)}
        className="py-5 bg-light"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Discover Career-Aligned Programs</h2>
            <p className="lead text-muted">
              Explore cutting-edge skills in technology, design, and business to accelerate your career growth
            </p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <div className={`card border-0 shadow-sm h-100 ${isVisible.programs ? 'animate__animated animate__fadeInLeft' : 'opacity-0'}`}>
                <div className="card-body p-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-primary rounded-circle p-3 me-3">
                      <Monitor className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="h4 fw-bold mb-1">LIVE INTERACTIVE CLASSES</h3>
                      <small className="text-muted">Real-time Learning Experience</small>
                    </div>
                  </div>

                  <p className="text-muted mb-4">
                    Experience immersive learning with our live interactive sessions.
                    Get instant feedback, participate in real-time discussions, and
                    collaborate with peers and industry experts.
                  </p>

                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <CheckCircle className="text-success me-2" size={20} />
                        <span>Expert Instructors</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <CheckCircle className="text-success me-2" size={20} />
                        <span>Q&A Sessions</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <CheckCircle className="text-success me-2" size={20} />
                        <span>Hands-on Projects</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <CheckCircle className="text-success me-2" size={20} />
                        <span>Career Guidance</span>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-sm btn-md-lg px-3 px-lg-4 py-2">
                    Explore Programs
                    <ArrowRight className="ms-2" size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className={`text-center ${isVisible.programs ? 'animate__animated animate__fadeInRight' : 'opacity-0'}`}>
                <div className="position-relative">
                  <div
                    className="rounded-4 overflow-hidden shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      minHeight: '400px'
                    }}
                  >
                    <div className="p-5 text-white h-100 d-flex align-items-center justify-content-center">
                      <div>
                        <div className="bg-white bg-opacity-20 rounded-circle p-4 mb-4 d-inline-flex">
                          <GraduationCap size={64} />
                        </div>
                        <h4 className="fw-bold mb-3">Interactive Learning Environment</h4>
                        <p className="lead">Join thousands of students in our virtual classrooms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section
        id="companies"
        ref={(el) => addToRefs(el, 4)}
        className="py-5 bg-white"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">Our Learners Work At</h2>
            <p className="lead text-muted">Top companies trust our graduates</p>
          </div>

          <div className={`row ${isVisible.companies ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}>
            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Spotify', 'Uber'].map((company, i) => (
              <div className="col-6 col-md-3 col-lg-3 mb-4" key={i}>
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body d-flex align-items-center justify-content-center p-4">
                    <div className="text-center">
                      <div className="bg-primary rounded-circle p-3 mb-3 d-inline-flex">
                        <Building className="text-white" size={32} />
                      </div>
                      <h6 className="fw-bold mb-0">{company}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Hacker Feature */}
      <section
        id="ethical-hacker"
        ref={(el) => addToRefs(el, 5)}
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <div className={`position-relative ${isVisible['ethical-hacker'] ? 'animate__animated animate__fadeInLeft' : 'opacity-0'}`}>
                <span className="badge bg-danger position-absolute top-0 start-0 m-3 z-index-1">
                  <Star className="me-1" size={16} />
                  FEATURED COURSE
                </span>
                <div
                  className="rounded-4 overflow-hidden shadow-lg"
                  style={{ minHeight: '350px', background: 'rgba(255,255,255,0.1)' }}
                >
                  <div className="p-5 h-100 d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <div className="bg-white bg-opacity-20 rounded-circle p-4 mb-4 d-inline-flex">
                        <Shield size={64} />
                      </div>
                      <h4 className="fw-bold">Cybersecurity Mastery</h4>
                      <p>Protect. Defend. Secure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className={`${isVisible['ethical-hacker'] ? 'animate__animated animate__fadeInRight' : 'opacity-0'}`}>
                <div className="d-flex align-items-center mb-3">
                  <Shield className="text-warning me-3" size={32} />
                  <h2 className="h3 fw-bold mb-0">Master Ethical Hacking</h2>
                </div>

                <p className="lead mb-4">
                  Become a certified ethical hacker and cybersecurity professional.
                  Learn penetration testing, vulnerability assessment, and security protocols
                  from industry experts with real-world experience.
                </p>

                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={20} />
                      <span>Hands-on Labs</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={20} />
                      <span>Industry Certification</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={20} />
                      <span>Career Support</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <CheckCircle className="text-success me-2" size={20} />
                      <span>Real-world Projects</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <button className="btn btn-warning btn-sm btn-md-lg px-3 px-lg-4 py-2">
                    <Shield className="me-2" size={15} />
                    Start Learning
                  </button>
                  <button className="btn btn-outline-light btn-sm btn-md-lg px-3 px-lg-4 py-2">
                    <BookOpen className="me-2" size={15} />
                    Course Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section
        id="features"
        ref={(el) => addToRefs(el, 6)}
        className="py-5 bg-light"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">Upcoming Features</h2>
            <p className="lead text-muted">
              Revolutionary features coming soon to enhance your learning experience
            </p>
          </div>

          <div className="row">
            {[
              { icon: BookOpen, title: 'Advanced Courses', desc: 'AI-powered personalized learning paths with industry experts', color: 'primary' },
              { icon: Code, title: 'Live Projects', desc: 'Real-world projects from leading companies to build your portfolio', color: 'success' },
              { icon: Target, title: 'Learning Paths', desc: 'Customized roadmaps aligned with your career goals and interests', color: 'info' },
              { icon: UserCheck, title: '1:1 Mentorship', desc: 'Personal guidance from industry leaders and successful professionals', color: 'warning' },
            ].map((feature, i) => (
              <div className="col-lg-3 col-md-6 mb-4" key={i}>
                <div className={`card border-0 shadow-sm h-100 hover-card ${isVisible.features ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="card-body text-center p-4">
                    <div className={`bg-${feature.color} rounded-circle p-3 d-inline-flex mb-3`}>
                      <feature.icon className="text-white" size={32} />
                    </div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted">{feature.desc}</p>
                    <span className="badge bg-secondary">Coming Soon</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Works Portfolio */}
      <section
        id="portfolio"
        ref={(el) => addToRefs(el, 7)}
        className="py-5 bg-white"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">Our Featured Works</h2>
            <p className="lead text-muted">Showcasing excellence in education and student success</p>
          </div>

          <div className="row">
            {[
              { title: 'E-Learning Platform', desc: 'Full-stack web application built by our students', tech: 'React, Node.js, MongoDB' },
              { title: 'Mobile Banking App', desc: 'Secure financial application with modern UI/UX', tech: 'React Native, Firebase' },
              { title: 'AI Chatbot System', desc: 'Intelligent customer service automation', tech: 'Python, TensorFlow, NLP' },
            ].map((project, i) => (
              <div className="col-lg-4 col-md-6 mb-4" key={i}>
                <div className={`card border-0 shadow-sm h-100 hover-card ${isVisible.portfolio ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.2}s` }}>
                  <div
                    className="card-img-top d-flex align-items-center justify-content-center"
                    style={{
                      height: '200px',
                      background: `linear-gradient(135deg, ${i === 0 ? '#667eea, #764ba2' : i === 1 ? '#f093fb, #f5576c' : '#4facfe, #00f2fe'})`
                    }}
                  >
                    <div className="text-white text-center">
                      <div className="bg-white bg-opacity-20 rounded-circle p-3 mb-2 d-inline-flex">
                        {i === 0 ? <Monitor size={32} /> : i === 1 ? <Camera size={32} /> : <Zap size={32} />}
                      </div>
                      <h6 className="fw-bold">Student Project</h6>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-2">{project.title}</h5>
                    <p className="text-muted mb-3">{project.desc}</p>
                    <div className="mb-3">
                      <small className="text-primary fw-bold">{project.tech}</small>
                    </div>
                    <button className="btn btn-outline-primary btn-sm px-3 py-2">
                      <Globe className="me-1" size={15} />
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Tutors */}
      <section
        id="tutors"
        ref={(el) => addToRefs(el, 8)}
        className="py-5 bg-light"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">Meet Our Expert Tutors</h2>
            <p className="lead text-muted">Learn from industry leaders and experienced professionals</p>
          </div>

          <div className="row">
            {[
              { name: 'Sarah Johnson', title: 'Senior Full-Stack Developer', company: 'Google', experience: '8+ years', rating: '4.9' },
              { name: 'Michael Chen', title: 'UI/UX Design Lead', company: 'Apple', experience: '6+ years', rating: '4.8' },
              { name: 'David Rodriguez', title: 'Data Science Manager', company: 'Microsoft', experience: '10+ years', rating: '4.9' },
              { name: 'Emily Davis', title: 'Cybersecurity Expert', company: 'Amazon', experience: '7+ years', rating: '4.7' },
            ].map((tutor, i) => (
              <div className="col-lg-3 col-md-6 mb-4" key={i}>
                <div className={`card border-0 shadow-sm h-100 hover-card ${isVisible.tutors ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="card-body text-center p-4">
                    <div className="position-relative mb-3">
                      <div
                        className="rounded-circle mx-auto mb-3"
                        style={{
                          width: '100px',
                          height: '100px',
                          background: `linear-gradient(135deg, ${i % 2 === 0 ? '#667eea, #764ba2' : '#f093fb, #f5576c'})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <User className="text-white" size={40} />
                      </div>
                      <span className="badge bg-success position-absolute top-0 end-0">
                        <CheckCircle size={12} className="me-1" />
                        Verified
                      </span>
                    </div>

                    <h5 className="fw-bold mb-1">{tutor.name}</h5>
                    <p className="text-primary fw-semibold mb-1">{tutor.title}</p>
                    <small className="text-muted d-block mb-2">
                      <Building className="me-1" size={14} />
                      {tutor.company} • {tutor.experience}
                    </small>

                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <div className="d-flex me-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="text-warning" size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="fw-bold text-warning">{tutor.rating}</span>
                    </div>

                    <button className="btn btn-outline-primary btn-sm px-3 py-2">
                      <MessageCircle className="me-1" size={15} />
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section
        id="accreditation"
        ref={(el) => addToRefs(el, 9)}
        className="py-5 bg-white"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">Trusted & Accredited</h2>
            <p className="lead text-muted">Recognized by leading organizations and institutions</p>
          </div>

          <div className={`row justify-content-center ${isVisible.accreditation ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}>
            <div className="col-6 col-md-3 mb-4">
              <div className="card border-0 shadow-sm h-100 hover-card">
                <div className="card-body text-center p-4">
                  <div className="bg-gradient-primary text-white rounded-3 p-3 mb-3 d-inline-flex">
                    <Award size={32} />
                  </div>
                  <h6 className="fw-bold text-primary">#StartupIndia</h6>
                  <small className="text-muted">Government Recognition</small>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <div className="card border-0 shadow-sm h-100 hover-card">
                <div className="card-body text-center p-4">
                  <div className="bg-gradient-success text-white rounded-3 p-3 mb-3 d-inline-flex">
                    <Rocket size={32} />
                  </div>
                  <h6 className="fw-bold text-success">StartupTN</h6>
                  <small className="text-muted">State Innovation</small>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <div className="card border-0 shadow-sm h-100 hover-card">
                <div className="card-body text-center p-4">
                  <div className="border border-3 border-primary rounded-circle p-3 mb-3 d-inline-flex">
                    <div className="bg-primary rounded-circle" style={{ width: '32px', height: '32px' }}></div>
                  </div>
                  <h6 className="fw-bold text-primary">ISO Certified</h6>
                  <small className="text-muted">Quality Standards</small>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3 mb-4">
              <div className="card border-0 shadow-sm h-100 hover-card">
                <div className="card-body text-center p-4">
                  <div className="bg-gradient-info text-white rounded-3 p-3 mb-3 d-inline-flex">
                    <Building size={32} />
                  </div>
                  <h6 className="fw-bold text-info">MSME</h6>
                  <small className="text-muted">Business Excellence</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose 4Ducate */}
      <section
        id="why-choose"
        ref={(el) => addToRefs(el, 10)}
        className="py-5"
        style={{
          background: `linear-gradient(135deg, 
            #1e3c72 0%, 
            #2a5298 ${40 + mousePosition.x * 0.2}%, 
            #1e3c72 100%)`,
          color: 'white'
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose 4Ducate?</h2>
            <p className="lead">Excellence in every aspect of learning and career development</p>
          </div>

          <div className="row">
            {[
              { icon: CheckCircle, label: 'Course Completion', rate: '100%', desc: 'Guaranteed completion with our structured approach' },
              { icon: Briefcase, label: 'Job Placement', rate: '95%', desc: 'High success rate in career placement' },
              { icon: Headphones, label: 'Online Support', rate: '24/7', desc: 'Round-the-clock technical assistance' },
              { icon: Award, label: 'Certification', rate: '100%', desc: 'Industry-recognized certificates' },
              { icon: Users, label: 'Mentorship', rate: '1:1', desc: 'Personal guidance from experts' },
              { icon: MessageCircle, label: 'Communication', rate: '100%', desc: 'Clear and effective interaction' },
              { icon: BookMarked, label: 'Content Quality', rate: 'A+', desc: 'Premium educational materials' },
              { icon: GraduationCap, label: 'Graduation Rate', rate: '98%', desc: 'Successful program completion' },
              { icon: Heart, label: 'Student Satisfaction', rate: '4.9/5', desc: 'Exceptional learning experience' },
            ].map((item, i) => (
              <div className="col-lg-4 col-md-6 mb-4" key={i}>
                <div className={`card bg-transparent border-0 h-100 ${isVisible['why-choose'] ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="card-body text-center p-4">
                    <div className="bg-warning rounded-circle p-3 d-inline-flex mb-3">
                      <item.icon className="text-dark" size={32} />
                    </div>
                    <h4 className="fw-bold text-warning mb-2">{item.rate}</h4>
                    <h6 className="fw-semibold mb-2">{item.label}</h6>
                    <p className="text-light small mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-warning">
        <div className="container">
          <div className="text-center">
            <h2 className="display-6 fw-bold text-dark mb-3">Ready to Transform Your Career?</h2>
            <p className="lead text-dark mb-4">Join thousands of successful professionals who started with 4Ducate</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-dark btn-sm btn-md-lg px-3 px-lg-5 py-2">
                <Rocket className="me-2" size={15} />
                Start Your Journey
              </button>
              <button className="btn btn-outline-dark btn-sm btn-md-lg px-3 px-lg-5 py-2">
                <Calendar className="me-2" size={15} />
                Book Free Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .hover-card {
          transition: all 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
        }
        
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .bg-gradient-success {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        
        .bg-gradient-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .opacity-0 {
          opacity: 0;
        }
        
        .animate__animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        
        .animate__fadeIn {
          animation-name: fadeIn;
        }
        
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        
        .animate__fadeInLeft {
          animation-name: fadeInLeft;
        }
        
        .animate__fadeInRight {
          animation-name: fadeInRight;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* Responsive Button Styles */
        .btn-md-lg {
          font-size: 0.875rem !important; /* Smaller size for mobile */
          padding: 0.25rem 0.75rem !important;
        }
        @media (min-width: 992px) {
          .btn-md-lg {
            font-size: 1rem !important; /* Medium size for larger screens */
            padding: 0.5rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}