import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { useTheme } from '../contexts/ThemeContext';
import '../css/CertificateTemplate.css';

const CertificateTemplate = ({
    recipientName = "John Doe",
    courseName = "Advanced React Development",
    completionDate = "December 30, 2024",
    certificateId = "CERT-2024-001234",
    instructorName = "Dr. Sarah Johnson",
    duration = "40 Hours",
    onClose
}) => {
    const { isDark } = useTheme();
    const certificateRef = useRef(null);

    const handleDownload = async () => {
        if (certificateRef.current) {
            try {
                const canvas = await html2canvas(certificateRef.current, {
                    scale: 3, // High resolution
                    backgroundColor: null,
                    useCORS: true,
                    logging: false,
                });

                const link = document.createElement('a');
                link.download = `${recipientName.replace(/\s+/g, '_')}_Certificate_${certificateId}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (error) {
                console.error('Error generating certificate:', error);
            }
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={`certificate-overlay ${isDark ? 'dark' : 'light'}`}>
            <div className="certificate-modal">
                {/* Action Buttons */}
                <div className="certificate-actions">
                    <button className="action-btn download-btn" onClick={handleDownload}>
                        <i className="bi bi-download"></i> Download
                    </button>
                    <button className="action-btn print-btn" onClick={handlePrint}>
                        <i className="bi bi-printer"></i> Print
                    </button>
                    {onClose && (
                        <button className="action-btn close-btn" onClick={onClose}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}
                </div>

                {/* Certificate Design */}
                <div className="certificate-wrapper" ref={certificateRef}>
                    <div className="certificate">
                        {/* Decorative Corner Elements */}
                        <div className="corner-decoration top-left"></div>
                        <div className="corner-decoration top-right"></div>
                        <div className="corner-decoration bottom-left"></div>
                        <div className="corner-decoration bottom-right"></div>

                        {/* Decorative Border */}
                        <div className="certificate-border">
                            <div className="inner-border">
                                {/* Header Section */}
                                <div className="certificate-header">
                                    {/* Logo/Brand */}
                                    <div className="certificate-logo">
                                        <div className="logo-circle">
                                            <span className="logo-text">4</span>
                                        </div>
                                        <span className="brand-name">4DUCATE</span>
                                    </div>

                                    {/* Decorative Line */}
                                    <div className="decorative-line">
                                        <div className="line"></div>
                                        <div className="diamond"></div>
                                        <div className="line"></div>
                                    </div>

                                    {/* Title */}
                                    <h1 className="certificate-title">Certificate of Completion</h1>
                                    <p className="certificate-subtitle">This is to certify that</p>
                                </div>

                                {/* Recipient Name */}
                                <div className="recipient-section">
                                    <h2 className="recipient-name">{recipientName}</h2>
                                    <div className="name-underline">
                                        <svg viewBox="0 0 400 20" className="underline-svg">
                                            <path d="M0,10 Q100,0 200,10 T400,10" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#d4af37" />
                                                    <stop offset="50%" stopColor="#f4d03f" />
                                                    <stop offset="100%" stopColor="#d4af37" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                                {/* Course Details */}
                                <div className="course-section">
                                    <p className="completion-text">has successfully completed the course</p>
                                    <h3 className="course-name">{courseName}</h3>
                                    <p className="course-duration">Duration: {duration}</p>
                                </div>

                                {/* Completion Date */}
                                <div className="date-section">
                                    <p className="date-label">Completed on</p>
                                    <p className="completion-date">{completionDate}</p>
                                </div>

                                {/* Signature Section */}
                                <div className="signature-section">
                                    <div className="signature-box">
                                        <div className="signature-line">
                                            <img
                                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Cpath d='M10,40 Q30,10 60,35 T120,25 T180,40' fill='none' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E"
                                                alt="Signature"
                                                className="signature-img"
                                            />
                                        </div>
                                        <p className="signature-name">{instructorName}</p>
                                        <p className="signature-title">Lead Instructor</p>
                                    </div>

                                    {/* Seal */}
                                    <div className="certificate-seal">
                                        <div className="seal-outer">
                                            <div className="seal-inner">
                                                <span className="seal-text">VERIFIED</span>
                                                <span className="seal-icon">✓</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="signature-box">
                                        <div className="signature-line">
                                            <img
                                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Cpath d='M20,35 Q50,15 90,40 T160,30' fill='none' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E"
                                                alt="Signature"
                                                className="signature-img"
                                            />
                                        </div>
                                        <p className="signature-name">4DUCATE Team</p>
                                        <p className="signature-title">Platform Director</p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="certificate-footer">
                                    <div className="certificate-id">
                                        <span className="id-label">Certificate ID:</span>
                                        <span className="id-value">{certificateId}</span>
                                    </div>
                                    <div className="verification-text">
                                        <p>Verify at: www.4ducate.com/verify/{certificateId}</p>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="watermark">4DUCATE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateTemplate;
