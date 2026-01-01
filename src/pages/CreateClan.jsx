import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import apiClient from '../utils/apiClient';

const CreateClan = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        rules: '',
        tags: '',
        bannerImage: '',
        logoUrl: '',
        location: '',
        contactEmail: ''
    });

    const categories = [
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await apiClient.post('/api/communities', formData);
            if (response.data.success) {
                navigate('/dashboard/community');
            } else {
                setError(response.data.message || 'Failed to create clan');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while creating the clan');
        } finally {
            setLoading(false);
        }
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
                    padding: '30px 0',
                    minHeight: '100vh'
                }}
            >
                <div className="container" style={{ maxWidth: '800px' }}>
                    {/* Header */}
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn"
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                                color: isDark ? '#f1f5f9' : '#1e293b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <i className="bi bi-arrow-left" style={{ fontSize: '20px' }}></i>
                        </button>
                        <div>
                            <h1
                                style={{
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    color: isDark ? '#f1f5f9' : '#1e293b',
                                    margin: 0
                                }}
                            >
                                Create a Clan
                            </h1>
                            <p style={{ color: isDark ? '#94a3b8' : '#64748b', margin: 0, fontSize: '14px' }}>
                                Build your community and connect with like-minded learners
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div
                        style={{
                            background: isDark
                                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
                                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            borderRadius: '24px',
                            padding: '32px',
                            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: isDark
                                ? '0 8px 30px rgba(0, 0, 0, 0.5)'
                                : '0 8px 30px rgba(0, 0, 0, 0.08)'
                        }}
                    >
                        {error && (
                            <div
                                className="alert"
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#ef4444',
                                    borderRadius: '12px',
                                    padding: '12px 16px',
                                    marginBottom: '24px'
                                }}
                            >
                                <i className="bi bi-exclamation-circle me-2"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Clan Icon Upload */}
                            <div className="text-center mb-4">
                                <div
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        margin: '0 auto 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    {formData.logoUrl ? (
                                        <img
                                            src={formData.logoUrl}
                                            alt="Clan"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <i className="bi bi-people-fill" style={{ fontSize: '48px', color: 'white' }}></i>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    name="logoUrl"
                                    value={formData.logoUrl}
                                    onChange={handleChange}
                                    placeholder="Enter logo URL"
                                    className="form-control"
                                    style={{
                                        maxWidth: '300px',
                                        margin: '0 auto',
                                        borderRadius: '10px',
                                        background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px',
                                        padding: '10px 16px'
                                    }}
                                />
                            </div>

                            {/* Clan Name */}
                            <div className="mb-4">
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px'
                                    }}
                                >
                                    Clan Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your clan name"
                                    required
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '16px',
                                        padding: '14px 18px'
                                    }}
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px'
                                    }}
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell everyone about your clan..."
                                    rows="4"
                                    maxLength={500}
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px',
                                        padding: '14px 18px',
                                        resize: 'none'
                                    }}
                                />
                                <div
                                    style={{
                                        textAlign: 'right',
                                        fontSize: '12px',
                                        color: isDark ? '#94a3b8' : '#64748b',
                                        marginTop: '4px'
                                    }}
                                >
                                    {formData.description.length}/500
                                </div>
                            </div>

                            <div className="row">
                                {/* Category */}
                                <div className="col-md-6 mb-4">
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: '600',
                                            color: isDark ? '#f1f5f9' : '#1e293b',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                        style={{
                                            borderRadius: '12px',
                                            background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                            color: isDark ? '#f1f5f9' : '#1e293b',
                                            fontSize: '14px',
                                            padding: '14px 18px'
                                        }}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Location */}
                                <div className="col-md-6 mb-4">
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: '600',
                                            color: isDark ? '#f1f5f9' : '#1e293b',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g., Worldwide, India"
                                        className="form-control"
                                        style={{
                                            borderRadius: '12px',
                                            background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                            color: isDark ? '#f1f5f9' : '#1e293b',
                                            fontSize: '14px',
                                            padding: '14px 18px'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-4">
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px'
                                    }}
                                >
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="e.g., programming, web development, react (comma-separated)"
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px',
                                        padding: '14px 18px'
                                    }}
                                />
                            </div>

                            {/* Rules */}
                            <div className="mb-4">
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px'
                                    }}
                                >
                                    Community Rules
                                </label>
                                <textarea
                                    name="rules"
                                    value={formData.rules}
                                    onChange={handleChange}
                                    placeholder="Set some ground rules for your clan members..."
                                    rows="3"
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px',
                                        padding: '14px 18px',
                                        resize: 'none'
                                    }}
                                />
                            </div>

                            {/* Banner Image */}
                            <div className="mb-4">
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px'
                                    }}
                                >
                                    Banner Image URL
                                </label>
                                <input
                                    type="text"
                                    name="bannerImage"
                                    value={formData.bannerImage}
                                    onChange={handleChange}
                                    placeholder="https://example.com/banner.jpg"
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px',
                                        padding: '14px 18px'
                                    }}
                                />
                                {formData.bannerImage && (
                                    <div
                                        style={{
                                            marginTop: '12px',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            height: '120px'
                                        }}
                                    >
                                        <img
                                            src={formData.bannerImage}
                                            alt="Banner Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Contact Email */}
                            <div className="mb-4">
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px'
                                    }}
                                >
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    placeholder="contact@example.com"
                                    className="form-control"
                                    style={{
                                        borderRadius: '12px',
                                        background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontSize: '14px',
                                        padding: '14px 18px'
                                    }}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="d-flex gap-3 mt-5">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="btn flex-grow-1"
                                    style={{
                                        background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f1f5f9',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                        color: isDark ? '#f1f5f9' : '#64748b',
                                        borderRadius: '12px',
                                        padding: '14px 24px',
                                        fontWeight: '600',
                                        fontSize: '15px'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !formData.name || !formData.category}
                                    className="btn flex-grow-1"
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '12px',
                                        padding: '14px 24px',
                                        fontWeight: '600',
                                        fontSize: '15px',
                                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                        opacity: loading || !formData.name || !formData.category ? 0.7 : 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-plus-circle-fill"></i>
                                            Create Clan
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateClan;
