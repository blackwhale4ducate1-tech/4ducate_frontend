import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useSpring, animated } from "@react spring/web";
import { useSpring, animated } from "@react-spring/web";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BASE_URL } from "../../env";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Animation for card entrance
  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(100%)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 20, duration: 600 },
  });

  // Animation for gradient side
  const gradientAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(-30px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 100,
    config: { tension: 200, friction: 20 },
  });

  // Animation for form elements
  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(30px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 200,
    config: { tension: 200, friction: 20 },
    reset: currentStep, // Reset animation on step change
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Cookie utility functions
  const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        try {
          return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
        } catch (e) {
          return c.substring(nameEQ.length, c.length);
        }
      }
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/addDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "UserDetails",
          type: "Add",
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          roleId: 1
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Registration successful
        // console.log('Registration successful:', data);
        
        // Store user data in cookies
        if (data.user) {
          setCookie('user', data.user, 30); // Store for 30 days
          setCookie('userId', data.user.id, 30);
          setCookie('userEmail', data.user.email, 30);
          setCookie('userName', data.user.fullName, 30);
          setCookie('userRole', data.user.roleId, 30);
          
          // Store additional user fields if they exist
          Object.keys(data.user).forEach(key => {
            if (key !== 'password') { // Don't store password
              setCookie(`user_${key}`, data.user[key], 30);
            }
          });
        }

        // Store authentication token if provided
        if (data.token) {
          setCookie('authToken', data.token, 30);
          setCookie('isAuthenticated', true, 30);
        }

        // Store login timestamp
        setCookie('loginTime', new Date().toISOString(), 30);
        
        // console.log('User data stored in cookies successfully');
        
        // Show success message briefly before redirect
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        
      } else {
        // Handle error response
        setError(data.error || data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Inline styles
  const containerStyles = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    padding: "2rem 0",
  };

  const cardStyles = {
    borderRadius: "20px",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    maxWidth: "900px",
    width: "100%",
    display: "flex",
    flexDirection: window.innerWidth < 768 ? "column" : "row",
    overflow: "hidden",
  };

  const gradientSideStyles = {
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    padding: window.innerWidth < 768 ? "2rem" : "3rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: window.innerWidth < 768 ? "none" : "0 0 41.6667%",
    minHeight: window.innerWidth < 768 ? "auto" : "100%",
    position: "relative",
  };

  const formSideStyles = {
    backgroundColor: "#fff",
    padding: window.innerWidth < 768 ? "2rem" : "3rem",
    flex: window.innerWidth < 768 ? "none" : "0 0 58.3333%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const brandLogoStyles = {
    fontWeight: "800",
    letterSpacing: "1px",
    color: "#fff",
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
  };

  const quoteStyles = {
    color: "#fff",
    fontSize: "1.25rem",
    fontStyle: "italic",
    margin: "1.5rem 0 0",
    lineHeight: "1.6",
  };

  const inputGroupStyles = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "1rem",
  };

  const inputStyles = {
    padding: "12px 15px",
    border: "none",
    fontSize: "1rem",
    flex: 1,
    borderRadius: "0 8px 8px 0",
  };

  const inputGroupTextStyles = {
    padding: "12px 15px",
    color: "#6c757d",
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px 0 0 8px",
  };

  const buttonStyles = {
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    border: "none",
    padding: "12px",
    fontWeight: "600",
    borderRadius: "25px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const secondaryButtonStyles = {
    border: "1px solid #e0e0e0",
    padding: "12px",
    fontWeight: "500",
    borderRadius: "25px",
    backgroundColor: "transparent",
    color: "#6c757d",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const labelStyles = {
    fontWeight: "500",
    marginBottom: "0.5rem",
    display: "block",
    color: "#212529",
  };

  const linkStyles = {
    color: "#6a11cb",
    textDecoration: "none",
    fontWeight: "600",
  };

  const dividerStyles = {
    display: "flex",
    alignItems: "center",
    margin: "1.5rem 0",
  };

  const dividerLineStyles = {
    flex: 1,
    height: "1px",
    backgroundColor: "#e0e0e0",
  };

  const passwordToggleStyles = {
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#6c757d",
    padding: "12px 15px",
  };

  const stepIndicatorStyles = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#dee2e6",
    zIndex: 1,
  };

  const stepIndicatorActiveStyles = {
    ...stepIndicatorStyles,
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  };

  const stepIndicatorCompletedStyles = {
    ...stepIndicatorStyles,
    backgroundColor: "#198754",
  };

  const stepLineStyles = {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: "2px",
    backgroundColor: "#dee2e6",
    zIndex: 0,
  };

  const stepLineActiveStyles = {
    ...stepLineStyles,
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  };

  const stepLineCompletedStyles = {
    ...stepLineStyles,
    backgroundColor: "#198754",
  };

  const errorStyles = {
    color: "#dc3545",
    fontSize: "0.875rem",
    marginBottom: "1rem",
    padding: "0.5rem",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    borderRadius: "4px",
  };

  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            40%, 43% {
              transform: translate3d(0, -8px, 0) scale(1.05);
            }
            70% {
              transform: translate3d(0, -4px, 0) scale(1.02);
            }
            90% {
              transform: translate3d(0, -2px, 0) scale(1.01);
            }
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(106, 17, 203, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(106, 17, 203, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(106, 17, 203, 0);
            }
          }

          @keyframes spinner-border {
            to {
              transform: rotate(360deg);
            }
          }

          .register-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(106, 17, 203, 0.3);
            animation: bounce 0.6s ease;
          }

          .register-btn:active {
            transform: translateY(-1px);
          }

          .register-btn::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            background-color: #fff;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          .register-input:focus {
            box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.1);
            outline: none;
          }

          .register-secondary-btn:hover {
            background-color: #f8f9fa;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          @media (max-width: 767px) {
            .register-responsive-hide { display: none; }
            .register-mobile-center { text-align: center; }
          }
        `}
      </style>
      <div style={containerStyles}>
        <animated.div style={{ ...cardStyles, ...cardAnimation }} className="register-card">
          {/* Gradient Side */}
          <animated.div style={{ ...gradientSideStyles, ...gradientAnimation }}>
            <div style={{ color: "#fff" }}>
              <h1 style={brandLogoStyles}>4DUCATE</h1>
              <blockquote style={quoteStyles}>
                Join our community today and start your journey towards knowledge and growth.
              </blockquote>
              <div style={{ marginTop: "2rem", paddingTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                  <i className="bi bi-check-circle-fill" style={{ marginRight: "0.5rem" }}></i>
                  <span>Personalized learning paths</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                  <i className="bi bi-check-circle-fill" style={{ marginRight: "0.5rem" }}></i>
                  <span>Access to expert instructors</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i className="bi bi-check-circle-fill" style={{ marginRight: "0.5rem" }}></i>
                  <span>Interactive learning materials</span>
                </div>
              </div>
            </div>
          </animated.div>

          {/* Form Side */}
          <animated.div style={{ ...formSideStyles, ...formAnimation }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontWeight: "700", marginBottom: "0.5rem", fontSize: "1.75rem", color: "#333" }}>
                Create Your Account
              </h2>
              <p style={{ color: "#6c757d", margin: 0 }}>Sign up in just a few simple steps</p>
            </div>

            {/* Step Indicators */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", position: "relative" }}>
              <div
                style={
                  currentStep > 1
                    ? stepLineCompletedStyles
                    : currentStep === 1
                    ? stepLineActiveStyles
                    : stepLineStyles
                }
              ></div>
              {[1, 2].map((step) => (
                <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={
                      currentStep > step
                        ? stepIndicatorCompletedStyles
                        : currentStep === step
                        ? stepIndicatorActiveStyles
                        : stepIndicatorStyles
                    }
                  >
                    {currentStep > step ? <i className="bi bi-check"></i> : step}
                  </div>
                  <span style={{ fontSize: "0.875rem", marginTop: "0.5rem", color: "#6c757d" }}>
                    {step === 1 ? "Personal Info" : "Account Setup"}
                  </span>
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div style={errorStyles}>
                <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: "0.5rem" }}></i>
                {error}
              </div>
            )}

            {/* Multi-step Form */}
            <form onSubmit={handleRegister}>
              {/* Step 1: Name & Email */}
              {currentStep === 1 && (
                <div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label htmlFor="fullName" style={labelStyles}>
                      Full Name
                    </label>
                    <div style={inputGroupStyles}>
                      <span style={inputGroupTextStyles}>
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="register-input"
                        style={inputStyles}
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label htmlFor="email" style={labelStyles}>
                      Email Address
                    </label>
                    <div style={inputGroupStyles}>
                      <span style={inputGroupTextStyles}>
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="register-input"
                        style={inputStyles}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@example.com"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="register-btn"
                    style={buttonStyles}
                    onClick={nextStep}
                  >
                    Continue <i className="bi bi-arrow-right" style={{ marginLeft: "0.5rem" }}></i>
                  </button>
                </div>
              )}

              {/* Step 2: Password */}
              {currentStep === 2 && (
                <div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label htmlFor="password" style={labelStyles}>
                      Password
                    </label>
                    <div style={inputGroupStyles}>
                      <span style={inputGroupTextStyles}>
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="register-input"
                        style={inputStyles}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        style={passwordToggleStyles}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6c757d", marginTop: "0.25rem" }}>
                      Must be at least 8 characters with numbers and symbols
                    </div>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label htmlFor="confirmPassword" style={labelStyles}>
                      Confirm Password
                    </label>
                    <div style={inputGroupStyles}>
                      <span style={inputGroupTextStyles}>
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="register-input"
                        style={inputStyles}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        style={passwordToggleStyles}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                    <button
                      type="button"
                      className="register-secondary-btn"
                      style={secondaryButtonStyles}
                      onClick={prevStep}
                    >
                      <i className="bi bi-arrow-left" style={{ marginRight: "0.5rem" }}></i> Back
                    </button>
                    <button
                      type="submit"
                      className={`register-btn ${isLoading ? "disabled" : ""}`}
                      style={{ ...buttonStyles, opacity: isLoading ? 0.65 : 1 }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            style={{
                              display: "inline-block",
                              width: "1rem",
                              height: "1rem",
                              border: "0.125em solid #fff",
                              borderRightColor: "transparent",
                              borderRadius: "50%",
                              animation: "spinner-border 0.75s linear infinite",
                              marginRight: "0.5rem",
                            }}
                          ></span>
                          Creating Account...
                        </>
                      ) : (
                        "Complete Registration"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Social Login */}
              {currentStep === 1 && (
                <div style={{ marginTop: "1.5rem" }}>
                  <div style={dividerStyles}>
                    <div style={dividerLineStyles}></div>
                    <span style={{ padding: "0 1rem", color: "#6c757d", fontSize: "0.875rem" }}>
                      OR SIGN UP WITH
                    </span>
                    <div style={dividerLineStyles}></div>
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <button
                      type="button"
                      className="register-secondary-btn"
                      style={secondaryButtonStyles}
                    >
                      <i className="bi bi-google" style={{ marginRight: "0.5rem" }}></i> Google
                    </button>
                  </div>
                </div>
              )}

              {/* Sign In Link */}
              <p style={{ textAlign: "center", marginTop: "1.5rem", marginBottom: 0, fontSize: "0.875rem", color: "#6c757d" }}>
                Already have an account?{" "}
                <Link to="/login" style={linkStyles}>
                  Sign in here
                </Link>
              </p>
            </form>
          </animated.div>
        </animated.div>
      </div>
    </>
  );
};

export default Register;