import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import apiClient from '../utils/apiClient';

const ClanDetail = () => {
    const { id } = useParams();
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const [community, setCommunity] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMember, setIsMember] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        fetchCommunityData();
    }, [id]);

    const fetchCommunityData = async () => {
        try {
            setLoading(true);
            const [communityRes, postsRes] = await Promise.all([
                apiClient.get(`/api/communities/${id}`),
                apiClient.get(`/api/communities/${id}/posts`)
            ]);

            setCommunity(communityRes.data.data);
            setPosts(postsRes.data.data || []);

            // Check if user is a member
            const members = communityRes.data.data.members || [];
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            setIsMember(members.some(m => m.userId === userInfo.id));
        } catch (error) {
            console.error('Error fetching community:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinCommunity = async () => {
        try {
            await apiClient.post('/api/communities/join', { communityId: parseInt(id) });
            setIsMember(true);
            fetchCommunityData();
        } catch (error) {
            console.error('Error joining community:', error);
        }
    };

    const handleLeaveCommunity = async () => {
        try {
            await apiClient.post('/api/communities/leave', { communityId: parseInt(id) });
            setIsMember(false);
            fetchCommunityData();
        } catch (error) {
            console.error('Error leaving community:', error);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPost.title.trim()) return;

        setPosting(true);
        try {
            await apiClient.post('/api/communities/posts', {
                communityId: parseInt(id),
                title: newPost.title,
                content: newPost.content,
                postType: 'text'
            });
            setNewPost({ title: '', content: '' });
            fetchCommunityData();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setPosting(false);
        }
    };

    const handleLikePost = async (postId) => {
        try {
            await apiClient.post(`/api/communities/posts/${postId}/like`);
            setPosts(posts.map(p =>
                p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
            ));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className="spinner-border" style={{ color: '#667eea', width: '50px', height: '50px' }}></div>
            </div>
        );
    }

    if (!community) {
        return (
            <div
                style={{
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <h2 style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>Community not found</h2>
                <button onClick={() => navigate('/dashboard/community')} className="btn btn-primary mt-3">
                    Go Back
                </button>
            </div>
        );
    }

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
                    minHeight: '100vh'
                }}
            >
                {/* Banner */}
                <div
                    style={{
                        height: '250px',
                        background: community.bannerImage
                            ? `url(${community.bannerImage}) center/cover`
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        position: 'relative'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)'
                        }}
                    />
                    <button
                        onClick={() => navigate(-1)}
                        className="btn position-absolute"
                        style={{
                            top: '20px',
                            left: '20px',
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: 'none',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <i className="bi bi-arrow-left" style={{ fontSize: '20px' }}></i>
                    </button>
                </div>

                <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10, paddingBottom: '40px' }}>
                    {/* Profile Section */}
                    <div
                        style={{
                            background: isDark
                                ? 'rgba(30, 41, 59, 0.95)'
                                : 'rgba(255, 255, 255, 0.98)',
                            borderRadius: '24px',
                            padding: '24px',
                            boxShadow: isDark
                                ? '0 8px 30px rgba(0, 0, 0, 0.5)'
                                : '0 8px 30px rgba(0, 0, 0, 0.08)',
                            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                            marginBottom: '24px'
                        }}
                    >
                        <div className="d-flex flex-wrap gap-4 align-items-start">
                            {/* Logo */}
                            <div
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '20px',
                                    background: community.logoUrl
                                        ? `url(${community.logoUrl}) center/cover`
                                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                    border: `4px solid ${isDark ? '#1e293b' : '#ffffff'}`
                                }}
                            >
                                {!community.logoUrl && (
                                    <i className="bi bi-people-fill" style={{ fontSize: '40px', color: 'white' }}></i>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <h1
                                        style={{
                                            fontSize: '28px',
                                            fontWeight: '700',
                                            color: isDark ? '#f1f5f9' : '#1e293b',
                                            margin: 0
                                        }}
                                    >
                                        {community.name}
                                    </h1>
                                    <span
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            padding: '4px 10px',
                                            borderRadius: '20px'
                                        }}
                                    >
                                        {community.category}
                                    </span>
                                </div>
                                <p style={{ color: isDark ? '#94a3b8' : '#64748b', marginBottom: '12px' }}>
                                    {community.description}
                                </p>
                                <div className="d-flex gap-4 flex-wrap">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-people-fill" style={{ color: '#667eea' }}></i>
                                        <span style={{ color: isDark ? '#f1f5f9' : '#1e293b', fontWeight: '600' }}>
                                            {community.members?.length || 0} members
                                        </span>
                                    </div>
                                    {community.location && (
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="bi bi-geo-alt-fill" style={{ color: '#667eea' }}></i>
                                            <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                                {community.location}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Join Button */}
                            <div>
                                {isMember ? (
                                    <button
                                        onClick={handleLeaveCommunity}
                                        className="btn"
                                        style={{
                                            background: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
                                            color: '#ef4444',
                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                            borderRadius: '12px',
                                            padding: '12px 24px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Leave Clan
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleJoinCommunity}
                                        className="btn"
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '12px 24px',
                                            fontWeight: '600',
                                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                                        }}
                                    >
                                        <i className="bi bi-plus-circle-fill me-2"></i>
                                        Join Clan
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        {community.tags && (
                            <div className="d-flex gap-2 flex-wrap mt-4">
                                {community.tags.split(',').map((tag, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            background: isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)',
                                            color: isDark ? '#a5b4fc' : '#667eea',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            border: isDark ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(102, 126, 234, 0.2)'
                                        }}
                                    >
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="d-flex gap-2 mb-4">
                        {['posts', 'members', 'about'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="btn"
                                style={{
                                    background: activeTab === tab
                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        : isDark ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                                    color: activeTab === tab ? 'white' : (isDark ? '#f1f5f9' : '#64748b'),
                                    border: activeTab === tab
                                        ? 'none'
                                        : isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '10px 20px',
                                    fontWeight: '600',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {activeTab === 'posts' && (
                        <div className="row">
                            <div className="col-lg-8">
                                {/* Create Post */}
                                {isMember && (
                                    <div
                                        style={{
                                            background: isDark ? 'rgba(30, 41, 59, 0.95)' : '#ffffff',
                                            borderRadius: '16px',
                                            padding: '20px',
                                            marginBottom: '20px',
                                            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
                                        }}
                                    >
                                        <form onSubmit={handleCreatePost}>
                                            <input
                                                type="text"
                                                placeholder="Post title..."
                                                value={newPost.title}
                                                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                                                className="form-control mb-2"
                                                style={{
                                                    background: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    color: isDark ? '#f1f5f9' : '#1e293b',
                                                    padding: '12px 16px'
                                                }}
                                            />
                                            <textarea
                                                placeholder="What's on your mind?"
                                                value={newPost.content}
                                                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                                                rows="3"
                                                className="form-control mb-3"
                                                style={{
                                                    background: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    color: isDark ? '#f1f5f9' : '#1e293b',
                                                    padding: '12px 16px',
                                                    resize: 'none'
                                                }}
                                            />
                                            <button
                                                type="submit"
                                                disabled={posting || !newPost.title.trim()}
                                                className="btn"
                                                style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    padding: '10px 24px',
                                                    fontWeight: '600',
                                                    opacity: posting || !newPost.title.trim() ? 0.7 : 1
                                                }}
                                            >
                                                {posting ? 'Posting...' : 'Post'}
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Posts List */}
                                {posts.length > 0 ? (
                                    posts.map((post) => (
                                        <div
                                            key={post.id}
                                            style={{
                                                background: isDark ? 'rgba(30, 41, 59, 0.95)' : '#ffffff',
                                                borderRadius: '16px',
                                                padding: '20px',
                                                marginBottom: '16px',
                                                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
                                            }}
                                        >
                                            <div className="d-flex gap-3 mb-3">
                                                <div
                                                    style={{
                                                        width: '44px',
                                                        height: '44px',
                                                        borderRadius: '12px',
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <span style={{ color: 'white', fontWeight: '600' }}>
                                                        {post.author?.first_name?.[0] || 'U'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                                                        {post.author?.first_name} {post.author?.last_name || ''}
                                                    </div>
                                                    <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}>
                                                        {new Date(post.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                {post.isPinned && (
                                                    <span
                                                        style={{
                                                            background: 'rgba(251, 191, 36, 0.2)',
                                                            color: '#f59e0b',
                                                            fontSize: '11px',
                                                            padding: '4px 8px',
                                                            borderRadius: '8px',
                                                            marginLeft: 'auto'
                                                        }}
                                                    >
                                                        <i className="bi bi-pin-fill me-1"></i>Pinned
                                                    </span>
                                                )}
                                            </div>
                                            <h5 style={{ color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '8px' }}>
                                                {post.title}
                                            </h5>
                                            <p style={{ color: isDark ? '#cbd5e1' : '#64748b', marginBottom: '16px' }}>
                                                {post.content}
                                            </p>
                                            <div className="d-flex gap-4">
                                                <button
                                                    onClick={() => handleLikePost(post.id)}
                                                    className="btn btn-sm d-flex align-items-center gap-1"
                                                    style={{
                                                        background: 'transparent',
                                                        color: isDark ? '#94a3b8' : '#64748b',
                                                        border: 'none',
                                                        padding: '6px 12px'
                                                    }}
                                                >
                                                    <i className="bi bi-heart"></i>
                                                    <span>{post.likes || 0}</span>
                                                </button>
                                                <button
                                                    className="btn btn-sm d-flex align-items-center gap-1"
                                                    style={{
                                                        background: 'transparent',
                                                        color: isDark ? '#94a3b8' : '#64748b',
                                                        border: 'none',
                                                        padding: '6px 12px'
                                                    }}
                                                >
                                                    <i className="bi bi-chat"></i>
                                                    <span>{post.commentsCount || 0}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: '60px 20px',
                                            background: isDark ? 'rgba(30, 41, 59, 0.95)' : '#ffffff',
                                            borderRadius: '16px',
                                            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
                                        }}
                                    >
                                        <i className="bi bi-chat-square-text" style={{ fontSize: '48px', color: '#667eea', opacity: 0.5 }}></i>
                                        <h5 style={{ color: isDark ? '#f1f5f9' : '#1e293b', marginTop: '16px' }}>No posts yet</h5>
                                        <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Be the first to post in this clan!</p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="col-lg-4">
                                <div
                                    style={{
                                        background: isDark ? 'rgba(30, 41, 59, 0.95)' : '#ffffff',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
                                    }}
                                >
                                    <h6 style={{ color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '16px' }}>
                                        Rules
                                    </h6>
                                    <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '14px', whiteSpace: 'pre-line' }}>
                                        {community.rules || 'No rules specified for this clan.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div
                            style={{
                                background: isDark ? 'rgba(30, 41, 59, 0.95)' : '#ffffff',
                                borderRadius: '16px',
                                padding: '24px',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
                            }}
                        >
                            <h5 style={{ color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '20px' }}>
                                Members ({community.members?.length || 0})
                            </h5>
                            <div className="row g-3">
                                {(community.members || []).map((member) => (
                                    <div key={member.id} className="col-md-6 col-lg-4">
                                        <div
                                            className="d-flex align-items-center gap-3 p-3"
                                            style={{
                                                background: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                                                borderRadius: '12px'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    borderRadius: '12px',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <span style={{ color: 'white', fontWeight: '600' }}>
                                                    {member.user?.first_name?.[0] || 'U'}
                                                </span>
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', color: isDark ? '#f1f5f9' : '#1e293b' }}>
                                                    {member.user?.first_name} {member.user?.last_name || ''}
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#667eea', textTransform: 'capitalize' }}>
                                                    {member.role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div
                            style={{
                                background: isDark ? 'rgba(30, 41, 59, 0.95)' : '#ffffff',
                                borderRadius: '16px',
                                padding: '24px',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
                            }}
                        >
                            <h5 style={{ color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '20px' }}>
                                About {community.name}
                            </h5>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <h6 style={{ color: '#667eea', marginBottom: '8px' }}>Description</h6>
                                    <p style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
                                        {community.description || 'No description provided.'}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <h6 style={{ color: '#667eea', marginBottom: '8px' }}>Rules</h6>
                                    <p style={{ color: isDark ? '#cbd5e1' : '#64748b', whiteSpace: 'pre-line' }}>
                                        {community.rules || 'No rules specified.'}
                                    </p>
                                </div>
                                {community.contactEmail && (
                                    <div className="col-md-6">
                                        <h6 style={{ color: '#667eea', marginBottom: '8px' }}>Contact</h6>
                                        <p style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
                                            {community.contactEmail}
                                        </p>
                                    </div>
                                )}
                                {community.location && (
                                    <div className="col-md-6">
                                        <h6 style={{ color: '#667eea', marginBottom: '8px' }}>Location</h6>
                                        <p style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
                                            {community.location}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ClanDetail;
