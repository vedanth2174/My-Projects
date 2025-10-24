import React, { useState, useContext } from 'react';
import {ethers} from "ethers";
import './CreateNetworkModal.css';
import {WalletContext} from "../context/WalletContext"

export const ImplementModal = ({
    isOpen, 
  onClose, 
  network,
  suggestion,
  user
}) => {
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } = useContext(WalletContext);

  const handleClose = () => {
    onClose();
  };

  const handleImplementSuggestion = async () => {
    
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content create-network-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Store suggestion on Block-Chain</h2>
          <button className="close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form  className="network-form">
          <div className="form-group">
            <label htmlFor="suggestion-id">Suggestion ID: {suggestion.id}</label>
            <label htmlFor="suggestion-title">Suggestion Title: {suggestion.title}</label>
            <label htmlFor="suggestion-description">Suggestion Description: {suggestion.description}</label>
            <label htmlFor="suggestion-author">Suggestion Author: {suggestion.author}</label>
            <label htmlFor="suggestion-votes">Suggestion Votes: {suggestion.votes}</label>
            <label htmlFor="network-name">Network Name: {network.name}</label>
          </div>

          <div className="form-footer">
            
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                onClick={handleImplementSuggestion}
              >
                Store
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
