import React, { useState, useRef } from 'react';
import '../css/ResumeAnalyzer.css';

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileUpload = (uploadedFile) => {
        if (uploadedFile && (uploadedFile.type === 'application/pdf' ||
            uploadedFile.type === 'application/msword' ||
            uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFile(uploadedFile);
            setAnalysis(null);
        } else {
            alert('Please upload a PDF or Word document');
        }
    };

    const handleInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const analyzeResume = async () => {
        if (!file) return;

        setAnalyzing(true);

        // Simulated analysis - In production, this would call an actual API
        setTimeout(() => {
            setAnalysis({
                overallScore: 78,
                sections: [
                    { name: 'Skills Match', score: 85, feedback: 'Good technical skills alignment with industry demands.' },
                    { name: 'Experience', score: 72, feedback: 'Consider adding more quantifiable achievements.' },
                    { name: 'Education', score: 90, feedback: 'Well-formatted education section.' },
                    { name: 'Format & Layout', score: 65, feedback: 'Consider using a more modern layout with better spacing.' },
                    { name: 'Keywords', score: 80, feedback: 'Good use of industry keywords. Consider adding more action verbs.' }
                ],
                suggestions: [
                    'Add more specific project outcomes with metrics',
                    'Include relevant certifications if available',
                    'Consider adding a professional summary section',
                    'Optimize for ATS by using standard section headers',
                    'Include links to portfolio or GitHub projects'
                ],
                strengths: [
                    'Strong technical skill set',
                    'Clear educational background',
                    'Good use of action verbs',
                    'Relevant work experience'
                ]
            });
            setAnalyzing(false);
        }, 2500);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    const getScoreGradient = (score) => {
        if (score >= 80) return 'linear-gradient(135deg, #10b981, #059669)';
        if (score >= 60) return 'linear-gradient(135deg, #f59e0b, #d97706)';
        return 'linear-gradient(135deg, #ef4444, #dc2626)';
    };

    return (
        <div className="resume-analyzer-container">
            <div className="resume-analyzer-header">
                <div className="header-content">
                    <h1>📄 Resume Analyzer</h1>
                    <p>Get AI-powered insights to improve your resume and land your dream job</p>
                </div>
                <div className="header-decoration"></div>
            </div>

            <div className="analyzer-content">
                {/* Upload Section */}
                <div className="upload-section">
                    <div
                        className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleInputChange}
                            style={{ display: 'none' }}
                        />

                        {!file ? (
                            <div className="upload-placeholder">
                                <div className="upload-icon">📁</div>
                                <h3>Drag & Drop your resume here</h3>
                                <p>or click to browse files</p>
                                <span className="file-types">Supported: PDF, DOC, DOCX</span>
                            </div>
                        ) : (
                            <div className="file-info">
                                <div className="file-icon">📄</div>
                                <div className="file-details">
                                    <h4>{file.name}</h4>
                                    <p>{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                                <button
                                    className="remove-file"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                        setAnalysis(null);
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>

                    {file && !analysis && (
                        <button
                            className={`analyze-btn ${analyzing ? 'analyzing' : ''}`}
                            onClick={analyzeResume}
                            disabled={analyzing}
                        >
                            {analyzing ? (
                                <>
                                    <span className="spinner"></span>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    🔍 Analyze Resume
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Analysis Results */}
                {analysis && (
                    <div className="analysis-results">
                        {/* Overall Score */}
                        <div className="overall-score-card">
                            <div className="score-circle" style={{ background: getScoreGradient(analysis.overallScore) }}>
                                <span className="score-value">{analysis.overallScore}</span>
                                <span className="score-label">/ 100</span>
                            </div>
                            <div className="score-info">
                                <h3>Overall Resume Score</h3>
                                <p>Your resume is {analysis.overallScore >= 80 ? 'excellent' : analysis.overallScore >= 60 ? 'good but needs improvement' : 'needs significant improvement'}</p>
                            </div>
                        </div>

                        {/* Section Scores */}
                        <div className="section-scores">
                            <h3>📊 Detailed Analysis</h3>
                            <div className="scores-grid">
                                {analysis.sections.map((section, index) => (
                                    <div key={index} className="score-item">
                                        <div className="score-header">
                                            <span className="section-name">{section.name}</span>
                                            <span className="section-score" style={{ color: getScoreColor(section.score) }}>
                                                {section.score}%
                                            </span>
                                        </div>
                                        <div className="score-bar">
                                            <div
                                                className="score-fill"
                                                style={{
                                                    width: `${section.score}%`,
                                                    background: getScoreGradient(section.score)
                                                }}
                                            ></div>
                                        </div>
                                        <p className="section-feedback">{section.feedback}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Strengths & Suggestions */}
                        <div className="feedback-section">
                            <div className="strengths-card">
                                <h3>💪 Strengths</h3>
                                <ul>
                                    {analysis.strengths.map((strength, index) => (
                                        <li key={index}>
                                            <span className="check-icon">✓</span>
                                            {strength}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="suggestions-card">
                                <h3>💡 Suggestions</h3>
                                <ul>
                                    {analysis.suggestions.map((suggestion, index) => (
                                        <li key={index}>
                                            <span className="bullet-icon">→</span>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button className="btn-secondary" onClick={() => {
                                setFile(null);
                                setAnalysis(null);
                            }}>
                                📤 Upload New Resume
                            </button>
                            <button className="btn-primary">
                                📥 Download Report
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
