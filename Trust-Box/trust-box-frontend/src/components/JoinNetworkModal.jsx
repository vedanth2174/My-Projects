import React, { useState } from 'react';
import './CreateNetworkModal.css';

export const JoinNetworkModal = ({
    isOpen, 
  onClose, 
  networkId,
  user
}) => {
  const [networkName, setNetworkName] = useState('');
  const [networkDescription, setNetworkDescription] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = "https://reverse-auction-m5yj.onrender.com/join-network"
    const payload = {
        email: user.email,
        network_id: networkId
    }
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
            })
        const data = await response.json();
        alert(data.message);
    }catch(err){
        console.error(err)
    }

  };

  const handleClose = () => {
    setNetworkName('');
    setNetworkDescription('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content create-network-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Join Network</h2>
          <button className="close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="network-form">
          <div className="form-group">
            <label htmlFor="network-name">Key</label>
            <input
              type="text"
              id="network-name"
              value={networkName}
              onChange={(e) => setNetworkName(e.target.value)}
              placeholder="Enter the key to join network"
              required
            />
          </div>

          <div className="form-footer">
            
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                onClick={handleSubmit}
              >
                Join
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
