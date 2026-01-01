import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../admin/AuthContext';
import CertificateTemplate from '../components/CertificateTemplate';

const Certificates = () => {
    const { isDark } = useTheme();
    const { user } = useAuth();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [showCertificate, setShowCertificate] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);

    const certificates = [
        {
            id: 1,
            title: 'React Fundamentals',
            issueDate: '2024-12-15',
            expiryDate: null,
            status: 'Active',
            credentialId: 'CERT-RF-2024-001',
            category: 'Development',
            icon: '⚛️',
            color: '#61dafb',
            duration: '25 Hours',
            instructor: 'John Smith'
        },
        {
            id: 2,
            title: 'JavaScript Advanced',
            issueDate: '2024-11-20',
            expiryDate: null,
            status: 'Active',
            credentialId: 'CERT-JS-2024-002',
            category: 'Development',
            icon: '📜',
            color: '#f7df1e',
            duration: '30 Hours',
            instructor: 'Sarah Johnson'
        },
        {
            id: 3,
            title: 'Python for Data Science',
            issueDate: '2024-10-05',
            expiryDate: '2025-10-05',
            status: 'Active',
            credentialId: 'CERT-PY-2024-003',
            category: 'Data Science',
            icon: '🐍',
            color: '#3776ab',
            duration: '40 Hours',
            instructor: 'Dr. Michael Chen'
        },
        {
            id: 4,
            title: 'UI/UX Design Basics',
            issueDate: '2024-09-10',
            expiryDate: null,
            status: 'Active',
            credentialId: 'CERT-UX-2024-004',
            category: 'Design',
            icon: '🎨',
            color: '#ff6b6b',
            duration: '20 Hours',
            instructor: 'Emily Davis'
        },
        {
            id: 5,
            title: 'AWS Cloud Practitioner',
            issueDate: '2024-08-15',
            expiryDate: '2025-08-15',
            status: 'Expiring Soon',
            credentialId: 'CERT-AWS-2024-005',
            category: 'Cloud',
            icon: '☁️',
            color: '#ff9900',
            duration: '35 Hours',
            instructor: 'David Wilson'
        }
    ];

    const filters = ['all', 'Active', 'Expiring Soon', 'Expired'];

    const filteredCertificates = certificates.filter(cert => {
        return selectedFilter === 'all' || cert.status === selectedFilter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#10b981';
            case 'Expiring Soon': return '#f59e0b';
            case 'Expired': return '#ef4444';
            default: return '#667eea';
        }
    };

    const cardStyle = {
        background: isDark
            ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        boxShadow: isDark
            ? '0 8px 30px rgba(0, 0, 0, 0.3)'
            : '0 8px 30px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease'
    };

    const getUserName = () => {
        if (user?.fullName) return user.fullName;
        if (user?.email) return user.email.split('@')[0];
        return 'Student';
    };

    const handleViewCertificate = (cert) => {
        setSelectedCert(cert);
        setShowCertificate(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
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

            <div style={{ padding: '30px 20px', minHeight: '100vh' }}>
                <div className="container">
                    {/* Header */}
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
                            My Certificates
                        </h1>
                        <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
                            View and download your earned certificates
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="row g-4 mb-4">
                        {[
                            { label: 'Total Certificates', value: certificates.length, icon: '🏆', color: '#667eea' },
                            { label: 'Active', value: certificates.filter(c => c.status === 'Active').length, icon: '✅', color: '#10b981' },
                            { label: 'Expiring Soon', value: certificates.filter(c => c.status === 'Expiring Soon').length, icon: '⚠️', color: '#f59e0b' }
                        ].map((stat, index) => (
                            <div key={index} className="col-md-4">
                                <div style={{ ...cardStyle, padding: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '16px',
                                                background: `${stat.color}20`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '28px'
                                            }}
                                        >
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '32px', fontWeight: '700', color: stat.color }}>
                                                {stat.value}
                                            </div>
                                            <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '14px' }}>
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ ...cardStyle, padding: '16px 20px', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: selectedFilter === filter
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
                                        color: selectedFilter === filter ? 'white' : isDark ? '#94a3b8' : '#64748b',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Certificates Grid */}
                    <div className="row g-4">
                        {filteredCertificates.map((cert) => (
                            <div key={cert.id} className="col-lg-6">
                                <div
                                    style={{
                                        ...cardStyle,
                                        padding: '0',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = `0 16px 40px ${cert.color}30`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isDark
                                            ? '0 8px 30px rgba(0, 0, 0, 0.3)'
                                            : '0 8px 30px rgba(0, 0, 0, 0.08)';
                                    }}
                                >
                                    {/* Certificate Header */}
                                    <div
                                        style={{
                                            background: `linear-gradient(135deg, ${cert.color}30, ${cert.color}10)`,
                                            padding: '20px 24px',
                                            borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.03)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '36px' }}>{cert.icon}</span>
                                                <div>
                                                    <h5 style={{
                                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                                        fontWeight: '700',
                                                        marginBottom: '4px',
                                                        fontSize: '18px'
                                                    }}>
                                                        {cert.title}
                                                    </h5>
                                                    <span style={{
                                                        fontSize: '12px',
                                                        color: isDark ? '#94a3b8' : '#64748b'
                                                    }}>
                                                        {cert.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <span
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    background: `${getStatusColor(cert.status)}20`,
                                                    color: getStatusColor(cert.status)
                                                }}
                                            >
                                                {cert.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Certificate Body */}
                                    <div style={{ padding: '20px 24px' }}>
                                        <div style={{ marginBottom: '16px' }}>
                                            <div style={{
                                                color: isDark ? '#64748b' : '#94a3b8',
                                                fontSize: '11px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '4px'
                                            }}>
                                                Awarded To
                                            </div>
                                            <div style={{
                                                color: isDark ? '#f1f5f9' : '#1e293b',
                                                fontSize: '16px',
                                                fontWeight: '600'
                                            }}>
                                                {getUserName()}
                                            </div>
                                        </div>

                                        <div className="row g-3">
                                            <div className="col-6">
                                                <div style={{
                                                    color: isDark ? '#64748b' : '#94a3b8',
                                                    fontSize: '11px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    marginBottom: '4px'
                                                }}>
                                                    Issue Date
                                                </div>
                                                <div style={{
                                                    color: isDark ? '#f1f5f9' : '#1e293b',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}>
                                                    {new Date(cert.issueDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div style={{
                                                    color: isDark ? '#64748b' : '#94a3b8',
                                                    fontSize: '11px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    marginBottom: '4px'
                                                }}>
                                                    Expiry Date
                                                </div>
                                                <div style={{
                                                    color: isDark ? '#f1f5f9' : '#1e293b',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}>
                                                    {cert.expiryDate
                                                        ? new Date(cert.expiryDate).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })
                                                        : 'No Expiry'}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{
                                            marginTop: '16px',
                                            padding: '12px',
                                            background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                                            borderRadius: '10px'
                                        }}>
                                            <div style={{
                                                color: isDark ? '#64748b' : '#94a3b8',
                                                fontSize: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '4px'
                                            }}>
                                                Credential ID
                                            </div>
                                            <div style={{
                                                color: isDark ? '#f1f5f9' : '#1e293b',
                                                fontSize: '13px',
                                                fontFamily: 'monospace',
                                                fontWeight: '500'
                                            }}>
                                                {cert.credentialId}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                                            <button
                                                onClick={() => handleViewCertificate(cert)}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px',
                                                    borderRadius: '12px',
                                                    border: 'none',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <i className="bi bi-eye"></i>
                                                View & Download
                                            </button>
                                            <button
                                                style={{
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
                                                    background: 'transparent',
                                                    color: isDark ? '#f1f5f9' : '#1e293b',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <i className="bi bi-share"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCertificates.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎓</div>
                            <h4 style={{ color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '8px' }}>No certificates found</h4>
                            <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Complete courses to earn certificates</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificate && selectedCert && (
                <CertificateTemplate
                    recipientName={getUserName()}
                    courseName={selectedCert.title}
                    completionDate={formatDate(selectedCert.issueDate)}
                    certificateId={selectedCert.credentialId}
                    instructorName={selectedCert.instructor}
                    duration={selectedCert.duration}
                    onClose={() => setShowCertificate(false)}
                />
            )}
        </>
    );
};

export default Certificates;
