import "./App.css";
import { useState, useEffect } from "react";
import { Dashboard } from "./pages/Dashboard";
import { NetworkDetail } from "./pages/NetworkDetail";
import { ExploreNetworks } from "./pages/ExploreNetworks";
import {AdminPage} from "./pages/AdminPage"
import {AdminNetworkDetail} from "./pages/AdminNetworkDetail"
import {Profile} from "./pages/Profile"
import Landing from "./pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  // const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedNetworkId, setSelectedNetworkId] = useState(null);

  const handleNavigateToNetwork = (networkId) => {
    setSelectedNetworkId(networkId);
    setCurrentView("network-detail");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedNetworkId(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard onNavigateToNetwork={handleNavigateToNetwork} /></ProtectedRoute>} />
        <Route path="/network/:id" element={<ProtectedRoute><NetworkDetail
            networkId={selectedNetworkId}
            onBack={handleBackToDashboard}
          /></ProtectedRoute>} />
        <Route path="/explore-networks" element={<ProtectedRoute><ExploreNetworks
            networkId={selectedNetworkId}
            onBack={handleBackToDashboard}
          /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage
          /></ProtectedRoute>} />
        <Route path="/admin-network/:id" element={<ProtectedRoute><AdminNetworkDetail
          /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile
          /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
