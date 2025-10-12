import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './signup.css';

const Signup = () => {
    const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    institution: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    // Reset form when switching modes
    setFormData({
      firstName: '',
      lastName: '',
      institution: '',  
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let url = "";
    let payload = {};

    if (isSignUp) {
      url = "https://diagnosismd.onrender.com/signup";
      payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        institution: formData.institution,
        email: formData.email,
        password: formData.password,
        agreeToTerms: formData.agreeToTerms,
        confirmPassword: formData.confirmPassword,
      };
    } else {
      url = "https://diagnosismd.onrender.com/login";
      payload = {
        email: formData.email,
        password: formData.password,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || response.statusText || (isSignUp ? "Signup failed" : "Login failed"));
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setIsSignUp(false);
    navigate(isSignUp ? "/signup" : "/dashboard") // ✅ better than window.location.href

  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
};



  const GoogleIcon = () => (
    <svg className="social-icon" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  const MicrosoftIcon = () => (
    <svg className="social-icon" viewBox="0 0 24 24" fill="#00A4EF">
      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
    </svg>
  );

  const ShieldIcon = () => (
    <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );

  const ThumbsUpIcon = () => (
    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    </svg>
  );

  const PlusIcon = () => (
    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );

  return (
    <div className="auth-page">
      {/* Header */}
      <header className="auth-header">
        <div className="auth-container">
          <div className="nav-brand">
            <h2 className="brand-name"
            onClick={() => navigate('/')}
            >diagnosisMD</h2>
          </div>
          <div className="auth-nav">
            <a href="#" className="back-link"
            onClick={() => navigate('/')}
            >← Back to Home</a>
          </div>
        </div>
      </header>

      {/* Main Auth Content */}
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-wrapper">
            {/* Left Side - Form */}
            <div className="auth-form-section">
              <div className="auth-form-container">
                <div className="auth-header-content">
                  <h1 className="auth-title">
                    {isSignUp ? 'Join diagnosisMD' : 'Welcome Back'}
                  </h1>
                  <p className="auth-subtitle">
                    {isSignUp 
                      ? 'Start transforming your radiology practice with AI-powered analysis'
                      : 'Sign in to access your AI-powered radiology tools'
                    }
                  </p>
                </div>

                {/* Social Login Buttons */}
                <div className="social-login">
                  <button className="social-btn google-btn">
                    <GoogleIcon />
                    Continue with Google
                  </button>
                  <button className="social-btn microsoft-btn">
                    <MicrosoftIcon />
                    Continue with Microsoft
                  </button>
                </div>

                <div className="divider">
                  <span className="divider-text">or</span>
                </div>

                {/* Form */}
                <div className="auth-form">
                  {/* Sign Up Fields */}
                  {isSignUp && (
                    <>
                      <div className="form-row">
                        <div className="form-group-signup">
                          <label htmlFor="firstName" className="form-label">First Name</label>
                          <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            className="form-input" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        <div className="form-group-signup">
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                          <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            className="form-input" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="form-group-signup">
                        <label htmlFor="institution" className="form-label">Medical Institution</label>
                        <input 
                          type="text" 
                          id="institution" 
                          name="institution" 
                          className="form-input" 
                          placeholder="e.g., Metropolitan Medical Center" 
                          value={formData.institution}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>

                      
                    </>
                  )}

                  <div className="form-group-signup">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-input" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="form-group-signup">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="form-input" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  {isSignUp && (
                    <div className="form-group-signup">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        className="form-input" 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  )}

                  {!isSignUp && (
                    <div className="form-group-signup">
                      <a href="#" className="forgot-password">Forgot your password?</a>
                    </div>
                  )}

                  {isSignUp && (
                    <div className="form-group-signup">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          name="agreeToTerms" 
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          required 
                        />
                        I agree to the <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
                      </label>
                    </div>
                  )}

                  <button type="submit" className="auth-submit-btn" onClick={handleSubmit}>
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRightIcon />
                  </button>
                </div>

                <div className="auth-switch">
                  <p>
                    <span>
                      {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    </span>
                    <button type="button" onClick={toggleAuthMode} className="switch-btn">
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Content */}
            <div className="auth-hero-section">
              <div className="auth-hero-content">
                <div className="hero-badge">
                  <ShieldIcon />
                  HIPAA Compliant & Secure
                </div>
                
                <h2 className="hero-title">
                  Transforming Radiology with <span className="text-primary">AI Precision</span>
                </h2>
                
                <p className="hero-description">
                  Join 500+ healthcare institutions using diagnosisMD to generate reports 10x faster while maintaining 99.2% accuracy.
                </p>

                <div className="features-list">
                  <div className="feature-item">
                    <ClockIcon />
                    <span>10x faster report generation</span>
                  </div>
                  <div className="feature-item">
                    <ThumbsUpIcon />
                    <span>99.2% diagnostic accuracy</span>
                  </div>
                  <div className="feature-item">
                    <PlusIcon />
                    <span>Evidence-based treatment suggestions</span>
                  </div>
                </div>

                <div className="testimonial-preview">
                  <blockquote className="testimonial-quote">
                    "diagnosisMD has revolutionized our radiology department. We've reduced report turnaround time by 85% while maintaining the highest accuracy standards."
                  </blockquote>
                  <div className="testimonial-author">
                    <div className="author-avatar">SC</div>
                    <div>
                      <div className="author-name">Dr. Sarah Chen</div>
                      <div className="author-title">Chief Radiologist, Metropolitan Medical</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
