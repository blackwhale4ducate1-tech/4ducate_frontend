import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CorporateWhoWeAre = () => {
  const { isDark } = useTheme();
  const [activeCard, setActiveCard] = useState(1);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  
  useEffect(() => {
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          el.classList.add('animate-visible');
        }
      });
    };

    // Navbar scroll effect
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', handleScroll);
    animateOnScroll(); // Trigger on initial load
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const reasonData = [
    { 
      id: 1, 
      title: "Industry-Leading Innovation", 
      description: "We leverage cutting-edge technology and data-driven insights to deliver exceptional educational solutions that drive measurable business outcomes." 
    },
    { 
      id: 2, 
      title: "Enterprise-Grade Excellence", 
      description: "Our team of certified professionals brings decades of combined experience in delivering scalable, enterprise-level educational solutions." 
    },
    { 
      id: 3, 
      title: "Proven ROI & Performance", 
      description: "Our solutions have consistently delivered 300%+ improvement in learning engagement and 85% reduction in training costs for Fortune 500 companies." 
    }
  ];
  
  const featureCards = [
    {
      id: 1,
      title: "Strategic Learning Architecture",
      description: "Comprehensive learning ecosystems designed to align with corporate objectives and drive organizational transformation through systematic skill development.",
      icon: "🏗️"
    },
    {
      id: 2,
      title: "AI-Powered Analytics Platform",
      description: "Advanced intelligence systems that provide real-time performance insights, predictive analytics, and automated optimization for maximum learning efficiency.",
      icon: "📊"
    },
    {
      id: 3,
      title: "Enterprise Integration Suite",
      description: "Seamless integration with existing corporate infrastructure, HR systems, and business intelligence platforms for unified organizational learning.",
      icon: "🔗"
    }
  ];

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .corporate-container {
          background: #f8fafc;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        /* Navbar Styles */
        .corporate-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          padding: 1rem 0;
        }
        
        .corporate-navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          padding: 0.75rem 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .navbar-brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          text-decoration: none;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .navbar-nav {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          text-decoration: none;
          color: #64748b;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }
        
        .nav-link:hover {
          color: #3b82f6;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .navbar-cta {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .navbar-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          color: white;
          text-decoration: none;
        }
        
        /* Mobile menu button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #64748b;
          cursor: pointer;
        }
        
        /* Content Styles */
        .main-content {
          margin-top: 100px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 2rem;
        }
        
        /* Animation styles */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-on-scroll.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Hero section */
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin: 5rem 0;
        }
        
        .hero-content {
          background: linear-gradient(135deg, #1e293b, #334155);
          padding: 3rem;
          border-radius: 16px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .hero-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1));
          z-index: 1;
        }
        
        .hero-content > * {
          position: relative;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        .hero-image {
          position: relative;
        }
        
        .hero-image img {
          width: 100%;
          border-radius: 16px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        .hero-image::after {
          content: '';
          position: absolute;
          width: 80%;
          height: 80%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2));
          bottom: -20px;
          right: -20px;
          border-radius: 16px;
          z-index: -1;
        }
        
        /* Section headers */
        .section-header {
          text-align: center;
          margin: 5rem 0 3rem 0;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .section-subtitle {
          font-size: 1.125rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Reason cards */
        .reasons-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .reason-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #e2e8f0;
        }
        
        .reason-card:hover,
        .reason-card.active {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.02), rgba(99, 102, 241, 0.02));
          border-color: #3b82f6;
        }
        
        .reason-card-content {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }
        
        .reason-number {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.125rem;
          flex-shrink: 0;
        }
        
        .reason-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .reason-content p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }
        
        /* Feature cards */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          text-align: center;
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-color: #3b82f6;
        }
        
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }
        
        .feature-card h3 {
          font-size: 1.375rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .feature-card p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }
        
        /* CTA Section */
        .cta-section {
          text-align: center;
          margin: 5rem 0;
          padding: 3rem;
          background: linear-gradient(135deg, #1e293b, #334155);
          border-radius: 16px;
          color: white;
        }
        
        .cta-button {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          cursor: pointer;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
          color: white;
          text-decoration: none;
        }
        
        .cta-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .navbar-container {
            padding: 0 1rem;
          }
          
          .main-content {
            padding: 0 1rem;
            margin-top: 80px;
          }
          
          .hero-section {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin: 2rem 0;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .reason-card-content {
            flex-direction: column;
            text-align: center;
          }
          
          .hero-image::after {
            width: 90%;
            height: 90%;
            bottom: -10px;
            right: -10px;
          }
        }
      `}</style>

      <div className="corporate-container">
        {/* Navigation Bar */}
        {/* <nav className={`corporate-navbar ${isNavbarScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-container">
            <a href="#home" className="navbar-brand">4DUCATE</a>
            
            <ul className="navbar-nav">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="nav-link">{item.name}</a>
                </li>
              ))}
            </ul>
            
            <a href="#contact" className="navbar-cta">Get Started</a>
            
            <button className="mobile-menu-btn">
              ☰
            </button>
          </div>
        </nav> */}

        {/* Main Content */}
        <div className="main-content">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content animate-on-scroll">
              <h1 className="hero-title">WHO WE ARE</h1>
              <p className="hero-subtitle">
                We're the global leader in enterprise learning solutions, transforming how Fortune 500 companies develop talent through cutting-edge technology and strategic educational frameworks.
              </p>
            </div>
            
            <div className="hero-image animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=faces" 
                alt="Corporate team collaboration" 
              />
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="animate-on-scroll">
            <div className="section-header">
              <h2 className="section-title">
                WHY <span className="gradient-text">4DUCATE</span>
              </h2>
              <p className="section-subtitle">
                Discover the strategic advantages that make us the preferred choice for enterprise learning transformation
              </p>
            </div>
            
            <div className="reasons-container">
              {reasonData.map((reason) => (
                <div 
                  key={reason.id}
                  className={`reason-card ${activeCard === reason.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveCard(reason.id)}
                >
                  <div className="reason-card-content">
                    <div className="reason-number">{reason.id}</div>
                    <div className="reason-content">
                      <h3>{reason.title}</h3>
                      <p>{reason.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="animate-on-scroll">
            <div className="section-header">
              <h2 className="section-title">Enterprise Solutions</h2>
              <p className="section-subtitle">
                Comprehensive platforms designed for large-scale organizational learning and development
              </p>
            </div>
            
            <div className="features-grid">
              {featureCards.map((card, index) => (
                <div 
                  key={card.id} 
                  className="feature-card animate-on-scroll" 
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="feature-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section animate-on-scroll">
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>
              Ready to Transform Your Organization?
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: '0.9' }}>
              Join 500+ leading companies already using our platform
            </p>
            <button className="cta-button">
              Schedule Enterprise Demo
              <span className="cta-badge">Free</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CorporateWhoWeAre;