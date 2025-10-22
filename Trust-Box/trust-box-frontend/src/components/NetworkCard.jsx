import React from 'react';
import './NetworkCard.css';

export const NetworkCard = ({ network, onClick }) => {
  return (
    <div className="network-card" onClick={onClick}>
      <div className="network-card-header">
        <h3>{network?.name}</h3>
      </div>
      
      <p className="network-description">{network?.description}</p>
      
      <div className="network-stats">
        <div className="stat-item">
          <span className="stat-value">{network?.memberCount}</span>
          <span className="stat-label">Members</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{network?.suggestionCount}</span>
          <span className="stat-label">Suggestions</span>
        </div>
      </div>
    </div>
  );
};
