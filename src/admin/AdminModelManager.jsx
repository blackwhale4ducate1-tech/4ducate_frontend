import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { BASE_URL } from '../../env';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminModelManager = () => {
  const { modelName } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('view');
  const [modelData, setModelData] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedRecordId, setSelectedRecordId] = useState('');
  const [actionType, setActionType] = useState('Add');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const availableModels = [
    'UserDetails',
    'Course',
    'EnrolledCourse',
    'Challenge',
    'ChallengeSubmission',
    'Community',
    'EnrolledCommunity',
    'InternPosition',
    'ApplicationHistory',
    'Roles',
    'StaffDetails'
  ];

  const modelFields = {
    UserDetails: [
      { name: 'fullName', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', required: true },
      { name: 'dob', type: 'date', required: false },
      { name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'], required: false },
      { name: 'address', type: 'textarea', required: false },
      { name: 'city', type: 'text', required: false },
      { name: 'state', type: 'text', required: false },
      { name: 'pincode', type: 'text', required: false },
      { name: 'qualification', type: 'text', required: false },
      { name: 'department', type: 'text', required: false },
      { name: 'university', type: 'text', required: false },
      { name: 'passoutYear', type: 'text', required: false },
      { name: 'skills', type: 'textarea', required: false },
      { name: 'experience', type: 'text', required: false },
      { name: 'githubLink', type: 'url', required: false },
      { name: 'linkedinLink', type: 'url', required: false },
      { name: 'resumeLink', type: 'url', required: false },
      { name: 'profilePhoto', type: 'url', required: false },
      { name: 'coverLetter', type: 'textarea', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    Course: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: false },
      { name: 'category', type: 'select', options: ['Programming', 'Design', 'Business', 'Marketing', 'Data Science'], required: false },
      { name: 'subcategory', type: 'text', required: false },
      { name: 'level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'], required: false },
      { name: 'duration', type: 'text', required: false },
      { name: 'instructorName', type: 'text', required: false },
      { name: 'instructorEmail', type: 'email', required: false },
      { name: 'syllabus', type: 'textarea', required: false },
      { name: 'language', type: 'text', required: false },
      { name: 'tags', type: 'text', required: false },
      { name: 'price', type: 'number', required: false },
      { name: 'discount', type: 'number', required: false },
      { name: 'videoUrl', type: 'url', required: false },
      { name: 'thumbnailUrl', type: 'url', required: false },
      { name: 'materialLink', type: 'url', required: false },
      { name: 'prerequisites', type: 'textarea', required: false },
      { name: 'outcomes', type: 'textarea', required: false },
      { name: 'certification', type: 'checkbox', required: false },
      { name: 'publishedDate', type: 'date', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    Challenge: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      { name: 'difficulty', type: 'select', options: ['Easy', 'Medium', 'Hard'], required: true },
      { name: 'points', type: 'number', required: true },
      { name: 'timeLimit', type: 'number', required: false },
      { name: 'category', type: 'text', required: false },
      { name: 'tags', type: 'text', required: false },
      { name: 'startDate', type: 'datetime-local', required: false },
      { name: 'endDate', type: 'datetime-local', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    Community: [
      { name: 'name', type: 'text', required: true },
      { name: 'slug', type: 'text', required: false },
      { name: 'description', type: 'textarea', required: false },
      { name: 'category', type: 'text', required: false },
      { name: 'rules', type: 'textarea', required: false },
      { name: 'tags', type: 'text', required: false },
      { name: 'bannerImage', type: 'url', required: false },
      { name: 'logoUrl', type: 'url', required: false },
      { name: 'location', type: 'text', required: false },
      { name: 'contactEmail', type: 'email', required: false },
      { name: 'createdBy', type: 'number', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    InternPosition: [
      { name: 'title', type: 'text', required: true },
      { name: 'requirements', type: 'textarea', required: false },
      { name: 'location', type: 'text', required: false },
      { name: 'type', type: 'select', options: ['Full-time', 'Part-time', 'Remote'], required: false },
      { name: 'applyLink', type: 'url', required: false },
      { name: 'category', type: 'text', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ]
  };

  // Fetch model data
  const fetchModelData = async () => {
    if (!modelName) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/admin/getModelData/${modelName}`);
      const responseData = await response.json();
      if (response.ok) {
        setModelData(responseData.data || []);
      } else {
        console.error('Error fetching model data:', responseData);
        alert(`Error: ${responseData.message || 'Failed to fetch model data'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: Please check your connection and try again');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModelData();
    setFormData({});
    setSelectedRecordId('');
    setActionType('Add');
  }, [modelName]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRecordSelect = (e) => {
    const recordId = e.target.value;
    setSelectedRecordId(recordId);
    const selectedRecord = modelData.find((record) => record.id === parseInt(recordId));
    if (selectedRecord) {
      setFormData(selectedRecord);
    } else {
      setFormData({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedData = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== '' && value !== null && value !== undefined) {
        const field = modelFields[modelName]?.find((f) => f.name === key);
        if (field && field.type === 'number' && typeof value === 'string') {
          cleanedData[key] = parseFloat(value) || value;
        } else {
          cleanedData[key] = value;
        }
      }
    });

    const payload = {
      model: modelName,
      type: actionType,
      id: actionType === 'Edit' ? selectedRecordId : undefined,
      ...cleanedData,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/admin/addDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(`${actionType} successful!`);
        setFormData({});
        setSelectedRecordId('');
        fetchModelData(); // Refresh data
        setActiveTab('view'); // Switch to view tab
      } else {
        console.error('Error response:', responseData);
        alert(`Error: ${responseData.error || 'Failed to submit data'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: Please check your connection and try again');
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (field) => {
    const fieldValue = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            className={`form-control ${isDark ? 'bg-dark text-light border-secondary' : ''}`}
            name={field.name}
            value={fieldValue}
            onChange={handleInputChange}
            required={field.required}
            rows="3"
            placeholder={`Enter ${field.name.replace(/([A-Z])/g, ' $1').trim()}`}
          />
        );
      case 'checkbox':
        return (
          <div className="form-check">
            <input
              id={field.name}
              type="checkbox"
              className="form-check-input"
              name={field.name}
              checked={fieldValue || false}
              onChange={handleInputChange}
            />
            <label className={`form-check-label ${isDark ? 'text-light' : ''}`} htmlFor={field.name}>
              {field.name.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          </div>
        );
      case 'select':
        return (
          <select
            id={field.name}
            className={`form-select ${isDark ? 'bg-dark text-light border-secondary' : ''}`}
            name={field.name}
            value={fieldValue}
            onChange={handleInputChange}
            required={field.required}
          >
            <option value="">Select {field.name.replace(/([A-Z])/g, ' $1').trim()}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            id={field.name}
            type={field.type}
            className={`form-control ${isDark ? 'bg-dark text-light border-secondary' : ''}`}
            name={field.name}
            value={fieldValue}
            onChange={handleInputChange}
            required={field.required}
            placeholder={`Enter ${field.name.replace(/([A-Z])/g, ' $1').trim()}`}
          />
        );
    }
  };

  const filteredData = modelData.filter((record) => {
    if (!searchTerm) return true;
    const searchFields = ['name', 'title', 'fullName', 'email', 'roleName'];
    return searchFields.some(field => 
      record[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (!modelName) {
    return (
      <div className={`container-fluid p-4 ${isDark ? 'bg-dark text-light' : 'bg-light'}`}>
        <div className="row">
          <div className="col-12">
            <h2>Select a Model to Manage</h2>
            <div className="row mt-4">
              {availableModels.map((model) => (
                <div key={model} className="col-md-4 col-lg-3 mb-3">
                  <div 
                    className={`card h-100 ${isDark ? 'bg-secondary text-light' : 'bg-white'} cursor-pointer`}
                    onClick={() => navigate(`/admin/manage/${model}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body text-center">
                      <i className="bi bi-database-fill fs-1 text-primary mb-3"></i>
                      <h5 className="card-title">{model}</h5>
                      <p className="card-text small">Manage {model} records</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container-fluid p-4 ${isDark ? 'bg-dark text-light' : 'bg-light'}`}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-0">Manage {modelName}</h2>
              <p className="text-muted mb-0">Add, edit, and view {modelName} records</p>
            </div>
            <div>
              <select 
                className={`form-select ${isDark ? 'bg-dark text-light border-secondary' : ''}`}
                value={modelName}
                onChange={(e) => navigate(`/admin/manage/${e.target.value}`)}
              >
                {availableModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'view' ? 'active' : ''} ${isDark ? 'text-light' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            <i className="bi bi-table me-2"></i>View Records ({modelData.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'add' ? 'active' : ''} ${isDark ? 'text-light' : ''}`}
            onClick={() => {
              setActiveTab('add');
              setActionType('Add');
              setFormData({});
              setSelectedRecordId('');
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>Add New
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'edit' ? 'active' : ''} ${isDark ? 'text-light' : ''}`}
            onClick={() => {
              setActiveTab('edit');
              setActionType('Edit');
              setFormData({});
              setSelectedRecordId('');
            }}
          >
            <i className="bi bi-pencil-square me-2"></i>Edit Record
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {/* View Records Tab */}
        {activeTab === 'view' && (
          <div className="tab-pane active">
            <div className={`card ${isDark ? 'bg-secondary text-light' : 'bg-white'}`}>
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="mb-0">All {modelName} Records</h5>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control ${isDark ? 'bg-dark text-light border-secondary' : ''}`}
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : filteredData.length > 0 ? (
                  <div className="table-responsive">
                    <table className={`table table-striped ${isDark ? 'table-dark' : ''}`}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          {modelFields[modelName]?.slice(0, 6).map((field) => (
                            <th key={field.name}>{field.name.replace(/([A-Z])/g, ' $1').trim()}</th>
                          ))}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((record) => (
                          <tr key={record.id}>
                            <td><strong>{record.id}</strong></td>
                            {modelFields[modelName]?.slice(0, 6).map((field) => (
                              <td key={field.name}>
                                {field.type === 'checkbox'
                                  ? (record[field.name] ? 
                                      <span className="badge bg-success">Yes</span> : 
                                      <span className="badge bg-secondary">No</span>)
                                  : field.type === 'url' && record[field.name]
                                    ? <a href={record[field.name]} target="_blank" rel="noopener noreferrer" className="text-primary">View</a>
                                    : (record[field.name] ? 
                                        (record[field.name].toString().length > 50 ? 
                                          record[field.name].toString().substring(0, 50) + '...' : 
                                          record[field.name]) : 
                                        '-')}
                              </td>
                            ))}
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => {
                                  setSelectedRecordId(record.id.toString());
                                  setFormData(record);
                                  setActionType('Edit');
                                  setActiveTab('edit');
                                }}
                              >
                                <i className="bi bi-pencil"></i> Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <i className="bi bi-inbox fs-1 text-muted"></i>
                    <p className="text-muted mt-2">No records found for {modelName}</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setActiveTab('add')}
                    >
                      <i className="bi bi-plus-circle me-2"></i>Add First Record
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Form Tab */}
        {(activeTab === 'add' || activeTab === 'edit') && (
          <div className="tab-pane active">
            <div className={`card ${isDark ? 'bg-secondary text-light' : 'bg-white'}`}>
              <div className="card-header">
                <h5 className="mb-0">
                  <i className={`bi ${actionType === 'Add' ? 'bi-plus-circle' : 'bi-pencil-square'} me-2`}></i>
                  {actionType} {modelName}
                </h5>
              </div>
              <div className="card-body">
                {actionType === 'Edit' && (
                  <div className="mb-4">
                    <label htmlFor="recordSelect" className="form-label">
                      <strong>Select Record to Edit</strong>
                    </label>
                    <select
                      id="recordSelect"
                      className={`form-select ${isDark ? 'bg-dark text-light border-secondary' : ''}`}
                      value={selectedRecordId}
                      onChange={handleRecordSelect}
                    >
                      <option value="">Select a record</option>
                      {modelData.map((record) => (
                        <option key={record.id} value={record.id}>
                          {record.id} - {record.name || record.title || record.fullName || record.roleName || `Record ${record.id}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {modelFields[modelName]?.map((field) => (
                      <div className="col-md-6 mb-3" key={field.name}>
                        <label htmlFor={field.name} className="form-label">
                          <strong>{field.name.replace(/([A-Z])/g, ' $1').trim()}</strong>
                          {field.required && <span className="text-danger ms-1">*</span>}
                        </label>
                        {renderFormField(field)}
                      </div>
                    ))}
                  </div>
                  
                  <div className="d-flex gap-2 mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          {actionType === 'Add' ? 'Adding...' : 'Updating...'}
                        </>
                      ) : (
                        <>
                          <i className={`bi ${actionType === 'Add' ? 'bi-plus-circle' : 'bi-check-circle'} me-2`}></i>
                          {actionType} {modelName}
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setFormData({});
                        setSelectedRecordId('');
                      }}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModelManager;
