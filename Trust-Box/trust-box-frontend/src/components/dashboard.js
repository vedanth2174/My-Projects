"use client"

import { useState,useEffect } from "react"
import "./dashboard.css"
import logout from "./logout.png"
import { ethers } from "ethers";
import contractABI from "./suggestion-box.json"; // ABI from Remix

const contractAddress = "0x932b39bf2be7ff41d07046b987ff08398d33a38a"; 

const Dashboard = () => {
  const [account, setAccount] = useState(null)
  const [suggestions, setSuggestions] = useState([]);
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAccount(accounts[0])
        console.log("Connected account:", accounts[0])
      } catch (error) {
        console.error("User rejected the request", error)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    console.log("Wallet disconnected")
    localStorage.removeItem("account")
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
  })

  // Load all suggestions
  const loadSuggestions = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

    const total = await contract.getTotalSuggestions();
    let items = [];

    for (let i = 0; i < total; i++) {
      const [title, description, name, timestamp, upvotes, downvotes, status] =
        await contract.getSuggestion(i);

      items.push({
        id: i,
        title,
        description,
        name,
        timestamp: new Date(Number(timestamp) * 1000).toLocaleString(),
        upvotes: Number(upvotes),
        downvotes: Number(downvotes),
        status
      });
  }

  setSuggestions(items);
  console.log("Loaded suggestions:", items);
};




  useEffect(() => {
    loadSuggestions();
  }, []);

  const handleVote = async (id, isUpvote) => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      const tx = await contract.vote(id, isUpvote);
      await tx.wait();

      alert("Vote submitted!");
      loadSuggestions(); // refresh list
    } catch (err) {
      console.error("Vote error:", err);
      alert("Voting failed: " + (err.reason || err.message));
    }
  };


  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({ title: "", description: "", name: "" })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const timestamp = new Date().toISOString()
    console.log("Suggestion submitted:", {
      ...formData,
      timestamp,
    })

    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      const tx = await contract.addSuggestion(
        formData.title,
        formData.description,
        formData.name
      );

      setStatus("Submitting transaction...");
      await tx.wait();
      setStatus("✅ Suggestion submitted to Sepolia blockchain!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Transaction failed");
    }
    closeModal()
  }

  return (
    <div>
      <div className={`main-content ${isModalOpen ? "blurred" : ""}`}>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">
              <h1>TrustBox</h1>
            </div>
            <div className="navbar-links">
              <a href="#home">Home</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#suggestions"
              onClick={loadSuggestions}
              >Suggestions</a>
              <a href="#features">Features</a>
            </div>
            <div className="navbar-actions">
              <button
                id="wallet"
                className={`btn ${account ? "btn-connected" : "btn-wallet"}`}
                onClick={account ? disconnectWallet : connectWallet}
              >
                <div id="connection">
                  <div>{account ? "Connected" : "Connect Wallet"}</div>
                  {account && (
                    <div>
                      <img src={logout || "/placeholder.svg"} alt="wallet" className="logout" />
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-background">
            <div className="network-animation"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              A Transparent Suggestion Box
              <span className="gradient-text"> Powered by Blockchain</span>
            </h1>
            <p className="hero-subtitle">Submit your ideas. Vote on suggestions. Let the community decide.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={openModal}>
                Submit Suggestion
              </button>
              <button className="btn btn-secondary">View Suggestions</button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works" id="how-it-works">
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-icon">📝</div>
                <h3>Submit</h3>
                <p>Store your idea securely using blockchain + IPFS</p>
              </div>
              <div className="step">
                <div className="step-icon">🗳️</div>
                <h3>Vote</h3>
                <p>Community members upvote/downvote ideas</p>
              </div>
              <div className="step">
                <div className="step-icon">✅</div>
                <h3>Decide</h3>
                <p>Smart contracts finalize accepted suggestions</p>
              </div>
            </div>
          </div>
        </section>

                  

        {/* Live Suggestions Preview */}
        <section className="suggestions-preview" id="suggestions">
          <div className="container">
            <h2 className="section-title">Live Suggestions</h2>
            <div className="suggestions-grid">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="suggestion-card">
                  <div className="suggestion-header">
                    <h3 className="suggestion-title">{suggestion.title}</h3>
                    <span className={`status status-${suggestion.status.toLowerCase()}`}>{suggestion.status}</span>
                  </div>
                  <p className="suggestion-description">{suggestion.description}</p>
                  <div className="suggestion-meta">
                    <span className="proposer">By: {suggestion.name}</span>
                  </div>
                  <div className="suggestion-actions">
                    <div className="votes">
                      <button className="vote-btn upvote" onClick={() => handleVote(suggestion.id, "up")}>
                        ↑ {suggestion.upvotes}
                      </button>
                      <button className="vote-btn downvote" onClick={() => handleVote(suggestion.id, "down")}>
                        ↓ {suggestion.downvotes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features" id="features">
          <div className="container">
            <h2 className="section-title">Why Choose Our Platform</h2>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">🔒</div>
                <h3>Immutable Records</h3>
                <p>All suggestions are permanently stored on blockchain</p>
              </div>
              <div className="feature">
                <div className="feature-icon">⚖️</div>
                <h3>Fair Community Voting</h3>
                <p>Transparent and democratic decision-making process</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌐</div>
                <h3>IPFS Decentralized Storage</h3>
                <p>Distributed storage ensures data availability</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🎁</div>
                <h3>Token Rewards</h3>
                <p>Earn rewards for valuable contributions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-links">
                <a href="#home">Home</a>
                <a href="#submit">Submit Suggestion</a>
                <a href="#view">View Suggestions</a>
                <a href="#github">GitHub</a>
                <a href="#docs">Docs</a>
              </div>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  🐦
                </a>
                <a href="#" className="social-icon">
                  💬
                </a>
                <a href="#" className="social-icon">
                  📱
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Blockchain Suggestion Box. Powered by Web3.</p>
            </div>
          </div>
        </footer>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Your Suggestion</h2>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="suggestion-form">
              <div className="form-group">
                <label htmlFor="title">Suggestion Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your suggestion title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Describe your suggestion in detail"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Suggestion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
