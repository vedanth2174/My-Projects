import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NetworkCard } from '../components/NetworkCard';
import { CreateNetworkModal } from '../components/CreateNetworkModal';
import { JoinNetworkModal } from '../components/JoinNetworkModal';
import './ExploreNetworks.css';
import axios from 'axios';

export const ExploreNetworks = ({ onNavigateToNetwork, onNavigateToDashboard }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNetworkId, setSelectedNetworkId] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const [networks, setNetworks] = useState([]);

    useEffect(() => {
    const fetchNetworks = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get('https://trust-box-backend.vercel.app/fetch-networks',{
                headers: token? {Authorization: `Bearer ${token}`}: {}
            });
            setNetworks(response.data);
        }catch(err){
            console.error('Error fetching networks: ', err);
        }
    };

    fetchNetworks()
  }, []);

  const handleCreateNetwork = (networkData) => {
    setIsCreateModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const handleOpenJoinModal = (network_id) => {
    setSelectedNetworkId(network_id);
    setIsJoinModalOpen(true);
  };

  // Filter networks based on search query
  const filteredNetworks = networks.filter(network =>
    network.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    network.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="explore-layout">
      <Header 
        user={user} 
        onSignOut={() => console.log('Sign out')}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToExplore={null}
      />
      
      <main className="explore-main">
        <div className="explore-container">
          <div className="explore-header">
            <div className="explore-header-content">
              <h1>Explore Networks</h1>
              <p>Discover and join networks or create your own</p>
            </div>
            <button className="create-network-btn" onClick={handleOpenCreateModal}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Create Network
            </button>
          </div>

          <div className="search-section">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search networks by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="networks-stats">
            <div className="stat-badge">
              <span className="stat-number">{filteredNetworks.length}</span>
              <span className="stat-text">Networks Available</span>
            </div>
          </div>

          <div className="networks-grid">
            {filteredNetworks.map((network) => (
              <NetworkCard
                key={network.id}
                network={network}
                onClick={()=>handleOpenJoinModal(network.id)}
              />
            ))}
          </div>

          {filteredNetworks.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No Networks Found</h3>
              <p>Try adjusting your search criteria or create a new network</p>
              <button className="create-network-btn" onClick={handleOpenCreateModal}>
                Create Network
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <CreateNetworkModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateNetwork}
        walletConnected={walletConnected}
        setWalletConnected={setWalletConnected}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        user = {user}
      />
      <JoinNetworkModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        networkId={selectedNetworkId}
        user = {user}
      />
    </div>
  );
};
