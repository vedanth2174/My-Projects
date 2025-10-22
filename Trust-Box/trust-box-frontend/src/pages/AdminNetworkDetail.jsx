import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import './AdminNetworkDetail.css';

export const AdminNetworkDetail = ({ networkId, onBack, onNavigateToDashboard, onNavigateToExplore, onNavigateToAdmin }) => {
    const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [network, setNetwork] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [processingId, setProcessingId] = useState(null);
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

  const handleApproveSuggestion = (suggestionId) => {
    setSuggestions((prev) =>
      prev.map((s) =>
        s.id === suggestionId ? { ...s, status: 'approved' } : s
      )
    );
  };

  const handleImplementSuggestion = async (suggestionId) => {
    setProcessingId(suggestionId);
    
    // Simulate MetaMask transaction
    try {
      // Mock blockchain transaction
      console.log('Initiating blockchain transaction for suggestion:', suggestionId);
      
      // Simulate transaction delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Generate mock transaction hash
      const txHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      // Update suggestion status to implemented
      setSuggestions((prev) =>
        prev.map((s) =>
          s.id === suggestionId
            ? { ...s, status: 'implemented', txHash }
            : s
        )
      );
      
      console.log('Transaction confirmed! Hash:', txHash);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Failed to implement suggestion. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const pendingSuggestions = suggestions?.filter((s) => s.status === 'Pending');
  const approvedSuggestions = suggestions?.filter((s) => s.status === 'Approved');
  const implementedSuggestions = suggestions?.filter((s) => s.status === 'Implemented');

  const getTabSuggestions = () => {
    switch (activeTab) {
      case 'pending':
        return pendingSuggestions;
      case 'approved':
        return approvedSuggestions;
      case 'implemented':
        return implementedSuggestions;
      default:
        return [];
    }
  };

  return (
    <div className="admin-network-detail-layout">
      <Header 
        user={user} 
        onSignOut={() => console.log('Sign out')}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToAdmin={onNavigateToAdmin}
      />

      <main className="admin-network-detail-main">
        <div className="admin-network-detail-container">
          <button className="back-btn" onClick={()=>navigate("/admin")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <span className="stat-value">{implementedSuggestions.length}</span>
              </div>
            </div>
          </div>

          <div className="suggestions-section">
            <div className="tabs-container">
              <button
                className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending ({pendingSuggestions.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveTab('approved')}
              >
                Approved ({approvedSuggestions.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'implemented' ? 'active' : ''}`}
                onClick={() => setActiveTab('implemented')}
              >
                Implemented ({implementedSuggestions.length})
              </button>
            </div>

            <div className="suggestions-list">
              {getTabSuggestions().map((suggestion) => (
                <div key={suggestion.id} className="admin-suggestion-card">
                  <div className="suggestion-header">
                    <div>
                      <h3>{suggestion.title}</h3>
                      <p className="suggestion-meta">
                        By {suggestion.author} • {formatDate(suggestion.createdAt)}
                      </p>
                    </div>
                    <div className="suggestion-votes">
                      <span className="vote-count upvote">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3L12 7H9V13H7V7H4L8 3Z" fill="currentColor"/>
                        </svg>
                        {suggestion.votes}
                      </span>
                    </div>
                  </div>

                  <p className="suggestion-description">{suggestion.description}</p>

                  <div className="suggestion-footer">
                    <div className="suggestion-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${Math.min((suggestion.upvotes / suggestion.requiredVotes) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="progress-text">
                        {suggestion.upvotes} / {suggestion.requiredVotes} votes required
                      </span>
                    </div>

                    {activeTab === 'pending' && (
                      <button
                        className="approve-btn"
                        onClick={() => handleApproveSuggestion(suggestion.id)}
                      >
                        Approve
                      </button>
                    )}

                    {activeTab === 'approved' && (
                      <button
                        className="implement-btn"
                        onClick={() => handleImplementSuggestion(suggestion.id)}
                        disabled={processingId === suggestion.id}
                      >
                        {processingId === suggestion.id ? (
                          <>
                            <span className="spinner"></span>
                            Processing...
                          </>
                        ) : (
                          'Implement'
                        )}
                      </button>
                    )}

                    {activeTab === 'implemented' && suggestion.txHash && (
                      <div className="tx-hash">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1L3 4V7C3 10.5 5.5 13.7 8 15C10.5 13.7 13 10.5 13 7V4L8 1Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <path d="M6 8L7.5 9.5L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Tx: {suggestion.txHash.substring(0, 10)}...{suggestion.txHash.substring(58)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {getTabSuggestions().length === 0 && (
              <div className="empty-suggestions">
                <div className="empty-icon">
                  {activeTab === 'pending' && '⏳'}
                  {activeTab === 'approved' && '✅'}
                  {activeTab === 'implemented' && '🎉'}
                </div>
                <h3>No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Suggestions</h3>
                <p>
                  {activeTab === 'pending' && 'All suggestions have been reviewed'}
                  {activeTab === 'approved' && 'No suggestions are waiting to be implemented'}
                  {activeTab === 'implemented' && 'No suggestions have been implemented yet'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
