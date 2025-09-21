"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("generated")
  const [userName] = useState("Dr. Subhash Gupta")

  const statsData = [
    { title: "Total Scans Analyzed", value: "1,247", icon: "📊" },
    { title: "Pending Reports", value: "23", icon: "⏳" },
    { title: "Suggested Treatments", value: "89", icon: "💊" },
    { title: "Accuracy Rate", value: "94.7%", icon: "🎯" },
  ]

  const recentUploads = [
    { fileName: "chest_xray_001.jpg", type: "X-ray", date: "2024-01-15", status: "Completed", id: 1 },
    { fileName: "brain_mri_045.dcm", type: "MRI", date: "2024-01-15", status: "Processing", id: 2 },
    { fileName: "doctor_report_123.pdf", type: "Report", date: "2024-01-14", status: "Completed", id: 3 },
    { fileName: "knee_xray_078.jpg", type: "X-ray", date: "2024-01-14", status: "Completed", id: 4 },
  ]

  const reports = [
    {
      id: 1,
      title: "Chest X-ray Analysis - Patient #1247",
      type: "AI Generated",
      summary: "No significant abnormalities detected. Clear lung fields with normal cardiac silhouette.",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Brain MRI Report - Patient #1245",
      type: "Doctor Report",
      summary: "Mild white matter changes consistent with age. No acute findings.",
      date: "2024-01-14",
    },
  ]

  const sidebarItems = [
    { icon: "📊", label: "Dashboard", active: true ,link:"/dashboard"},
    { icon: "📤", label: "Upload Scan", link:"/upload" },
    { icon: "📋", label: "View Generated Reports", link:"/generated-reports" },
    { icon: "📄", label: "Upload Doctor Report", link:"/upload-doctor-report" },
    { icon: "💊", label: "Suggested Treatments", link:"/treatments" },
    { icon: "⚙️", label: "Settings", link:"/settings" },
  ]

  const handleLogout = () => {  
    // Clear user session (e.g., remove token from localStorage)  
    localStorage.removeItem("token");
    // Redirect to login page 
    window.location.href = "/signup";
  }
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
            <input type="text" placeholder="Search scans, reports, or patients..." />
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
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-content">
              <h1>Welcome back, {userName}</h1>
              <p>Ready to analyze medical scans with AI precision</p>
            </div>
            <button className="upload-btn"
            onClick={() => navigate('/upload')}
            >Upload Scan</button>
          </section>

          {/* Stats Cards */}
          <section className="stats-section">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </section>

          <div className="dashboard-grid">
            {/* Recent Uploads */}
            <section className="recent-uploads">
              <h2>Recent Uploads</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Type</th>
                      <th>Upload Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUploads.map((upload) => (
                      <tr key={upload.id}>
                        <td>{upload.fileName}</td>
                        <td>
                          <span className={`type-badge ${upload.type.toLowerCase()}`}>{upload.type}</span>
                        </td>
                        <td>{upload.date}</td>
                        <td>
                          <span className={`status-badge ${upload.status.toLowerCase()}`}>{upload.status}</span>
                        </td>
                        <td>
                          <button className="action-btn view">View</button>
                          <button className="action-btn download">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* AI Insights Panel */}
            <section className="ai-insights">
              <h2>AI Insights</h2>
              <div className="insights-content">
                <div className="latest-scan">
                  <h3>Latest Scan Analysis</h3>
                  <div className="findings">
                    <h4>Possible Findings:</h4>
                    <ul>
                      <li className="finding normal">Normal - 87%</li>
                      <li className="finding attention">Pneumonia - 8%</li>
                      <li className="finding low">Fracture - 3%</li>
                    </ul>
                  </div>
                  <button className="detailed-report-btn">View Detailed Report</button>
                </div>
              </div>
            </section>
          </div>

          {/* Reports Section */}
          <section className="reports-section">
            <div className="reports-header">
              <h2>Reports & Treatments</h2>
              <div className="tab-switcher">
                <button
                  className={`tab ${activeTab === "generated" ? "active" : ""}`}
                  onClick={() => setActiveTab("generated")}
                >
                  Generated Reports
                </button>
                <button
                  className={`tab ${activeTab === "uploaded" ? "active" : ""}`}
                  onClick={() => setActiveTab("uploaded")}
                >
                  Uploaded Reports
                </button>
              </div>
            </div>

            <div className="reports-grid">
              {reports.map((report) => (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <h3>{report.title}</h3>
                    <span className={`report-type ${report.type.toLowerCase().replace(" ", "-")}`}>{report.type}</span>
                  </div>
                  <p className="report-summary">{report.summary}</p>
                  <div className="report-date">{report.date}</div>
                  <div className="report-actions">
                    <button className="btn-secondary">View Full Report</button>
                    <button className="btn-primary">Suggest Treatment</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Treatment Suggestions */}
          <section className="treatment-section">
            <h2>Treatment Suggestions</h2>
            <div className="treatment-panel">
              <div className="treatment-content">
                <h3>Evidence-based Recommendations</h3>
                <div className="treatment-options">
                  <div className="treatment-option">
                    <h4>Recommended Treatment Plan</h4>
                    <p>Based on AI analysis and medical guidelines</p>
                    <ul>
                      <li>Continue monitoring with follow-up in 3 months</li>
                      <li>Consider chest physiotherapy if symptoms persist</li>
                      <li>Patient education on respiratory hygiene</li>
                    </ul>
                    <button className="save-treatment-btn">Save to Patient Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
