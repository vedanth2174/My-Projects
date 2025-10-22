import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TrustBox</h3>
            <p>A Transparent Suggestion Box Powered by Blockchain</p>
          </div>
          
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Store your idea securely using blockchain</li>
              <li>Community members upvote/downvote ideas</li>
              <li>Smart contracts finalize accepted suggestions</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/dashboard">My Networks</a></li>
              <li><a href="/explore">Explore Networks</a></li>
              <li><a href="/how-it-works">How It Works</a></li>
              <li><a href="/features">Features</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 TrustBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
