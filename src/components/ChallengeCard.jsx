import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const ChallengeCard = ({ title, tags, level, image, progress, duration, instructor, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const levelColors = {
    'Beginner': { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' },
    'Intermediate': { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
    'Advanced': { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' }
  };

  const progressColor = progress >= 80 ? '#10b981' : progress >= 50 ? '#f59e0b' : '#3b82f6';

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 mb-4">
      <div
        className="card h-100 border-0 position-relative overflow-hidden"
        style={{
          borderRadius: '20px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? (isDark ? '0 25px 50px rgba(102, 126, 234, 0.3)' : '0 25px 50px rgba(0,0,0,0.15)')
            : (isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)'),
          background: isDark
            ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={image}
            className="card-img-top"
            alt="Challenge preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
              opacity: isHovered ? 1 : 0.8,
              transition: 'opacity 0.3s ease'
            }}
          ></div>
          <span
            className="badge position-absolute top-0 end-0 m-3 px-3 py-2"
            style={{
              backgroundColor: levelColors[level]?.bg || levelColors['Intermediate'].bg,
              color: levelColors[level]?.text || levelColors['Intermediate'].text,
              border: `1px solid ${levelColors[level]?.border || levelColors['Intermediate'].border}`,
              fontSize: '12px',
              fontWeight: '600',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}
          >
            {level}
          </span>
          <div className="position-absolute bottom-0 start-0 w-100 p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-white fw-semibold" style={{ fontSize: '13px' }}>
                Progress: {progress}%
              </span>
              <span className="text-white opacity-75" style={{ fontSize: '12px' }}>
                {duration}
              </span>
            </div>
            <div
              className="progress"
              style={{
                height: '6px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255,255,255,0.3)'
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progressColor,
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }}
              ></div>
            </div>
          </div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              transform: 'translate(-50%, -50%)'
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
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              <i className="bi bi-play-fill" style={{ fontSize: '24px', marginLeft: '3px' }}></i>
            </div>
          </div>
        </div>
        <div className="card-body d-flex flex-column p-4">
          <h5
            className="card-title mb-3"
            style={{
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontWeight: '700',
              fontSize: '18px',
              lineHeight: '1.4',
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </h5>
          <div className="d-flex align-items-center mb-3 pb-3" style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '12px'
              }}
            >
              {instructor.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold" style={{ fontSize: '14px', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                {instructor}
              </div>
              <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}>
                Challenge Mentor
              </div>
            </div>
          </div>
          <div className="mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="badge me-2 mb-1"
                style={{
                  background: isDark ? 'rgba(102, 126, 234, 0.15)' : 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
                  color: isDark ? '#a5b4fc' : '#0277bd',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: isDark ? 'none' : '1px solid #81d4fa'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            className="btn mt-auto fw-bold text-uppercase border-0"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(59, 130, 246, 0.1)',
              color: isHovered ? 'white' : '#667eea',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '13px',
              letterSpacing: '0.5px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isHovered ? '0 8px 24px rgba(102, 126, 234, 0.4)' : 'none'
            }}
            onClick={() => navigate('/dashboard/challengesprocess', { state: { challengeIndex: index } })}
          >
            <i className="bi bi-bookmark me-2"></i>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const { isDark } = useTheme();

  const challenges = [
    {
      title: "Responsive Card Design",
      tags: ["UI/UX", "React", "CSS"],
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 0,
      duration: "2h 30m",
      instructor: "Sarah Wilson",
    },
    {
      title: "API Integration Challenge",
      tags: ["JavaScript", "REST", "Node.js"],
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 0,
      duration: "4h 15m",
      instructor: "Michael Chen",
    },
    {
      title: "Authentication System",
      tags: ["Security", "React", "Firebase"],
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 0,
      duration: "3h 45m",
      instructor: "David Rodriguez",
    },
    {
      title: "Data Visualization",
      tags: ["D3.js", "React", "Data"],
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 0,
      duration: "3h 00m",
      instructor: "Emily Watson",
    },
    {
      title: "HTML & CSS Basics",
      tags: ["HTML", "CSS", "Web"],
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 0,
      duration: "1h 30m",
      instructor: "Alex Johnson",
    },
    {
      title: "Python for Beginners",
      tags: ["Python", "Programming", "Basics"],
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      progress: 0,
      duration: "2h 00m",
      instructor: "Lisa Park",
    },
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || challenge.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

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
          padding: '30px 20px',
          minHeight: '100vh'
        }}
      >
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
              Coding Challenges
            </h1>
            <p
              style={{
                color: isDark ? '#94a3b8' : '#64748b',
                fontSize: '16px',
                maxWidth: '500px',
                margin: '0 auto'
              }}
            >
              Test your skills with practical coding challenges and earn certificates
            </p>
          </div>

          {/* Search and Filter Section */}
          <div
            style={{
              background: isDark
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              padding: '20px',
              marginBottom: '32px',
              backdropFilter: 'blur(20px)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
              boxShadow: isDark
                ? '0 8px 30px rgba(0, 0, 0, 0.3)'
                : '0 8px 30px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div className="row align-items-center g-3">
              <div className="col-lg-6">
                <div style={{ position: 'relative' }}>
                  <i
                    className="bi bi-search"
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: isDark ? '#94a3b8' : '#64748b',
                      fontSize: '16px'
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search challenges..."
                    style={{
                      width: '100%',
                      padding: '14px 16px 14px 48px',
                      borderRadius: '12px',
                      border: isDark
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid #e2e8f0',
                      background: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                      color: isDark ? '#f1f5f9' : '#1e293b',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end'
                  }}
                >
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      style={{
                        background: selectedLevel === level
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                        color: selectedLevel === level
                          ? 'white'
                          : isDark ? '#94a3b8' : '#64748b',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Challenges Count */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}
          >
            <h4
              style={{
                color: isDark ? '#f1f5f9' : '#1e293b',
                fontWeight: '700',
                fontSize: '20px',
                margin: 0
              }}
            >
              All Challenges
            </h4>
            <span
              style={{
                background: isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)',
                color: '#667eea',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              {filteredChallenges.length} challenge{filteredChallenges.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Challenges Grid */}
          <div className="row">
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map((challenge, index) => (
                <ChallengeCard key={index} {...challenge} index={index} />
              ))
            ) : (
              <div className="col-12">
                <div
                  style={{
                    textAlign: 'center',
                    padding: '80px 20px',
                    background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '24px',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <i
                    className="bi bi-search"
                    style={{
                      fontSize: '48px',
                      color: isDark ? '#475569' : '#94a3b8',
                      marginBottom: '16px',
                      display: 'block'
                    }}
                  ></i>
                  <h4 style={{ color: isDark ? '#f1f5f9' : '#1e293b', fontWeight: '600', marginBottom: '12px' }}>
                    No Challenges Found
                  </h4>
                  <p style={{ color: isDark ? '#94a3b8' : '#64748b', marginBottom: '24px' }}>
                    Try adjusting your search terms or filters.
                  </p>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                    onClick={() => { setSearchQuery(''); setSelectedLevel('All'); }}
                  >
                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenges;