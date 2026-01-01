import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Resources = () => {
    const { isDark } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'Videos', 'Articles', 'Books', 'Tools', 'Templates'];

    const resources = [
        {
            id: 1,
            title: 'Complete React Course 2025',
            description: 'Master React from scratch with this comprehensive video course',
            category: 'Videos',
            type: 'video',
            duration: '12 hours',
            icon: '🎬',
            color: '#ef4444',
            link: '#'
        },
        {
            id: 2,
            title: 'JavaScript Best Practices Guide',
            description: 'Learn industry-standard coding practices for JavaScript',
            category: 'Articles',
            type: 'article',
            readTime: '15 min read',
            icon: '📄',
            color: '#10b981',
            link: '#'
        },
        {
            id: 3,
            title: 'Clean Code by Robert C. Martin',
            description: 'A comprehensive guide to writing clean, maintainable code',
            category: 'Books',
            type: 'book',
            pages: '464 pages',
            icon: '📚',
            color: '#667eea',
            link: '#'
        },
        {
            id: 4,
            title: 'VS Code Extensions Pack',
            description: 'Essential VS Code extensions for web developers',
            category: 'Tools',
            type: 'tool',
            icon: '🔧',
            color: '#f59e0b',
            link: '#'
        },
        {
            id: 5,
            title: 'Portfolio Template',
            description: 'Beautiful, responsive portfolio template for developers',
            category: 'Templates',
            type: 'template',
            icon: '📋',
            color: '#8b5cf6',
            link: '#'
        },
        {
            id: 6,
            title: 'Node.js API Development',
            description: 'Build scalable APIs with Node.js and Express',
            category: 'Videos',
            type: 'video',
            duration: '8 hours',
            icon: '🎬',
            color: '#ef4444',
            link: '#'
        },
        {
            id: 7,
            title: 'UI/UX Design Principles',
            description: 'Understanding the fundamentals of great design',
            category: 'Articles',
            type: 'article',
            readTime: '10 min read',
            icon: '📄',
            color: '#10b981',
            link: '#'
        },
        {
            id: 8,
            title: 'Figma Design System',
            description: 'Complete design system template for Figma',
            category: 'Templates',
            type: 'template',
            icon: '📋',
            color: '#8b5cf6',
            link: '#'
        }
    ];

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                            Learning Resources
                        </h1>
                        <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
                            Curated resources to enhance your learning journey
                        </p>
                    </div>

                    {/* Resource Stats */}
                    <div className="row g-4 mb-4">
                        {[
                            { label: 'Total Resources', value: resources.length, icon: '📚', color: '#667eea' },
                            { label: 'Videos', value: resources.filter(r => r.category === 'Videos').length, icon: '🎬', color: '#ef4444' },
                            { label: 'Articles', value: resources.filter(r => r.category === 'Articles').length, icon: '📄', color: '#10b981' },
                            { label: 'Templates', value: resources.filter(r => r.category === 'Templates').length, icon: '📋', color: '#8b5cf6' }
                        ].map((stat, index) => (
                            <div key={index} className="col-6 col-md-3">
                                <div style={{ ...cardStyle, padding: '20px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
                                    <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '12px' }}>{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search and Filter */}
                    <div style={{ ...cardStyle, padding: '20px', marginBottom: '24px' }}>
                        <div className="row align-items-center g-3">
                            <div className="col-lg-5">
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
                                        placeholder="Search resources..."
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
                            <div className="col-lg-7">
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            style={{
                                                padding: '10px 18px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: selectedCategory === category
                                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                    : isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
                                                color: selectedCategory === category ? 'white' : isDark ? '#94a3b8' : '#64748b',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="row g-4">
                        {filteredResources.map((resource) => (
                            <div key={resource.id} className="col-lg-4 col-md-6">
                                <div
                                    style={{
                                        ...cardStyle,
                                        padding: '24px',
                                        height: '100%',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = `0 16px 40px ${resource.color}30`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isDark
                                            ? '0 8px 30px rgba(0, 0, 0, 0.3)'
                                            : '0 8px 30px rgba(0, 0, 0, 0.08)';
                                    }}
                                >
                                    {/* Category Badge */}
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '16px',
                                            right: '16px',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            background: `${resource.color}20`,
                                            color: resource.color
                                        }}
                                    >
                                        {resource.category}
                                    </span>

                                    {/* Icon */}
                                    <div
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '16px',
                                            background: `${resource.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '28px',
                                            marginBottom: '16px'
                                        }}
                                    >
                                        {resource.icon}
                                    </div>

                                    {/* Content */}
                                    <h5 style={{
                                        color: isDark ? '#f1f5f9' : '#1e293b',
                                        fontWeight: '700',
                                        marginBottom: '8px',
                                        fontSize: '16px'
                                    }}>
                                        {resource.title}
                                    </h5>
                                    <p style={{
                                        color: isDark ? '#94a3b8' : '#64748b',
                                        fontSize: '13px',
                                        marginBottom: '16px',
                                        lineHeight: '1.6'
                                    }}>
                                        {resource.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: isDark ? '#94a3b8' : '#64748b',
                                        fontSize: '12px',
                                        marginBottom: '16px'
                                    }}>
                                        <i className="bi bi-clock"></i>
                                        {resource.duration || resource.readTime || resource.pages || 'Free Resource'}
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: `${resource.color}15`,
                                            color: resource.color,
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-up-right"></i>
                                        Access Resource
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredResources.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                            <h4 style={{ color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '8px' }}>No resources found</h4>
                            <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Try adjusting your search or filter</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Resources;
