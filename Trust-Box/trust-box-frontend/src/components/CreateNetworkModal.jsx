import React, { useState } from 'react';
import './CreateNetworkModal.css';

export const CreateNetworkModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  walletConnected, 
  setWalletConnected,
  walletAddress,
  setWalletAddress 
}) => {
  const [networkName, setNetworkName] = useState('');
  const [networkDescription, setNetworkDescription] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
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
        setWalletAddress(address);
        setWalletConnected(true);
        console.log('Connected to wallet:', address);
      }
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      setError('Failed to connect to MetaMask. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setWalletConnected(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!walletConnected) {
      setError('Please connect your wallet before creating a network.');
      return;
    }

    if (networkName.trim() && networkDescription.trim()) {
      onSubmit({
        name: networkName,
        description: networkDescription,
        creator: walletAddress,
      });
      
      // Reset form
      setNetworkName('');
      setNetworkDescription('');
      setError('');
    }
  };

  const handleClose = () => {
    setNetworkName('');
    setNetworkDescription('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content create-network-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Network</h2>
          <button className="close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="wallet-section">
          {!walletConnected ? (
            <div className="wallet-connect-area">
              <div className="wallet-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 20H40" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="32" cy="28" r="2" fill="currentColor"/>
                </svg>
              </div>
              <h3>Connect Your Wallet</h3>
              <p>You need to connect your MetaMask wallet to create a network on the blockchain</p>
              <button 
                className="wallet-connect-btn" 
                onClick={connectWallet}
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
                    Connect MetaMask
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="wallet-connected">
              <div className="wallet-info">
                <div className="wallet-status">
                  <div className="status-indicator"></div>
                  <span>Wallet Connected</span>
                </div>
                <div className="wallet-address">{formatAddress(walletAddress)}</div>
              </div>
              <button className="disconnect-btn" onClick={disconnectWallet}>
                Disconnect
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="network-form">
          <div className="form-group">
            <label htmlFor="network-name">Network Name</label>
            <input
              type="text"
              id="network-name"
              value={networkName}
              onChange={(e) => setNetworkName(e.target.value)}
              placeholder="Enter a descriptive network name"
              disabled={!walletConnected}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="network-description">Description</label>
            <textarea
              id="network-description"
              value={networkDescription}
              onChange={(e) => setNetworkDescription(e.target.value)}
              placeholder="Describe the purpose and goals of your network"
              rows={5}
              disabled={!walletConnected}
              required
            />
          </div>

          <div className="form-footer">
            <p className="form-note">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Network creation will be recorded on the blockchain. A small gas fee may apply.
            </p>
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={!walletConnected}
              >
                Create Network
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
