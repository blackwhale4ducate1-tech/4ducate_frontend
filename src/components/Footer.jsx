import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic
    console.log('Subscribing email:', email);
    setEmail('');
  };

  const footerStyles = {
    footer: {
      backgroundColor: '#242526',
      color: 'white',
      padding: '40px 20px',
      width: '100%',
      boxSizing: 'border-box'
    },
    con: {
     Width: '100%',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    logoSection: {
      flex: '1',
      minWidth: '250px',
      marginRight: '20px',
      marginBottom: '20px'
    },
    logo: {
      width: '50px',
      height: '50px',
      marginBottom: '20px'
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px'
    },
    contactText: {
      fontSize: '14px'
    },
    linksSection: {
      flex: '1',
      display: 'flex',
      justifyContent: 'space-around',
      minWidth: '300px',
      marginBottom: '20px'
    },
    linksColumn: {
      width: '45%'
    },
    columnHeading: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '20px'
    },
    linksList: {
      listStyle: 'none',
      padding: '0',
      margin: '0'
    },
    linkItem: {
      marginBottom: '12px'
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'opacity 0.3s ease'
    },
    newsletterSection: {
      flex: '1',
      minWidth: '250px'
    },
    emailInput: {
      width: '100%',
      padding: '12px 15px',
      marginBottom: '15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#333',
      color: 'white',
      boxSizing: 'border-box'
    },
    sendButton: {
      backgroundColor: '#4169E1',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '12px 25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s ease'
    },
    copyright: {
      width: '100%',
      textAlign: 'center',
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #3a3b3c',
      fontSize: '14px',
      color: '#aaa'
    },
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column'
      },
      linksSection: {
        flexDirection: 'column',
        gap: '30px'
      },
      linksColumn: {
        marginBottom: '15px'
      }
    }
  };

  // Apply media query styling
  const applyMediaQueryStyles = () => {
    if (window.innerWidth <= 768) {
      return {
        container: {
          ...footerStyles.container,
          flexDirection: 'column'
        },
        linksSection: {
          ...footerStyles.linksSection,
          flexDirection: 'column',
          gap: '30px'
        }
      };
    }
    return {};
  };

  const mediaStyles = applyMediaQueryStyles();

  return (
    <footer style={footerStyles.footer}>
      <div style={{...footerStyles.con, ...mediaStyles.con}}>
        {/* Logo and Contact Info */}
        <div style={footerStyles.logoSection}>
          <div style={footerStyles.logo}>
            {/* Logo SVG */}
            <svg viewBox="0 0 50 50" fill="currentColor">
              <path d="M25 2C12.3 2 2 12.3 2 25s10.3 23 23 23 23-10.3 23-23S37.7 2 25 2zm0 42c-10.5 0-19-8.5-19-19S14.5 6 25 6s19 8.5 19 19-8.5 19-19 19zm-7-28v14l12-7-12-7z" />
            </svg>
          </div>
          
          {/* Contact Information */}
          <div style={footerStyles.contactInfo}>
            <div style={footerStyles.contactItem}>
              <MapPin size={16} />
              <span style={footerStyles.contactText}>8819 Ohio St. South Gate, CA 90280</span>
            </div>
            <div style={footerStyles.contactItem}>
              <Mail size={16} />
              <span style={footerStyles.contactText}>Support@4ducate.com</span>
            </div>
            <div style={footerStyles.contactItem}>
              <Phone size={16} />
              <span style={footerStyles.contactText}>+1 986-688-3296</span>
            </div>
          </div>
        </div>
        
        {/* Links Columns */}
        <div style={{...footerStyles.linksSection, ...mediaStyles.linksSection}}>
          {/* Useful Links */}
          <div style={footerStyles.linksColumn}>
            <h3 style={footerStyles.columnHeading}>Useful Links</h3>
            <ul style={footerStyles.linksList}>
              <li style={footerStyles.linkItem}><a href="#" style={footerStyles.link}>Home</a></li>
              <li style={footerStyles.linkItem}><a href="#" style={footerStyles.link}>Courses</a></li>
              <li style={footerStyles.linkItem}><a href="#" style={footerStyles.link}>Certificate Verification</a></li>
              <li style={footerStyles.linkItem}><a href="#" style={footerStyles.link}>Who We Are</a></li>
              <li style={footerStyles.linkItem}><a href="#" style={footerStyles.link}>Reach Us</a></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div style={footerStyles.linksColumn}>
            <h3 style={footerStyles.columnHeading}>Legal</h3>
            <ul style={footerStyles.linksList}>
              <li style={footerStyles.linkItem}><a href="#" style={footerStyles.link}>Terms & Conditions</a></li>
              <li style={footerStyles.linkItem}><a href="#" style={footerStyles.link}>Refund Policy</a></li>
              <li style={footerStyles.linkItem}><a href="#" style={footerStyles.link}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div style={footerStyles.newsletterSection}>
          <h3 style={footerStyles.columnHeading}>Join a Newsletter</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              style={footerStyles.emailInput}
              required
            />
            <button 
              type="submit" 
              style={footerStyles.sendButton}
            >
              Send
            </button>
          </form>
        </div>
      </div>
      
      {/* Copyright */}
      <div style={footerStyles.copyright}>
        Copyright© 4ducate
      </div>
    </footer>
  );
}