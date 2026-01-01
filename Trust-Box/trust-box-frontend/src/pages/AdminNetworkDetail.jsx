import React, { useState, useEffect, useContext } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";
import { ethers } from "ethers";
import { ImplementModal } from "../components/ImplementModal";

import axios from "axios";
import "./AdminNetworkDetail.css";

export const AdminNetworkDetail = ({
  networkId,
  onBack,
  onNavigateToDashboard,
  onNavigateToExplore,
  onNavigateToAdmin,
}) => {
  const navigate = useNavigate();
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } =
    useContext(WalletContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [network, setNetwork] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [processingId, setProcessingId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isImplementModalOpen, setIsImplementModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState();

  useEffect(() => {
    const fetchNetworkDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://trust-box-backend.vercel.app/network-details/${id}`,
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
          `https://trust-box-backend.vercel.app/network-suggestions/${id}`,
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

  const handleOpenImplementModal = (suggestion) => {
    setIsImplementModalOpen(true);
    setSelectedSuggestion(suggestion);
  };

  const handleApproveSuggestion = async (suggestionId) => {
    try {
      setProcessingId(suggestionId);

      const response = await axios.post(
        "https://trust-box-backend.vercel.app/approve-suggestion",
        { suggestionId }
      );

      const updatedSuggestion = response.data.suggestion;

      setSuggestions((prev) =>
        prev.map((s) => (s.id === suggestionId ? updatedSuggestion : s))
      );
    } catch (err) {
      console.error("Error approving suggestion:", err);
      alert("Failed to approve suggestion");
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const pendingSuggestions = suggestions?.filter((s) => s.status === "Pending");
  const approvedSuggestions = suggestions?.filter(
    (s) => s.status === "Approved"
  );
  const implementedSuggestions = suggestions?.filter(
    (s) => s.status === "Implemented"
  );

  const getTabSuggestions = () => {
    switch (activeTab) {
      case "pending":
        return pendingSuggestions;
      case "approved":
        return approvedSuggestions;
      case "implemented":
        return implementedSuggestions;
      default:
        return [];
    }
  };

  return (
    <div className="admin-network-detail-layout">
      <Header
        user={user}
        onSignOut={() => console.log("Sign out")}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToAdmin={onNavigateToAdmin}
      />

      <main className="admin-network-detail-main">
        <div className="admin-network-detail-container">
          <button className="back-btn" onClick={() => navigate("/admin")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 4L6 10L12 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Admin
          </button>

          <div className="network-info-section">
            <div className="network-info-header">
              <div>
                <h1>{network?.name}</h1>
                <p>{network?.description}</p>
              </div>
            </div>

            <div className="network-stats-bar">
              <div className="stat-box">
                <span className="stat-label">Members</span>
                <span className="stat-value">{network?.memberCount}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Total Suggestions</span>
                <span className="stat-value">{suggestions.length}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Pending</span>
                <span className="stat-value">{pendingSuggestions.length}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Approved</span>
                <span className="stat-value">{approvedSuggestions.length}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Implemented</span>
                <span className="stat-value">
                  {implementedSuggestions.length}
                </span>
              </div>
            </div>
          </div>

          <div className="suggestions-section">
            <div className="tabs-container">
              <button
                className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
                onClick={() => setActiveTab("pending")}
              >
                Pending ({pendingSuggestions.length})
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "approved" ? "active" : ""
                }`}
                onClick={() => setActiveTab("approved")}
              >
                Approved ({approvedSuggestions.length})
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "implemented" ? "active" : ""
                }`}
                onClick={() => setActiveTab("implemented")}
              >
                Implemented ({implementedSuggestions.length})
              </button>
            </div>

            <div className="suggestions-list">
              {getTabSuggestions().map((suggestion) => {
                const memberCount = network?.memberCount;

                const requiredVotes =
                  memberCount && memberCount > 0
                    ? Math.floor(memberCount / 2) + 1
                    : Infinity; // 👈 prevents accidental approval

                const hasMajority = suggestion.votes >= requiredVotes;

                return (
                  <div key={suggestion.id} className="admin-suggestion-card">
                    <div className="suggestion-header">
                      <div>
                        <h3>{suggestion.title}</h3>
                        <p className="suggestion-meta">
                          By {suggestion.author} •{" "}
                          {formatDate(suggestion.createdAt)}
                        </p>
                      </div>

                      <div className="suggestion-votes">
                        <span className="vote-count upvote">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 3L12 7H9V13H7V7H4L8 3Z"
                              fill="currentColor"
                            />
                          </svg>
                          {suggestion.votes}
                        </span>
                      </div>
                    </div>

                    <p className="suggestion-description">
                      {suggestion.description}
                    </p>

                    <div className="suggestion-footer">
                      <div className="suggestion-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${Math.min(
                                network?.memberCount
                                  ? (suggestion.votes / network.memberCount) *
                                      100
                                  : 0,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="progress-text">
                          {requiredVotes} / {network?.memberCount} votes
                          required
                        </span>
                      </div>

                      {/* ✅ APPROVE (ONLY WHEN MAJORITY REACHED) */}
                      {activeTab === "pending" && (
                        <button
                          className="approve-btn"
                          onClick={() => handleApproveSuggestion(suggestion.id)}
                          disabled={!hasMajority}
                          title={
                            !hasMajority
                              ? `Needs ${requiredVotes} votes to approve`
                              : "Approve suggestion"
                          }
                        >
                          Approve
                        </button>
                      )}

                      {/* ✅ IMPLEMENT */}
                      {activeTab === "approved" && (
                        <button
                          className="implement-btn"
                          onClick={() => handleOpenImplementModal(suggestion)}
                          disabled={processingId === suggestion.id}
                        >
                          {processingId === suggestion.id ? (
                            <>
                              <span className="spinner"></span>
                              Processing...
                            </>
                          ) : (
                            "Implement"
                          )}
                        </button>
                      )}

                      {/* ✅ IMPLEMENTED TX HASH */}
                      {activeTab === "implemented" && suggestion.txHash && (
                        <div className="tx-hash">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 1L3 4V7C3 10.5 5.5 13.7 8 15C10.5 13.7 13 10.5 13 7V4L8 1Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                            />
                            <path
                              d="M6 8L7.5 9.5L10.5 6.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>
                            Tx: {suggestion.txHash.substring(0, 10)}...
                            {suggestion.txHash.substring(58)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {getTabSuggestions().length === 0 && (
              <div className="empty-suggestions">
                <div className="empty-icon">
                  {activeTab === "pending" && "⏳"}
                  {activeTab === "approved" && "✅"}
                  {activeTab === "implemented" && "🎉"}
                </div>
                <h3>
                  No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Suggestions
                </h3>
                <p>
                  {activeTab === "pending" &&
                    "All suggestions have been reviewed"}
                  {activeTab === "approved" &&
                    "No suggestions are waiting to be implemented"}
                  {activeTab === "implemented" &&
                    "No suggestions have been implemented yet"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <ImplementModal
        isOpen={isImplementModalOpen}
        onClose={() => setIsImplementModalOpen(false)}
        suggestion={selectedSuggestion}
        network={network}
        setProcessingId={setProcessingId}
        onImplemented={(updatedSuggestion) => {
          setSuggestions((prev) =>
            prev.map((s) =>
              s.id === updatedSuggestion.id ? updatedSuggestion : s
            )
          );
        }}
      />
    </div>
  );
};
