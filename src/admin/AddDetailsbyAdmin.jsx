import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from '../../env';

const AdminPage = () => {
  const [model, setModel] = useState('');
  const [actionType, setActionType] = useState('Add');
  const [formData, setFormData] = useState({});
  const [modelData, setModelData] = useState([]);
  const [selectedRecordId, setSelectedRecordId] = useState('');
  const [activeTab, setActiveTab] = useState('addEdit');

  // Lookup data for foreign key relations
  const [lookupData, setLookupData] = useState({
    users: [],
    courses: [],
    communities: [],
    roles: [],
    internPositions: []
  });

  const models = [
    'ApplicationHistory',
    'Community',
    'Course',
    'EnrolledCommunity',
    'EnrolledCourse',
    'InternPosition',
    'Roles',
    'StaffDetails',
    'UserDetails',
    'Challenge',
    'ChallengeSubmission',
    'JobDescription',
    'CommunityPost'
  ];

  // Field definitions with select options for foreign keys
  const modelFields = {
    ApplicationHistory: [
      { name: 'userId', type: 'select', required: true, lookup: 'users' },
      { name: 'internPositionId', type: 'select', required: true, lookup: 'internPositions' },
      { name: 'appliedAt', type: 'datetime-local', required: false },
    ],
    Community: [
      { name: 'name', type: 'text', required: true },
      { name: 'slug', type: 'text', required: false },
      { name: 'description', type: 'textarea', required: false },
      { name: 'category', type: 'text', required: false },
      { name: 'rules', type: 'textarea', required: false },
      { name: 'tags', type: 'text', required: false },
      { name: 'bannerImage', type: 'text', required: false },
      { name: 'logoUrl', type: 'text', required: false },
      { name: 'location', type: 'text', required: false },
      { name: 'contactEmail', type: 'email', required: false },
      { name: 'createdBy', type: 'select', required: false, lookup: 'users' },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    CommunityPost: [
      { name: 'communityId', type: 'select', required: true, lookup: 'communities' },
      { name: 'userId', type: 'select', required: true, lookup: 'users' },
      { name: 'title', type: 'text', required: true },
      { name: 'content', type: 'textarea', required: false },
      { name: 'postType', type: 'text', required: false },
      { name: 'mediaUrl', type: 'text', required: false },
      { name: 'linkUrl', type: 'text', required: false },
      { name: 'isPinned', type: 'checkbox', required: false },
      { name: 'isActive', type: 'checkbox', required: false },
    ],
    Course: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: false },
      { name: 'category', type: 'text', required: false },
      { name: 'subcategory', type: 'text', required: false },
      { name: 'level', type: 'text', required: false },
      { name: 'duration', type: 'text', required: false },
      { name: 'instructorName', type: 'text', required: false },
      { name: 'instructorEmail', type: 'email', required: false },
      { name: 'syllabus', type: 'textarea', required: false },
      { name: 'language', type: 'text', required: false },
      { name: 'tags', type: 'text', required: false },
      { name: 'price', type: 'number', required: false },
      { name: 'discount', type: 'number', required: false },
      { name: 'videoUrl', type: 'text', required: false },
      { name: 'thumbnailUrl', type: 'text', required: false },
      { name: 'materialLink', type: 'text', required: false },
      { name: 'prerequisites', type: 'textarea', required: false },
      { name: 'outcomes', type: 'textarea', required: false },
      { name: 'certification', type: 'checkbox', required: false },
      { name: 'publishedDate', type: 'date', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    Challenge: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: false },
      { name: 'difficulty', type: 'text', required: false },
      { name: 'category', type: 'text', required: false },
      { name: 'points', type: 'number', required: false },
      { name: 'deadline', type: 'datetime-local', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    ChallengeSubmission: [
      { name: 'userId', type: 'select', required: true, lookup: 'users' },
      { name: 'challengeId', type: 'number', required: true },
      { name: 'submissionLink', type: 'text', required: false },
      { name: 'score', type: 'number', required: false },
      { name: 'rank', type: 'number', required: false },
      { name: 'feedback', type: 'textarea', required: false },
    ],
    EnrolledCommunity: [
      { name: 'userId', type: 'select', required: true, lookup: 'users' },
      { name: 'communityId', type: 'select', required: true, lookup: 'communities' },
      { name: 'role', type: 'text', required: false },
      { name: 'joinedAt', type: 'datetime-local', required: false },
    ],
    EnrolledCourse: [
      { name: 'userId', type: 'select', required: true, lookup: 'users' },
      { name: 'courseId', type: 'select', required: true, lookup: 'courses' },
      { name: 'enrolledAt', type: 'datetime-local', required: false },
      { name: 'progressPercent', type: 'number', required: false },
      { name: 'courseFinished', type: 'checkbox', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    InternPosition: [
      { name: 'title', type: 'text', required: true },
      { name: 'requirements', type: 'textarea', required: false },
      { name: 'location', type: 'text', required: false },
      { name: 'type', type: 'text', required: false },
      { name: 'applyLink', type: 'text', required: false },
      { name: 'category', type: 'text', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    JobDescription: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: false },
      { name: 'company', type: 'text', required: false },
      { name: 'location', type: 'text', required: false },
      { name: 'salary', type: 'text', required: false },
      { name: 'type', type: 'text', required: false },
      { name: 'requirements', type: 'textarea', required: false },
      { name: 'applyLink', type: 'text', required: false },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
    Roles: [
      { name: 'roleName', type: 'text', required: true },
    ],
    StaffDetails: [
      { name: 'staffImage', type: 'text', required: false },
      { name: 'name', type: 'text', required: false },
      { name: 'phoneNo', type: 'number', required: false },
      { name: 'emailId', type: 'email', required: false },
      { name: 'username', type: 'text', required: false },
      { name: 'password', type: 'password', required: false },
      { name: 'dob', type: 'date', required: false },
      { name: 'doj', type: 'date', required: false },
      { name: 'gender', type: 'text', required: false },
      { name: 'designation', type: 'text', required: false },
      { name: 'address', type: 'text', required: false },
      { name: 'officeOrField', type: 'text', required: false },
      { name: 'emergencyContact1', type: 'number', required: false },
      { name: 'relationshipWithStaff1', type: 'text', required: false },
      { name: 'emergencyContactName1', type: 'text', required: false },
      { name: 'emergencyContact2', type: 'number', required: false },
      { name: 'relationshipWithStaff2', type: 'text', required: false },
      { name: 'emergencyContactName2', type: 'text', required: false },
      { name: 'alternatePhone', type: 'number', required: false },
      { name: 'state', type: 'text', required: false },
      { name: 'city', type: 'text', required: false },
      { name: 'education', type: 'text', required: false },
      { name: 'roleId', type: 'select', required: false, lookup: 'roles' },
      { name: 'branchId', type: 'number', required: false },
    ],
    UserDetails: [
      { name: 'fullName', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', required: false },
      { name: 'password', type: 'password', required: false },
      { name: 'dob', type: 'date', required: false },
      { name: 'gender', type: 'text', required: false },
      { name: 'address', type: 'text', required: false },
      { name: 'city', type: 'text', required: false },
      { name: 'state', type: 'text', required: false },
      { name: 'pincode', type: 'text', required: false },
      { name: 'qualification', type: 'text', required: false },
      { name: 'department', type: 'text', required: false },
      { name: 'university', type: 'text', required: false },
      { name: 'passoutYear', type: 'text', required: false },
      { name: 'skills', type: 'textarea', required: false },
      { name: 'experience', type: 'text', required: false },
      { name: 'githubLink', type: 'text', required: false },
      { name: 'linkedinLink', type: 'text', required: false },
      { name: 'resumeLink', type: 'text', required: false },
      { name: 'profilePhoto', type: 'text', required: false },
      { name: 'coverLetter', type: 'textarea', required: false },
      { name: 'roleId', type: 'select', required: false, lookup: 'roles' },
      { name: 'active_status', type: 'checkbox', required: false },
    ],
  };

  // Fetch lookup data for dropdowns
  useEffect(() => {
    const fetchLookupData = async () => {
      try {
        const [usersRes, coursesRes, communitiesRes, rolesRes, internRes] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/getModelData/UserDetails`).then(r => r.json()).catch(() => ({ data: [] })),
          fetch(`${BASE_URL}/api/admin/getModelData/Course`).then(r => r.json()).catch(() => ({ data: [] })),
          fetch(`${BASE_URL}/api/admin/getModelData/Community`).then(r => r.json()).catch(() => ({ data: [] })),
          fetch(`${BASE_URL}/api/admin/getModelData/Roles`).then(r => r.json()).catch(() => ({ data: [] })),
          fetch(`${BASE_URL}/api/admin/getModelData/InternPosition`).then(r => r.json()).catch(() => ({ data: [] }))
        ]);

        setLookupData({
          users: usersRes.data || [],
          courses: coursesRes.data || [],
          communities: communitiesRes.data || [],
          roles: rolesRes.data || [],
          internPositions: internRes.data || []
        });
      } catch (error) {
        console.error('Error fetching lookup data:', error);
      }
    };
    fetchLookupData();
  }, []);

  // Helper function to get display name for lookup items
  const getLookupOptions = (lookupType) => {
    switch (lookupType) {
      case 'users':
        return lookupData.users.map(u => ({ id: u.id, label: `${u.fullName || u.email}` }));
      case 'courses':
        return lookupData.courses.map(c => ({ id: c.id, label: c.title }));
      case 'communities':
        return lookupData.communities.map(c => ({ id: c.id, label: c.name }));
      case 'roles':
        return lookupData.roles.map(r => ({ id: r.id, label: r.roleName || `Role ${r.id}` }));
      case 'internPositions':
        return lookupData.internPositions.map(i => ({ id: i.id, label: i.title }));
      default:
        return [];
    }
  };

  // Helper to get display name from ID
  const getDisplayName = (lookupType, id) => {
    const options = getLookupOptions(lookupType);
    const option = options.find(o => o.id === parseInt(id));
    return option ? option.label : `ID: ${id}`;
  };

  // Fetch model data when model changes
  useEffect(() => {
    if (model) {
      const fetchModelData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/admin/getModelData/${model}`);
          const responseData = await response.json();
          if (response.ok) {
            setModelData(responseData.data || []);
            if (actionType === 'Add') {
              setFormData({}); // Clear form for Add
              setSelectedRecordId('');
            }
          } else {
            console.error('Error fetching model data:', responseData);
            alert(`Error: ${responseData.message || 'Failed to fetch model data'}`);
          }
        } catch (error) {
          console.error('Network error:', error);
          alert('Network error: Please check your connection and try again');
        }
      };
      fetchModelData();
    } else {
      setModelData([]);
      setFormData({});
      setSelectedRecordId('');
    }
  }, [model]);

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

    // Clean up the form data - remove empty strings and convert numbers
    const cleanedData = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== '' && value !== null && value !== undefined) {
        // Convert number strings to actual numbers for number fields
        const field = modelFields[model]?.find((f) => f.name === key);
        if (field && field.type === 'number' && typeof value === 'string') {
          cleanedData[key] = parseFloat(value) || value;
        } else {
          cleanedData[key] = value;
        }
      }
    });

    // Prepare payload to match backend expectations
    const payload = {
      model,
      type: actionType,
      id: actionType === 'Edit' ? selectedRecordId : undefined,
      ...cleanedData,
    };

    // console.log('Sending payload:', payload); // For debugging

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
        // Refresh model data after submission
        const refreshResponse = await fetch(`${BASE_URL}/api/admin/getModelData/${model}`);
        const refreshData = await refreshResponse.json();
        if (refreshResponse.ok) {
          setModelData(refreshData.data || []);
        }
      } else {
        console.error('Error response:', responseData);
        alert(`Error: ${responseData.error || 'Failed to submit data'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: Please check your connection and try again');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Panel</h1>
      <div className="mb-3">
        <label htmlFor="modelSelect" className="form-label">Select Model</label>
        <select
          id="modelSelect"
          className="form-select"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            setFormData({});
            setSelectedRecordId('');
          }}
        >
          <option value="">Select a model</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      {model && (
        <>
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'addEdit' ? 'active' : ''}`}
                onClick={() => setActiveTab('addEdit')}
              >
                Add/Edit Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'viewRecords' ? 'active' : ''}`}
                onClick={() => setActiveTab('viewRecords')}
              >
                View Records
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div className={`tab-pane ${activeTab === 'addEdit' ? 'active' : ''}`}>
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="actionTypeSelect" className="form-label">Action Type</label>
                    <select
                      id="actionTypeSelect"
                      className="form-select"
                      value={actionType}
                      onChange={(e) => {
                        setActionType(e.target.value);
                        setFormData({});
                        setSelectedRecordId('');
                      }}
                    >
                      <option value="Add">Add</option>
                      <option value="Edit">Edit</option>
                    </select>
                  </div>
                  {actionType === 'Edit' && (
                    <div className="mb-3">
                      <label htmlFor="recordSelect" className="form-label">Select Record to Edit</label>
                      <select
                        id="recordSelect"
                        className="form-select"
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
                    {modelFields[model].map((field) => (
                      <div className="mb-3" key={field.name}>
                        <label htmlFor={field.name} className="form-label">
                          {field.name.replace(/([A-Z])/g, ' $1').trim()}
                          {field.required && <span className="text-danger">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.name}
                            className="form-control"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            rows="3"
                          />
                        ) : field.type === 'checkbox' ? (
                          <div className="form-check">
                            <input
                              id={field.name}
                              type="checkbox"
                              className="form-check-input"
                              name={field.name}
                              checked={formData[field.name] || false}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor={field.name}>
                              {field.name.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                          </div>
                        ) : field.type === 'select' && field.lookup ? (
                          <select
                            id={field.name}
                            className="form-select"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                          >
                            <option value="">Select {field.name.replace(/([A-Z])/g, ' $1').replace(/Id$/, '')}</option>
                            {getLookupOptions(field.lookup).map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={field.name}
                            type={field.type}
                            className="form-control"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                    <button type="submit" className="btn btn-primary">
                      {actionType} {model}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={`tab-pane ${activeTab === 'viewRecords' ? 'active' : ''}`}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Records for {model}</h5>
                  {modelData.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>ID</th>
                            {modelFields[model].map((field) => (
                              <th key={field.name}>{field.name.replace(/([A-Z])/g, ' $1').trim()}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {modelData.map((record) => (
                            <tr key={record.id}>
                              <td>{record.id}</td>
                              {modelFields[model].map((field) => (
                                <td key={field.name}>
                                  {field.type === 'checkbox'
                                    ? record[field.name] ? 'Yes' : 'No'
                                    : field.type === 'select' && field.lookup
                                      ? getDisplayName(field.lookup, record[field.name])
                                      : record[field.name] || '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No records found for {model}.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Instructions</h5>
              <p className="card-text">
                1. Select a model from the dropdown<br />
                2. Use the "Add/Edit Details" tab to add new records or edit existing ones<br />
                3. Use the "View Records" tab to see all records for the selected model<br />
                4. For Edit, select a record to modify<br />
                5. Fill in the required fields (marked with *) and submit
              </p>
              {model && (
                <div className="mt-3">
                  <h6>Selected Model: <span className="badge bg-primary">{model}</span></h6>
                  <p className="small text-muted">
                    Fields marked with * are required in the Add/Edit tab
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;