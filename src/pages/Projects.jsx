import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../admin/AuthContext';

const Projects = () => {
    const { isDark } = useTheme();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Sample projects data
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Web App',
            description: 'A full-stack e-commerce application with React and Node.js',
            category: 'Web Development',
            status: 'In Progress',
            progress: 65,
            dueDate: '2025-01-15',
            technologies: ['React', 'Node.js', 'MongoDB'],
            icon: '🛒'
        },
        {
            id: 2,
            title: 'Machine Learning Model',
            description: 'Sentiment analysis model using Python and TensorFlow',
            category: 'Data Science',
            status: 'Completed',
            progress: 100,
            dueDate: '2024-12-20',
            technologies: ['Python', 'TensorFlow', 'Pandas'],
            icon: '🤖'
        },
        {
            id: 3,
            title: 'Mobile Fitness App',
            description: 'React Native app for tracking workouts and nutrition',
            category: 'Mobile Development',
            status: 'Not Started',
            progress: 0,
            dueDate: '2025-02-01',
            technologies: ['React Native', 'Firebase'],
            icon: '💪'
        },
        {
            id: 4,
            title: 'Portfolio Website',
            description: 'Personal portfolio with modern UI/UX design',
            category: 'Web Development',
            status: 'In Progress',
            progress: 80,
            dueDate: '2025-01-05',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            icon: '🎨'
        }
    ];

    const filters = ['all', 'In Progress', 'Completed', 'Not Started'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#10b981';
            case 'In Progress': return '#f59e0b';
            case 'Not Started': return '#94a3b8';
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
                            My Projects
                        </h1>
                        <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
                            Track and manage your learning projects
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="row g-4 mb-4">
                        {[
                            { label: 'Total Projects', value: projects.length, icon: '📁', color: '#667eea' },
                            { label: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length, icon: '🔄', color: '#f59e0b' },
                            { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length, icon: '✅', color: '#10b981' }
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

                    {/* Search and Filter */}
                    <div style={{ ...cardStyle, padding: '20px', marginBottom: '24px' }}>
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
                                            color: isDark ? '#94a3b8' : '#64748b'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px 14px 48px',
                                            borderRadius: '12px',
                                            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                            background: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                                            color: isDark ? '#f1f5f9' : '#1e293b',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
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
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="row g-4">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="col-lg-6">
                                <div
                                    style={{
                                        ...cardStyle,
                                        padding: '24px',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = isDark
                                            ? '0 16px 40px rgba(0, 0, 0, 0.4)'
                                            : '0 16px 40px rgba(0, 0, 0, 0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isDark
                                            ? '0 8px 30px rgba(0, 0, 0, 0.3)'
                                            : '0 8px 30px rgba(0, 0, 0, 0.08)';
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '32px' }}>{project.icon}</span>
                                            <div>
                                                <h5 style={{
                                                    color: isDark ? '#f1f5f9' : '#1e293b',
                                                    fontWeight: '700',
                                                    marginBottom: '4px',
                                                    fontSize: '18px'
                                                }}>
                                                    {project.title}
                                                </h5>
                                                <span style={{
                                                    fontSize: '12px',
                                                    color: isDark ? '#94a3b8' : '#64748b'
                                                }}>
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                background: `${getStatusColor(project.status)}20`,
                                                color: getStatusColor(project.status)
                                            }}
                                        >
                                            {project.status}
                                        </span>
                                    </div>

                                    <p style={{
                                        color: isDark ? '#94a3b8' : '#64748b',
                                        fontSize: '14px',
                                        marginBottom: '16px',
                                        lineHeight: '1.6'
                                    }}>
                                        {project.description}
                                    </p>

                                    {/* Progress Bar */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}>Progress</span>
                                            <span style={{ fontSize: '12px', fontWeight: '600', color: isDark ? '#f1f5f9' : '#1e293b' }}>{project.progress}%</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${project.progress}%`,
                                                height: '100%',
                                                background: getStatusColor(project.status),
                                                borderRadius: '4px',
                                                transition: 'width 0.5s ease'
                                            }} />
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    padding: '4px 10px',
                                                    borderRadius: '8px',
                                                    fontSize: '11px',
                                                    fontWeight: '500',
                                                    background: isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)',
                                                    color: '#667eea'
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Due Date */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: isDark ? '#94a3b8' : '#64748b',
                                        fontSize: '13px'
                                    }}>
                                        <i className="bi bi-calendar3"></i>
                                        Due: {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📂</div>
                            <h4 style={{ color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '8px' }}>No projects found</h4>
                            <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Try adjusting your search or filter</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Projects;
