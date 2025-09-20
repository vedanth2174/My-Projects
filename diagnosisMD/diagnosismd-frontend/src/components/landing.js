import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './landing.css';


const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav-brand">
            <h2 className="brand-name"
            onClick={() => navigate('/')}
            >diagnosisMD</h2>
          </div>
          <nav className="nav-menu">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#footer">Contact</a>
          </nav>
          <div class="button-group">
            <button id='sign-in' className="btn ghost desktop-only"
            onClick={() => navigate('/signup')}
            >Sign In</button>
        </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <span className="badge">
              Trusted by 500+ Healthcare Institutions
            </span>

            <h1 className="hero-title">
              Transforming Radiology with <span className="text-primary">AI Precision</span>
            </h1>

            <p className="hero-description">
              Our AI-powered medical diagnosis tool analyzes X-rays and MRI scans to help radiologists generate reports
              10x faster while suggesting evidence-based treatments and medications. Completely free for all healthcare
              professionals.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary large"
              onClick={() => navigate('/signup')}
              >
                Get Started 
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <button className="btn-outline large">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21 5,3" />
                </svg>
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Revolutionizing Medical Imaging</h2>
            <p>
              Empower your radiology team with cutting-edge AI technology that enhances accuracy, speed, and patient
              outcomes.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="card-header">
                <div className="feature-header">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  <span className="feature-badge">10x Faster</span>
                </div>
                <h3 className="card-title">Fast Report Generation</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Generate comprehensive radiology reports in under 2 minutes, reducing turnaround time by 90%.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-header">
                <div className="feature-header">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                  </svg>
                  <span className="feature-badge">99.2% Accuracy</span>
                </div>
                <h3 className="card-title">AI-Powered Analysis</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Advanced machine learning algorithms trained on millions of medical images for accurate diagnosis.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-header">
                <div className="feature-header">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14,2 14,8 20,8" />
                  </svg>
                  <span className="feature-badge">DICOM Compatible</span>
                </div>
                <h3 className="card-title">Structured Reports</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Standardized, detailed reports that follow medical guidelines and integrate with existing systems.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-header">
                <div className="feature-header">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
                  </svg>
                  <span className="feature-badge">Evidence-Based</span>
                </div>
                <h3 className="card-title">Treatment Suggestions</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Evidence-based treatment recommendations and medication suggestions based on diagnosis.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-header">
                <div className="feature-header">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  <span className="feature-badge">Secure</span>
                </div>
                <h3 className="card-title">HIPAA Compliant</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Enterprise-grade security ensuring patient data privacy and regulatory compliance.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-header">
                <div className="feature-header">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
                  </svg>
                  <span className="feature-badge">Plug & Play</span>
                </div>
                <h3 className="card-title">Seamless Integration</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Easy integration with existing PACS, EMR, and hospital information systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How diagnosisMD Works</h2>
            <p>
              Our streamlined workflow integrates seamlessly into your existing radiology practice, enhancing efficiency
              without disrupting your established processes.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="card-header">
                <div className="step-number">1</div>
                <h3 className="card-title">Upload Medical Images</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Securely upload X-rays, MRI scans, or CT images directly from your PACS system or through our
                  user-friendly interface.
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="card-header">
                <div className="step-number">2</div>
                <h3 className="card-title">AI Analysis & Processing</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Our advanced AI algorithms analyze the images, identifying patterns and anomalies with medical-grade
                  precision in seconds.
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="card-header">
                <div className="step-number">3</div>
                <h3 className="card-title">Generate Comprehensive Reports</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Receive detailed, structured reports with findings, measurements, and preliminary diagnoses formatted
                  to medical standards.
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="card-header">
                <div className="step-number">4</div>
                <h3 className="card-title">Treatment Recommendations</h3>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Get evidence-based treatment suggestions and medication recommendations tailored to the specific
                  diagnosis and patient profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by Medical Professionals</h2>
            <p>
              See how diagnosisMD is transforming radiology practices and improving patient outcomes across healthcare
              institutions worldwide.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="card-header">
                <div className="author-info">
                  <div>
                    <h4 className="card-title">Dr. Sarah Chen</h4>
                    <p className="card-description">Chief Radiologist, Metropolitan Medical Center</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <p className="card-description">
                  "diagnosisMD has revolutionized our radiology department. We've reduced report turnaround time by 85%
                  while maintaining the highest accuracy standards. It's an indispensable tool for modern healthcare."
                </p>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="card-header">
                <div className="author-info">
                  <div>
                    <h4 className="card-title">Dr. Michael Rodriguez</h4>
                    <p className="card-description">Senior Radiologist, City General Hospital</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <p className="card-description">
                  "The AI-powered treatment suggestions have been incredibly valuable. They provide evidence-based
                  recommendations that complement our clinical expertise, leading to better patient outcomes."
                </p>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="card-header">
                <div className="author-info">
                  <div>
                    <h4 className="card-title">Dr. Emily Watson</h4>
                    <p className="card-description">Department Head, Regional Healthcare Network</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <p className="card-description">
                  "Integration was seamless with our existing PACS system. The structured reports are comprehensive and
                  follow all medical guidelines. Our entire team adopted it within days."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id='footer' className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>diagnosisMD</h3>
              <p>
                Empowering healthcare professionals with AI-powered medical imaging analysis for faster, more accurate
                diagnoses.
              </p>
            </div>

            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#pricing">Pricing</a>
                <a href="#integrations">Integrations</a>
              </div>

              <div className="link-group">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
                <a href="#blog">Blog</a>
              </div>

              <div className="link-group">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#documentation">Documentation</a>
                <a href="#api">API Reference</a>
                <a href="#status">System Status</a>
              </div>

              <div className="link-group">
                <h4>Legal</h4>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#hipaa">HIPAA Compliance</a>
                <a href="#security">Security</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 diagnosisMD. All rights reserved.</p>
            <div className="social-links">
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;