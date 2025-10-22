import React from 'react';
import './SuggestionCard.css';

export const SuggestionCard = ({ suggestion, onVote }) => {
  const totalVotes = suggestion.votes ;
  const upvotePercentage = totalVotes > 0 ? (suggestion.votes / 100) * 100 : 0;
  const voteProgress = totalVotes > 0 ? (suggestion.votes / 100) * 100 : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#4caf50';
      case 'Implemented':
        return '#2196f3';   
      default:
        return '#ff9800';
    }
  };

  return (
    <div className="suggestion-card">
      <div className="suggestion-header">
        <div className="suggestion-title-section">
          <h3>{suggestion?.title}</h3>
          <span 
            className="suggestion-status-badge" 
            style={{ backgroundColor: getStatusColor(suggestion.status) }}
          >
            {suggestion?.status?.toUpperCase()}
          </span>
        </div>
        <div className="suggestion-meta">
          <span className="suggestion-author">By {suggestion.author}</span>
          <span className="suggestion-date">{suggestion.date}</span>
        </div>
      </div>

      <p className="suggestion-description">{suggestion.description}</p>

      <div className="voting-section">
        <div className="vote-buttons">
          <button
            className={`vote-btn upvote ${suggestion.userVote === 'up' ? 'active' : ''}`}
            onClick={() => onVote(suggestion.id, 'up')}
            disabled={suggestion.status !== 'Pending'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4L4 12H16L10 4Z" fill="currentColor"/>
            </svg>
            <span>{suggestion.votes}</span>
          </button>
          
        </div>

        <div className="vote-progress">
          <div className="progress-info">
            <span>Progress to Implementation</span>
            <span>{suggestion.votes} / 100 votes</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(voteProgress, 100)}%` }}
            ></div>
          </div>
          <div className="vote-percentage">
            <span className="upvote-percent">{upvotePercentage.toFixed(1)}% approve</span>
          </div>
        </div>
      </div>

      {suggestion.status === 'implemented' && (
        <div className="blockchain-info">
          <span className="blockchain-icon">🔗</span>
          <span>Stored on blockchain</span>
        </div>
      )}
    </div>
  );
};
