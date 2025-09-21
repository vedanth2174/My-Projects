"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./suggested-treatment.css"

const SuggestedTreatment = () => {
    const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("generated")
  const [userName] = useState("Dr. Sarah Johnson")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const sidebarItems = [
    { icon: "📊", label: "Dashboard" ,link:"/dashboard"},
    { icon: "📤", label: "Upload Scan", link:"/upload" },
    { icon: "📋", label: "View Generated Reports", link:"/generated-reports" },
    { icon: "📄", label: "Upload Doctor Report", link:"/upload-doctor-report" },
    { icon: "💊", label: "Suggested Treatments", active: true, link:"/treatments" },
    { icon: "⚙️", label: "Settings", link:"/settings" },
  ]

  const treatmentSuggestions = [
    {
      id: 1,
      patientId: "P-1247",
      patientName: "John Smith",
      condition: "Pneumonia",
      confidence: 92,
      urgency: "High",
      scanType: "Chest X-ray",
      date: "2024-01-15",
      status: "Pending Review",
      treatments: [
        {
          primary: true,
          medication: "Amoxicillin 500mg",
          dosage: "3 times daily for 7 days",
          instructions: "Take with food to reduce stomach upset",
        },
        {
          primary: false,
          medication: "Ibuprofen 400mg",
          dosage: "As needed for fever/pain",
          instructions: "Maximum 3 times daily",
        },
      ],
      recommendations: [
        "Rest and increased fluid intake",
        "Follow-up chest X-ray in 7-10 days",
        "Return if symptoms worsen or fever persists",
      ],
    },
    {
      id: 2,
      patientId: "P-1245",
      patientName: "Maria Garcia",
      condition: "Osteoarthritis",
      confidence: 87,
      urgency: "Medium",
      scanType: "Knee X-ray",
      date: "2024-01-14",
      status: "Approved",
      treatments: [
        {
          primary: true,
          medication: "Naproxen 250mg",
          dosage: "Twice daily with meals",
          instructions: "Monitor for GI side effects",
        },
      ],
      recommendations: [
        "Physical therapy consultation",
        "Weight management if applicable",
        "Low-impact exercise program",
      ],
    },
    {
      id: 3,
      patientId: "P-1243",
      patientName: "Robert Johnson",
      condition: "Fracture - Radius",
      confidence: 95,
      urgency: "High",
      scanType: "Wrist X-ray",
      date: "2024-01-13",
      status: "Implemented",
      treatments: [
        {
          primary: true,
          medication: "Immobilization Cast",
          dosage: "6-8 weeks",
          instructions: "Keep cast dry and elevated when possible",
        },
      ],
      recommendations: ["Orthopedic surgery consultation", "Follow-up X-ray in 2 weeks", "Pain management as needed"],
    },
  ]

  const filteredTreatments = treatmentSuggestions.filter((treatment) => {
    if (filterStatus === "all") return true
    return treatment.status.toLowerCase().includes(filterStatus.toLowerCase())
  })

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="navbar-left">
          <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            ☰
          </button>
          <div className="logo">diagnosisMD</div>
        </div>

        <div className="navbar-center">
          <div className="search-bar">
            <input type="text" placeholder="Search treatments, patients, or conditions..." />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="navbar-right">
          <button className="notification-btn">🔔</button>
          <div className="profile-dropdown">
            <div className="profile-avatar">SJ</div>
            <div className="profile-info">
              <span className="profile-name">{userName}</span>
              <div className="dropdown-menu">
                <button className="profile-btn"
                onClick={() => navigate('/settings')}
                >
                  Settings
                </button>
                <button className="profile-btn"
                onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
          <nav className="sidebar-nav">
            {sidebarItems.map((item, index) => (
              <button className="btn-sidebar" key={index} onClick={() =>navigate(item.link)}>
              <a key={index} href="#" className={`sidebar-item ${item.active ? "active" : ""}`}>
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </a>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header Section */}
          <section className="page-header">
            <div className="header-content">
              <h1>AI-Suggested Treatments</h1>
              <p>Evidence-based treatment recommendations powered by artificial intelligence</p>
            </div>
            <div className="header-actions">
              <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Treatments</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="implemented">Implemented</option>
              </select>
            </div>
          </section>

          {/* Stats Overview */}
          <section className="treatment-stats">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>24</h3>
                <p>Total Suggestions</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>8</h3>
                <p>Pending Review</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>12</h3>
                <p>Approved</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>91.5%</h3>
                <p>Accuracy Rate</p>
              </div>
            </div>
          </section>

          {/* Treatment Suggestions List */}
          <section className="treatments-section">
            <div className="treatments-grid">
              {filteredTreatments.map((treatment) => (
                <div key={treatment.id} className="treatment-card">
                  <div className="treatment-header">
                    <div className="patient-info">
                      <h3>{treatment.patientName}</h3>
                      <span className="patient-id">{treatment.patientId}</span>
                    </div>
                    <div className="treatment-meta">
                      <span className={`urgency-badge ${treatment.urgency.toLowerCase()}`}>
                        {treatment.urgency} Priority
                      </span>
                      <span className={`status-badge ${treatment.status.toLowerCase().replace(" ", "-")}`}>
                        {treatment.status}
                      </span>
                    </div>
                  </div>

                  <div className="condition-info">
                    <div className="condition-details">
                      <h4>{treatment.condition}</h4>
                      <p>Detected via {treatment.scanType}</p>
                      <div className="confidence-bar">
                        <span>AI Confidence: {treatment.confidence}%</span>
                        <div className="confidence-progress">
                          <div className="confidence-fill" style={{ width: `${treatment.confidence}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="treatment-details">
                    <h4>Recommended Medications</h4>
                    <div className="medications-list">
                      {treatment.treatments.map((med, index) => (
                        <div key={index} className={`medication-item ${med.primary ? "primary" : "secondary"}`}>
                          <div className="med-header">
                            <strong>{med.medication}</strong>
                            {med.primary && <span className="primary-badge">Primary</span>}
                          </div>
                          <p className="dosage">{med.dosage}</p>
                          <p className="instructions">{med.instructions}</p>
                        </div>
                      ))}
                    </div>

                    <h4>Additional Recommendations</h4>
                    <ul className="recommendations-list">
                      {treatment.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="treatment-actions">
                    <button className="btn-secondary">View Scan</button>
                    <button className="btn-secondary">Edit Treatment</button>
                    <button className="btn-primary">Approve & Send</button>
                  </div>

                  <div className="treatment-footer">
                    <span className="scan-date">Scan Date: {treatment.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Treatment Guidelines */}
          <section className="guidelines-section">
            <h2>Treatment Guidelines</h2>
            <div className="guidelines-grid">
              <div className="guideline-card">
                <h3>🔬 Evidence-Based Medicine</h3>
                <p>
                  All suggestions are based on current medical literature and clinical guidelines from leading medical
                  institutions.
                </p>
              </div>
              <div className="guideline-card">
                <h3>👨‍⚕️ Doctor Review Required</h3>
                <p>
                  AI suggestions must be reviewed and approved by licensed medical professionals before implementation.
                </p>
              </div>
              <div className="guideline-card">
                <h3>📊 Continuous Learning</h3>
                <p>Our AI system continuously learns from treatment outcomes to improve future recommendations.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default SuggestedTreatment
