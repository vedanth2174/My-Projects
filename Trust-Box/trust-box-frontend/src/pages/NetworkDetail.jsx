import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SuggestionCard } from "../components/SuggestionCard";
import { AddSuggestionModal } from "../components/AddSuggestionModal";
import "./NetworkDetail.css";
import axios from "axios";

export const NetworkDetail = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [network, setNetwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchNetworkDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/network-details/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setNetwork(response.data);
      } catch (err) {
        console.error("Error fetching network details: ", err);
      }
    };
    fetchNetworkDetails();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/network-suggestions/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setSuggestions(response.data);
      } catch (err) {
        console.error("Error fetching networks: ", err);
      }
    };

    fetchSuggestions();
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleVote = (suggestionId, voteType) => {
    setSuggestions((prev) =>
      prev?.map((suggestion) => {
        if (suggestion.id === suggestionId) {
          const wasUpvote = suggestion.userVote === "up";
          const wasDownvote = suggestion.userVote === "down";
          const isUpvote = voteType === "up";

          let newUpvotes = suggestion.upvotes;
          let newDownvotes = suggestion.downvotes;

          // Remove previous vote if exists
          if (wasUpvote) newUpvotes--;
          if (wasDownvote) newDownvotes--;

          // Add new vote if different from previous
          if (suggestion.userVote !== voteType) {
            if (isUpvote) newUpvotes++;
            else newDownvotes++;
          }

          const newUserVote =
            suggestion.userVote === voteType ? null : voteType;

          // Check if suggestion should be approved
          let newStatus = suggestion.status;
          if (
            newUpvotes >= suggestion.requiredVotes &&
            newStatus === "pending"
          ) {
            newStatus = "approved";
            // Simulate blockchain storage
            setTimeout(() => {
              setSuggestions((prev2) =>
                prev2?.map((s) =>
                  s.id === suggestionId ? { ...s, status: "implemented" } : s
                )
              );
            }, 2000);
          }

          return {
            ...suggestion,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote,
            status: newStatus,
          };
        }
        return suggestion;
      })
    );
  };

  const filteredSuggestions = suggestions?.filter((s) => {
    if (filter === "all") return true;
    return s.status === filter;
  });

  return (
    <div className="network-detail-layout">
      <Header user={user} onSignOut={() => console.log("Sign out")} />

      <main className="network-detail-main">
        <div className="network-detail-container">
          <button className="back-btn" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 4L6 10L12 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Networks
          </button>

          <div className="network-info-section">
            <div className="network-info-header">
              <div>
                <h1>{network?.name}</h1>
                <p>{network?.description}</p>
              </div>
              <button
                className="add-suggestion-btn"
                onClick={() => setIsModalOpen(true)}
                
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Add Suggestion
              </button>
            </div>

            <div className="network-stats-bar">
              <div className="stat-box">
                <span className="stat-label">Members</span>
                <span className="stat-value">{network?.memberCount}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Total Suggestions</span>
                <span className="stat-value">{suggestions?.length}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Approved</span>
                <span className="stat-value">
                  {suggestions?.filter((s) => s.status === "Approved").length}
                </span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Implemented</span>
                <span className="stat-value">
                  {suggestions?.filter((s) => s.status === "Implemented").length}
                </span>
              </div>
            </div>
          </div>

          <div className="suggestions-section">
            <div className="suggestions-header">
              <h2>Suggestions</h2>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${
                    filter === "Pending" ? "active" : ""
                  }`}
                  onClick={() => setFilter("Pending")}
                >
                  Pending
                </button>
                <button
                  className={`filter-btn ${
                    filter === "Approved" ? "active" : ""
                  }`}
                  onClick={() => setFilter("Approved")}
                >
                  Approved
                </button>
                <button
                  className={`filter-btn ${
                    filter === "Implemented" ? "active" : ""
                  }`}
                  onClick={() => setFilter("Implemented")}
                >
                  Implemented
                </button>
              </div>
            </div>

            <div className="suggestions-list">
              {filteredSuggestions?.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onVote={handleVote}
                  network = {network}
                />
              ))}
            </div>

            {filteredSuggestions?.length === 0 && (
              <div className="empty-suggestions">
                <div className="empty-icon">💡</div>
                <h3>No Suggestions Yet</h3>
                <p>Be the first to submit a suggestion to this network</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <AddSuggestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        network_id={id}
        networkName = {network?.name}
      />
    </div>
  );
};
