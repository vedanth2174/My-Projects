import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NetworkCard } from "../components/NetworkCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export const Dashboard = ({ onNavigateToNetwork }) => {
  const navigate = useNavigate();
  const [networks, setNetworks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/fetch-user-networks/${user.email}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setNetworks(response.data.networks_list);
      } catch (err) {
        console.error("Error fetching networks: ", err);
      }
    };

    fetchNetworks();
  }, []);

  return (
    <div className="dashboard-layout">
      <Header user={user} onSignOut={() => console.log("Sign out")} />

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1>My Networks</h1>
              <p>Networks you've joined and are actively participating in</p>
            </div>
            <button
              className="explore-btn"
              onClick={() => navigate("/explore-networks")}
            >
              Explore Networks
            </button>
          </div>

          <div className="networks-grid">
            {networks.map((network) => (
              <NetworkCard
                key={network.id}
                network={network}
                onClick={() => navigate(`/network/${network.id}`)}
              />
            ))}
          </div>

          {networks.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🌐</div>
              <h3>No Networks Yet</h3>
              <p>
                Join networks created by admins to start participating in
                community decisions
              </p>
              <button
                className="explore-btn"
                onClick={() => navigate("/explore-networks")}
              >
                Explore Networks
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
