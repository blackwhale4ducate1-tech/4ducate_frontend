import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Reachus = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Trigger visibility animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Add scroll animation detection
    const handleScroll = () => {
      // Calculate scroll progress percentage for the progress bar
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScrollable = docHeight - winHeight;
      const scrolled = (scrollTop / totalScrollable) * 100;
      setScrollProgress(scrolled);
      
      // Animate elements when they enter viewport
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.8;
        
        if (isInViewport) {
          el.classList.add('animate-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <>
      {/* Custom styles for animations and gradients */}
      <style>{`
        .scroll-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #0d6efd, #0066FF);
          width: ${scrollProgress}%;
          z-index: 1100;
          transition: width 0.1s ease;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, #0d6efd 0%, #0066FF 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-gradient::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, 
                        transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, 
                        transparent 75%, transparent);
          background-size: 60px 60px;
          animation: backgroundMove 20s linear infinite;
        }
        
        @keyframes backgroundMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-60px, -60px); }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-on-scroll.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-up {
          opacity: ${isVisible ? '1' : '0'};
          transform: translateY(${isVisible ? '0' : '30px'});
          transition: all 0.8s ease;
        }
        
        .text-gradient {
          background: linear-gradient(90deg, #0d6efd, #0066FF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 700;
        }
        
        .icon-hover:hover {
          transform: translateY(-2px);
          transition: transform 0.3s ease;
        }
        
        .btn-gradient {
          background: linear-gradient(90deg, #0d6efd, #0066FF);
          border: none;
          transition: all 0.3s ease;
        }
        
        .btn-gradient:hover {
          background: linear-gradient(90deg, #0066FF, #0d6efd);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 110, 253, 0.4);
        }
        
        .social-hover:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
        
        .contact-info-item {
          transition: all 0.3s ease;
        }
        
        .contact-info-item:hover {
          transform: translateX(5px);
        }
        
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }
        
        .floating-label {
          position: relative;
        }
        
        .floating-label label {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          background: white;
          padding: 0 4px;
          color: #6c757d;
          transition: all 0.3s ease;
          pointer-events: none;
        }
        
        .floating-label input:focus + label,
        .floating-label input:not(:placeholder-shown) + label,
        .floating-label textarea:focus + label,
        .floating-label textarea:not(:placeholder-shown) + label {
          top: 0;
          font-size: 0.875rem;
          color: #0d6efd;
        }
        
        .floating-label textarea {
          min-height: 120px;
          resize: vertical;
        }
      `}</style>
      
      {/* Scroll progress bar */}
      <div className="scroll-progress-bar"></div>
      
      <div className={`fade-in-up`} ref={containerRef}>
        {/* Hero Section */}
        <div className="hero-gradient text-white py-5 position-relative">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center position-relative" style={{zIndex: 1}}>
                <h1 className="display-3 fw-bold mb-0 animate-on-scroll">Reach Us</h1>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container-fluid px-4" style={{marginTop: '-60px'}}>
          <div className="row g-0 justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="row g-0 shadow-lg rounded-4 overflow-hidden" style={{zIndex: 2, position: 'relative'}}>
                
                {/* Left Side - Contact Info */}
                <div className="col-lg-6">
                  <div className="bg-dark text-white p-5 h-100 d-flex flex-column">
                    <div className="animate-on-scroll">
                      <h2 className="display-6 fw-bold mb-4">
                        Let's talk<br />
                        on something <span className="text-gradient">great</span><br />
                        together
                      </h2>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="contact-info-item d-flex align-items-center mb-4 animate-on-scroll">
                        <div className="bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3 icon-hover" style={{width: '40px', height: '40px'}}>
                          <span style={{fontSize: '18px'}}>✉️</span>
                        </div>
                        <span className="text-light">andreaDesign@gmail.com</span>
                      </div>
                      
                      <div className="contact-info-item d-flex align-items-center mb-4 animate-on-scroll">
                        <div className="bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3 icon-hover" style={{width: '40px', height: '40px'}}>
                          <span style={{fontSize: '18px'}}>📱</span>
                        </div>
                        <span className="text-light">+34 123 456 789</span>
                      </div>
                      
                      <div className="contact-info-item d-flex align-items-center mb-4 animate-on-scroll">
                        <div className="bg-primary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3 icon-hover" style={{width: '40px', height: '40px'}}>
                          <span style={{fontSize: '18px'}}>📍</span>
                        </div>
                        <span className="text-light">123 Street 487 House</span>
                      </div>
                      
                      <div className="d-flex mt-4 animate-on-scroll">
                        <div className="bg-light bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3 social-hover" style={{width: '40px', height: '40px', cursor: 'pointer'}}>
                          <span className="text-white fw-bold">in</span>
                        </div>
                        <div className="bg-light bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center social-hover" style={{width: '40px', height: '40px', cursor: 'pointer'}}>
                          <span className="text-white fw-bold">GH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Contact Form */}
                <div className="col-lg-6">
                  <div className="bg-white p-5 h-100">
                    <div className="animate-on-scroll floating-label mb-4">
                      <input 
                        type="text" 
                        className="form-control border-0 border-bottom border-2 rounded-0 bg-transparent py-3" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        placeholder=" "
                        required
                      />
                      <label htmlFor="name">Your name</label>
                    </div>
                    
                    <div className="animate-on-scroll floating-label mb-4">
                      <input 
                        type="email" 
                        className="form-control border-0 border-bottom border-2 rounded-0 bg-transparent py-3" 
                        id="email"
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        placeholder=" "
                        required
                      />
                      <label htmlFor="email">Your email</label>
                    </div>
                    
                    <div className="animate-on-scroll floating-label mb-4">
                      <textarea 
                        className="form-control border-0 border-bottom border-2 rounded-0 bg-transparent py-3" 
                        id="message"
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange}
                        placeholder=" "
                        required
                      ></textarea>
                      <label htmlFor="message">Your message</label>
                    </div>
                    
                    <div className="animate-on-scroll">
                      <button 
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn btn-gradient text-white fw-semibold py-3 w-100 rounded-3"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Add some bottom spacing */}
        <div className="py-5"></div>
      </div>
    </>
  );
};

export default Reachus;