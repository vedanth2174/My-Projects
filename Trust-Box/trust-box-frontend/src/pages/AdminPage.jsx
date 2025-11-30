import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NetworkCard } from '../components/NetworkCard';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import './AdminPage.css';

export const AdminPage = ({ onNavigateToDashboard, onNavigateToExplore }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [createdNetworks, setCreatedNetworks] = useState([]);
  
    useEffect(() => {
    const fetchAdminNetworks = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://reverse-auction-m5yj.onrender.com/admin-networks/${user.email}`,{
                headers: token ? {Authorization: `Bearer ${token}`}: {}
            });
            setCreatedNetworks(response.data);
            console.log(response.data)
        }catch(err){
            console.error('Error fetching networks: ', err);
        }
    };

    fetchAdminNetworks()
  }, []);


  return (
    <div className="admin-page-layout">
      <Header 
        user={user} 
        onSignOut={() => console.log('Sign out')}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToAdmin={null}
      />
      
      <main className="admin-page-main">
        <div className="admin-page-container">
          <div className="admin-page-header">
            <div>
              <h1>Admin Panel</h1>
              <p>Manage networks you've created and moderate suggestions</p>
            </div>
          </div>

          <div className="networks-grid">
            {createdNetworks.map((network) => (
              <NetworkCard
                key={network.id}
                network ={network}
                onClick={() => navigate(`/admin-network/${network.id}`)}
              />
            ))}
          </div>

          {createdNetworks.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🏗️</div>
              <h3>No Networks Created Yet</h3>
              <p>Create your first network to start managing suggestions and building your community</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
