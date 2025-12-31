import React from "react";
import { useState, useEffect } from "react";
import "./SuggestionCard.css";

export const SuggestionCard = ({ suggestion, onVote, network }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [voteChecked, setVoteChecked] = useState(false);

  const totalVotes = suggestion.votes;
  const upvotePercentage = totalVotes > 0 ? (suggestion.votes / network?.memberCount) * 100 : 0;
  const voteProgress = totalVotes > 0 ? (suggestion.votes / network?.memberCount) * 100 : 0;
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#4caf50";
      case "Implemented":
        return "#2196f3";
      default:
        return "#ff9800";
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setVoteChecked(true);
      return;
    }

    const user = JSON.parse(userStr);

    const checkVote = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/has-voted?email=${user.email}&suggestionId=${suggestion.id}`
        );
        const data = await res.json();
        setHasVoted(data.hasVoted);
      } catch (err) {
        console.error("Vote check failed", err);
      } finally {
        setVoteChecked(true); // ✅ IMPORTANT
      }
    };

    checkVote();
  }, [suggestion.id]);

  const isPending = suggestion.status === "Pending";
  const isDisabled = !voteChecked || !isPending || hasVoted;

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
            className={`vote-btn upvote ${
              hasVoted
                ? "active" // green (voted)
                : !isPending
                ? "disabled-black" // black/grey (not pending)
                : ""
            }`}
            onClick={async () => {
              if (!isPending) return;

              const result = await onVote(suggestion.id);

              if (result === "VOTED" || result === "ALREADY_VOTED") {
                setHasVoted(true);
              }
            }}
            disabled={isDisabled}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4L4 12H16L10 4Z" fill="currentColor" />
            </svg>
            <span>{suggestion.votes}</span>
          </button>
        </div>

        <div className="vote-progress">
          <div className="progress-info">
            <span>Progress to Implementation</span>
            <span>
              {suggestion.votes} / {network?.memberCount} votes
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(voteProgress, 100)}%` }}
            ></div>
          </div>
          <div className="vote-percentage">
            <span className="upvote-percent">
              {upvotePercentage.toFixed(1)}% approve
            </span>
          </div>
        </div>
      </div>

      {suggestion.status === "implemented" && (
        <div className="blockchain-info">
          <span className="blockchain-icon">🔗</span>
          <span>Stored on blockchain</span>
        </div>
      )}
    </div>
  );
};
