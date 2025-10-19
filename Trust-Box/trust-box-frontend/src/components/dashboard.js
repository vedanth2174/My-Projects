"use client"

import { useState,useEffect } from "react"
import "./dashboard.css"

const Dashboard = () => {
  const [account, setAccount] = useState(null)
  // const [suggestions, setSuggestions] = useState([]);

  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
  })

const suggestions = [
  {title: "The Knowledge Wall",
    status: "active",
    description: "Dedicate one wall to display key concepts, quotes, and visual aids related to the subject. Use colorful charts, mind maps, and student-created infographics. This visual learning corner keeps students inspired and helps in quick revision before exams.",
    name: "Vedant",
    upvotes: 5,
    downvotes: 3,
  },
  {title: "The Growth Corner",
    status: "active",
    description: "Set up a small corner with plants, motivational quotes, and a “Weekly Achievement Board.” Students can post their small wins — like completing an assignment, helping a classmate, or improving test scores. It promotes positivity and teamwork.",
    name: "Vivek",
    upvotes: 5,
    downvotes: 3,
  },
  {title: "The Innovation Zone",
    status: "active",
    description: "Designate a section of the classroom for creativity and project work. Include whiteboards, sticky notes, and prototypes of student ideas. Encourage discussions, brainstorming, and mini-presentations to make learning interactive and hands-on.",
    name: "Shreya",
    upvotes: 5,
    downvotes: 3,
  }
]

  const openSignUp = () => {
    setIsSignUpOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  return (
    <div>
      <div className={`main-content   `}>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">
              <h1>TrustBox</h1>
            </div>
            <div className="navbar-links">
              <a href="#home">Home</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#suggestions"
              >Suggestions</a>
              <a href="#features">Features</a>
            </div>
            <div className="navbar-actions">
              <button
                id="wallet"
                className={`btn ${account ? "btn-connected" : "btn-wallet"}`}
              >
                <div id="connection">
                  <div>Sign In</div>
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

                  

        {/* Demo Suggestions Preview */}
        <section className="suggestions-preview" id="suggestions">
          <div className="container">
            <h2 className="section-title">Demo Suggestions</h2>
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
                      <button className="vote-btn upvote" >
                        ↑ {suggestion.upvotes}
                      </button>
                      <button className="vote-btn downvote">
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
                <p>Implemented suggestions are permanently stored on blockchain</p>
              </div>
              <div className="feature">
                <div className="feature-icon">⚖️</div>
                <h3>Fair Community Voting</h3>
                <p>Transparent and democratic decision-making process</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌐</div>
                <h3>Decentralized Storage</h3>
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
                <a href="https://github.com/vedanth2174/My-Projects">GitHub</a>
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

      {isSignUpOpen && (
        <div className="modal-overlay" >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Your Suggestion</h2>
              <button className="close-btn" >
                ×
              </button>
            </div>
            <form  className="suggestion-form">
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
                <button type="button" className="btn btn-secondary"   >
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
