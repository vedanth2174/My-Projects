import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import './Profile.css';

export const Profile = ({
  onNavigateToDashboard, 
  onNavigateToExplore, 
  onNavigateToAdmin,
  walletConnected,
  walletAddress,
  onConnectWallet,
  onDisconnectWallet
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        setError('MetaMask is not installed. Please install MetaMask to continue.');
        setIsConnecting(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        onConnectWallet(address);
        console.log('Connected to wallet:', address);
      }
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      setError('Failed to connect to MetaMask. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = () => {
    onDisconnectWallet();
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="app-container">
      <Header 
        user={user}
        onSignOut={() => console.log('Sign out')}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToAdmin={onNavigateToAdmin}
      />
      
      <main className="profile-main">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#222"/>
                <path d="M40 44C48.2843 44 55 37.2843 55 29C55 20.7157 48.2843 14 40 14C31.7157 14 25 20.7157 25 29C25 37.2843 31.7157 44 40 44Z" fill="#fff"/>
                <path d="M15 66C15 55.5066 23.5066 47 34 47H46C56.4934 47 65 55.5066 65 66V70H15V66Z" fill="#fff"/>
              </svg>
            </div>
            <h1>Profile</h1>
          </div>

          <div className="profile-section">
            <h2>User Details</h2>
            <div className="detail-card">
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{user?.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user?.email || 'Not provided'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">October 2025</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Wallet Connection</h2>
            <div className="wallet-card">
              <div className="wallet-info-section">
                <div className="wallet-icon-large">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 20H40" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="32" cy="28" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <div className="wallet-description">
                  <h3>MetaMask Wallet</h3>
                  <p>
                    {walletConnected 
                      ? 'Your wallet is connected. You can now create networks on the blockchain.' 
                      : 'Connecting your wallet is optional for joining networks and adding suggestions, but required for creating new networks.'}
                  </p>
                </div>
              </div>

              {error && (
                <div className="profile-error-message">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              {!walletConnected ? (
                <button 
                  className="profile-wallet-connect-btn" 
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <span className="spinner"></span>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 18V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V6M21 12H13M13 12L16 9M13 12L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Connect MetaMask (Optional)
                    </>
                  )}
                </button>
              ) : (
                <div className="wallet-connected-info">
                  <div className="wallet-status-display">
                    <div className="status-indicator-green"></div>
                    <span className="wallet-status-text">Wallet Connected</span>
                  </div>
                  <div className="wallet-address-display">{formatAddress(walletAddress)}</div>
                  <button className="profile-disconnect-btn" onClick={handleDisconnectWallet}>
                    Disconnect Wallet
                  </button>
                </div>
              )}

              <div className="wallet-features">
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Join Networks</span>
                </div>
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Add Suggestions</span>
                </div>
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke={walletConnected ? "#4ade80" : "#666"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={!walletConnected ? 'disabled' : ''}>
                    Create Networks {!walletConnected && '(Requires Wallet)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
