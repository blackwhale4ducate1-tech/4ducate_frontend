import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BASE_URL } from '../../env';

const Intern = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [internPositions, setInternPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTypes, setAvailableTypes] = useState([]);

  useEffect(() => {
    const fetchInternPositions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getModelData/InternPosition`);
        const data = await response.json();
        setInternPositions(data.data);
        
        // Extract unique types/categories from the data
        const types = [...new Set(data.data
          .filter(position => position.active_status)
          .map(position => position.category || position.type)
          .filter(Boolean) // Remove null/undefined values
        )];
        
        setAvailableTypes(types);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching intern positions:', error);
        setLoading(false);
      }
    };

    fetchInternPositions();
  }, []);

  // Dynamic tabs based on available data
  const getDynamicTabs = () => {
    const tabs = [
      { id: 'all', label: 'All Positions', icon: 'bi-grid' }
    ];
    
    // Add tabs for each unique type/category found in data
    availableTypes.forEach(type => {
      tabs.push({
        id: type.toLowerCase().replace(/\s+/g, '-'),
        label: type,
        icon: getIconForType(type)
      });
    });
    
    return tabs;
  };

  // Get appropriate icon based on internship type
  const getIconForType = (type) => {
    const typeStr = type.toLowerCase();
    if (typeStr.includes('frontend') || typeStr.includes('front-end')) return 'bi-code-slash';
    if (typeStr.includes('backend') || typeStr.includes('back-end')) return 'bi-server';
    if (typeStr.includes('fullstack') || typeStr.includes('full-stack')) return 'bi-layers';
    if (typeStr.includes('mobile')) return 'bi-phone';
    if (typeStr.includes('ui') || typeStr.includes('ux')) return 'bi-palette';
    if (typeStr.includes('data')) return 'bi-bar-chart';
    if (typeStr.includes('devops')) return 'bi-gear';
    if (typeStr.includes('qa') || typeStr.includes('test')) return 'bi-bug';
    if (typeStr.includes('ml') || typeStr.includes('ai')) return 'bi-robot';
    return 'bi-code-square'; // default icon
  };

  const getCurrentPositions = () => {
    // Start with all active positions
    let positions = internPositions.filter(position => position.active_status);

    // Filter by selected tab (if not 'all')
    if (activeTab !== 'all') {
      positions = positions.filter(position => {
        const positionType = (position.category || position.type || '').toLowerCase();
        const tabType = activeTab.replace(/-/g, ' ');
        return positionType.includes(tabType) || positionType === tabType;
      });
    }

    // Apply search filter if search term exists
    if (searchTerm) {
      positions = positions.filter(position => 
        position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (position.requirements && position.requirements.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (position.category && position.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (position.location && position.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return positions;
  };

  // Get badge color based on type
  const getBadgeColor = (type) => {
    if (!type) return 'bg-secondary bg-opacity-10 text-secondary';
    
    const typeStr = type.toLowerCase();
    if (typeStr.includes('frontend') || typeStr.includes('front-end')) return 'bg-primary bg-opacity-10 text-primary';
    if (typeStr.includes('backend') || typeStr.includes('back-end')) return 'bg-success bg-opacity-10 text-success';
    if (typeStr.includes('fullstack') || typeStr.includes('full-stack')) return 'bg-warning bg-opacity-10 text-warning';
    if (typeStr.includes('mobile')) return 'bg-info bg-opacity-10 text-info';
    if (typeStr.includes('data')) return 'bg-purple bg-opacity-10 text-purple';
    return 'bg-dark bg-opacity-10 text-dark';
  };

  const dynamicTabs = getDynamicTabs();
  const currentPositions = getCurrentPositions();

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h2 className="text-primary fw-bold mb-2">
                      <i className="bi bi-briefcase me-2"></i>
                      Internship Opportunities
                    </h2>
                    <p className="text-muted mb-0">Find your perfect internship match</p>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-search text-muted"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control border-start-0 ps-0" 
                        placeholder="Search internships..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        {dynamicTabs.length > 1 && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="nav-wrapper" style={{ overflowX: 'auto' }}>
                <ul className="nav nav-pills d-flex flex-nowrap gap-2" style={{ minWidth: 'fit-content' }}>
                  {dynamicTabs.map(tab => (
                    <li key={tab.id} className="nav-item flex-shrink-0">
                      <button 
                        className={`nav-link rounded-pill px-4 py-2 fw-semibold ${
                          activeTab === tab.id 
                            ? 'active bg-primary text-white' 
                            : 'bg-white text-primary border border-primary'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <i className={`bi ${tab.icon} me-2`}></i>
                        {tab.label}
                        {tab.id !== 'all' && (
                          <span className="badge bg-light text-dark ms-2">
                            {internPositions.filter(p => 
                              p.active_status && 
                              (p.category || p.type || '').toLowerCase().includes(tab.id.replace(/-/g, ' '))
                            ).length}
                          </span>
                        )}
                        {tab.id === 'all' && (
                          <span className="badge bg-light text-dark ms-2">
                            {internPositions.filter(p => p.active_status).length}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="row mb-3">
          <div className="col-12">
            <p className="text-muted mb-0">
              <i className="bi bi-info-circle me-2"></i>
              Showing {currentPositions.length} of {internPositions.filter(p => p.active_status).length} active positions
              {searchTerm && ` for "${searchTerm}"`}
              {activeTab !== 'all' && ` in ${dynamicTabs.find(t => t.id === activeTab)?.label}`}
            </p>
          </div>
        </div>

        {/* Internship Cards */}
        <div className="row">
          {loading ? (
            <div className="col-12">
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mt-3">Loading internship positions...</p>
                </div>
              </div>
            </div>
          ) : currentPositions.length > 0 ? (
            currentPositions.map((position) => (
              <div key={position.id} className="col-lg-6 col-xl-4 mb-4">
                <div className="card h-100 shadow-sm border-0 rounded-3 hover-card">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className={`badge rounded-pill ${getBadgeColor(position.category || position.type)}`}>
                        {position.category || position.type || 'Internship'}
                      </span>
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {position.location || 'Remote'}
                      </small>
                    </div>
                    
                    <h5 className="card-title text-dark fw-bold mb-3">
                      {position.title}
                    </h5>
                    
                    <p className="card-text text-muted small mb-4" style={{ minHeight: '60px' }}>
                      <i className="bi bi-check-circle text-success me-2"></i>
                      {position.requirements || 'No specific requirements listed'}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="d-grid">
                        <a 
                          href={position.applyLink || '#'} 
                          className="btn btn-primary rounded-pill py-2 fw-semibold"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-arrow-right-circle me-2"></i>
                          Apply Now
                        </a>
                      </div>
                      <small className="text-muted d-block text-center mt-2">
                        <i className="bi bi-calendar me-1"></i>
                        Posted: {new Date(position.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body text-center py-5">
                  <i className="bi bi-search display-1 text-muted mb-3"></i>
                  <h4 className="text-muted">No internships found</h4>
                  <p className="text-muted">
                    {searchTerm 
                      ? `No results found for "${searchTerm}". Try different keywords or clear the search.`
                      : activeTab !== 'all' 
                        ? `No positions available in ${dynamicTabs.find(t => t.id === activeTab)?.label}. Try other categories.`
                        : 'No active internship positions available at the moment.'
                    }
                  </p>
                  {(searchTerm || activeTab !== 'all') && (
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setSearchTerm('');
                        setActiveTab('all');
                      }}
                    >
                      Show All Positions
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-3 bg-primary bg-opacity-5">
              <div className="card-body p-4">
                <div className="row text-center">
                  <div className="col-md-3 mb-3 mb-md-0">
                    <h3 className="text-primary fw-bold mb-1">
                      {internPositions.filter(p => p.active_status).length}
                    </h3>
                    <p className="text-muted mb-0">Active Positions</p>
                  </div>
                  <div className="col-md-3 mb-3 mb-md-0">
                    <h3 className="text-success fw-bold mb-1">
                      {availableTypes.length}
                    </h3>
                    <p className="text-muted mb-0">Categories</p>
                  </div>
                  <div className="col-md-3 mb-3 mb-md-0">
                    <h3 className="text-warning fw-bold mb-1">95%</h3>
                    <p className="text-muted mb-0">Success Rate</p>
                  </div>
                  <div className="col-md-3">
                    <h3 className="text-info fw-bold mb-1">24/7</h3>
                    <p className="text-muted mb-0">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        .nav-link {
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .nav-link:not(.active):hover {
          background-color: #e3f2fd !important;
          transform: translateY(-2px);
        }
        .btn-primary {
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
        }
        .input-group-text {
          background-color: #f8f9fa !important;
        }
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
        }
        .nav-wrapper {
          scrollbar-width: thin;
          scrollbar-color: #ccc transparent;
        }
        .nav-wrapper::-webkit-scrollbar {
          height: 6px;
        }
        .nav-wrapper::-webkit-scrollbar-track {
          background: transparent;
        }
        .nav-wrapper::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 3px;
        }
        .bg-purple {
          background-color: #6f42c1 !important;
        }
        .text-purple {
          color: #6f42c1 !important;
        }
      `}</style>
    </div>
  );
};

export default Intern;