import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import apiClient from '../utils/apiClient';

const CommunityCard = ({ community, onViewClan }) => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': '#667eea',
      'Design': '#f472b6',
      'Business': '#34d399',
      'Marketing': '#fbbf24',
      'Science': '#60a5fa',
      'Arts': '#a78bfa',
      'Education': '#4ade80',
      'Gaming': '#f87171',
      'Sports': '#fb923c',
      'Other': '#94a3b8'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <div
      className="col-lg-4 col-md-6 mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? (isDark ? '0 20px 50px rgba(102, 126, 234, 0.3)' : '0 20px 50px rgba(102, 126, 234, 0.2)')
            : (isDark ? '0 8px 30px rgba(0, 0, 0, 0.4)' : '0 8px 30px rgba(0, 0, 0, 0.1)'),
          border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Banner Image */}
        <div
          style={{
            height: '140px',
            background: community.bannerImage
              ? `url(${community.bannerImage}) center/cover`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)'
            }}
          />
          {/* Category Badge */}
          <span
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: getCategoryColor(community.category),
              color: 'white',
              fontSize: '11px',
              fontWeight: '600',
              padding: '4px 12px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
          >
            {community.category || 'Community'}
          </span>
        </div>

        {/* Logo Overlay */}
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '16px',
            background: community.logoUrl
              ? `url(${community.logoUrl}) center/cover`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '100px',
            left: '20px',
            border: `4px solid ${isDark ? '#1e293b' : '#ffffff'}`,
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
          }}
        >
          {!community.logoUrl && (
            <span style={{ fontSize: '28px' }}>👥</span>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '50px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h5
            style={{
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontWeight: '700',
              fontSize: '18px',
              marginBottom: '8px',
              letterSpacing: '-0.3px'
            }}
          >
            {community.name}
          </h5>
          <p
            style={{
              color: isDark ? '#94a3b8' : '#64748b',
              fontSize: '13px',
              marginBottom: '16px',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1
            }}
          >
            {community.description || 'Join our community and connect with like-minded learners!'}
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>👥</span>
              <span
                style={{
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                {community.memberCount || community.members?.length || 0} members
              </span>
            </div>
            {community.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px' }}>📍</span>
                <span
                  style={{
                    color: isDark ? '#94a3b8' : '#64748b',
                    fontSize: '12px'
                  }}
                >
                  {community.location}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {community.tags && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '16px'
              }}
            >
              {community.tags.split(',').slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  style={{
                    background: isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)',
                    color: isDark ? '#a5b4fc' : '#667eea',
                    fontSize: '11px',
                    fontWeight: '500',
                    padding: '4px 10px',
                    borderRadius: '12px'
                  }}
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() => onViewClan(community.id)}
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)',
              color: isHovered ? 'white' : '#667eea',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '600',
              width: '100%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isHovered ? '0 8px 24px rgba(102, 126, 234, 0.4)' : 'none'
            }}
          >
            <span>View Clan</span>
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

const CommunityGrid = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAll, setShowAll] = useState(false);
  const INITIAL_LIMIT = 6; // Show 6 clans initially (2 rows of 3)

  const categories = [
    'All',
    'Technology',
    'Design',
    'Business',
    'Marketing',
    'Science',
    'Arts',
    'Education',
    'Gaming',
    'Sports',
    'Other'
  ];

  useEffect(() => {
    fetchCommunities();
  }, [selectedCategory, searchQuery]);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);

      const response = await apiClient.get(`/api/communities?${params.toString()}`);
      if (response.data.success) {
        setCommunities(response.data.data || []);
      } else {
        setError(response.data.message || 'Failed to fetch communities');
      }
    } catch (err) {
      console.error('Error fetching communities:', err);
      setError('Failed to load communities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewClan = (id) => {
    navigate(`/dashboard/community/${id}`);
  };

  const handleCreateClan = () => {
    navigate('/dashboard/create-clan');
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

      <div
        style={{
          minHeight: '100vh',
          padding: '30px 20px'
        }}
      >
        <div className="container">
          {/* Header Section */}
          <div
            style={{
              marginBottom: '40px',
              textAlign: 'center'
            }}
          >
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
              Discover Clans
            </h1>
            <p
              style={{
                color: isDark ? '#94a3b8' : '#64748b',
                fontSize: '16px',
                maxWidth: '500px',
                margin: '0 auto 24px'
              }}
            >
              Join communities of learners, share knowledge, and grow together
            </p>

            {/* Create Clan Button */}
            <button
              onClick={handleCreateClan}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.02)';
                e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
              }}
            >
              <i className="bi bi-plus-circle-fill"></i>
              Create Your Clan
            </button>
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
                <div
                  style={{
                    position: 'relative'
                  }}
                >
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
                    placeholder="Search clans by name or topic..."
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
                  {categories.slice(0, 6).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                      style={{
                        background: (selectedCategory === cat || (cat === 'All' && !selectedCategory))
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                        color: (selectedCategory === cat || (cat === 'All' && !selectedCategory))
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
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px'
              }}
            >
              <div
                className="spinner-border"
                style={{
                  color: '#667eea',
                  width: '50px',
                  height: '50px'
                }}
              />
              <p
                style={{
                  color: isDark ? '#94a3b8' : '#64748b',
                  marginTop: '16px',
                  fontSize: '14px'
                }}
              >
                Loading communities...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}
            >
              <i
                className="bi bi-exclamation-circle"
                style={{
                  fontSize: '48px',
                  color: '#ef4444',
                  marginBottom: '16px',
                  display: 'block'
                }}
              />
              <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>
              <button
                onClick={fetchCommunities}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 24px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && communities.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                borderRadius: '24px',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  opacity: 0.6
                }}
              >
                <i className="bi bi-people" style={{ fontSize: '40px', color: 'white' }}></i>
              </div>
              <h4
                style={{
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  marginBottom: '12px',
                  fontWeight: '600'
                }}
              >
                No Clans Found
              </h4>
              <p
                style={{
                  color: isDark ? '#94a3b8' : '#64748b',
                  marginBottom: '24px'
                }}
              >
                Be the first to create a clan and build your community!
              </p>
              <button
                onClick={handleCreateClan}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                }}
              >
                <i className="bi bi-plus-circle-fill"></i>
                Create First Clan
              </button>
            </div>
          )}

          {/* Communities Grid */}
          {!loading && !error && communities.length > 0 && (
            <>
              <div className="row">
                {(showAll ? communities : communities.slice(0, INITIAL_LIMIT)).map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    onViewClan={handleViewClan}
                  />
                ))}
              </div>

              {/* View All / Show Less Button */}
              {communities.length > INITIAL_LIMIT && (
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                  <button
                    onClick={() => setShowAll(!showAll)}
                    style={{
                      background: showAll
                        ? isDark ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: showAll ? (isDark ? '#94a3b8' : '#64748b') : 'white',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '14px 32px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: showAll ? 'none' : '0 8px 30px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {showAll ? (
                      <>
                        <i className="bi bi-chevron-up"></i>
                        Show Less
                      </>
                    ) : (
                      <>
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                        View All Clans ({communities.length})
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityGrid;