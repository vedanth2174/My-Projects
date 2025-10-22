import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export const Header = ({ user }) => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.clear();
        window.location.reload();
    }
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1>TrustBox</h1>
        </div>
        
        <nav className="header-nav">
          <a onClick={()=>navigate('/dashboard')} className="nav-link">My Networks</a>
          <a onClick={()=>navigate('/explore-networks')} className="nav-link">Explore Networks</a>
          <a onClick={()=>navigate('/admin')} className="nav-link">Admin</a>
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <div className="user-info" onClick={()=>navigate("/profile")}>
                <span className="user-name">{user.name}</span>
              </div>
              <button className="sign-out-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <button className="sign-in-btn">Sign In</button>
          )}
        </div>
      </div>
    </header>
  );
};
