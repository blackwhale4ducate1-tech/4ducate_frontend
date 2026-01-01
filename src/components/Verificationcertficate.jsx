import React, { useState } from "react";
import "../css/Verification.css";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (e) => {
    setCertificateId(e.target.value);
  };

  const handleVerify = () => {
    if (certificateId.trim()) {
      setIsVerifying(true);
      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false);
        // Handle verification result here
      }, 1500);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <div className="verify-header">
          <h1 className="verify-title">Verify</h1>
          <h2 className="verify-subtitle">Certificate</h2>
        </div>
        
        <div className="verify-content">
          <p className="verify-instruction">
            Enter your certificate ID below to verify its authenticity
          </p>
          
          <div className="input-group">
            <input
              type="text"
              placeholder="Certificate ID"
              className="verify-input"
              value={certificateId}
              onChange={handleInputChange}
            />
            <i className="input-icons bi bi-patch-check"></i>
          </div>
          
          <button 
            className={`verify-button ${isVerifying ? 'verifying' : ''}`}
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <i className="bi bi-arrow-repeat spin"></i>
                Verifying...
              </>
            ) : (
              <>
                <i className="bi bi-shield-check"></i>
                Verify Certificate
              </>
            )}
          </button>
        </div>
        
        <div className="verify-footer">
          <div className="security-badge">
            <i className="bi bi-lock"></i>
            <span>Secure Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;