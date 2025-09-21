"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./generated-reports.css"

const GeneratedReports = () => {
    const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("generated")
  const [userName] = useState("Dr. Sarah Johnson")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const sidebarItems = [
    { icon: "📊", label: "Dashboard",link:"/dashboard"},
    { icon: "📤", label: "Upload Scan", link:"/upload" },
    { icon: "📋", label: "View Generated Reports", active: true , link:"/generated-reports" },
    { icon: "📄", label: "Upload Doctor Report", link:"/upload-doctor-report" },
    { icon: "💊", label: "Suggested Treatments", link:"/treatments" },
    { icon: "⚙️", label: "Settings", link:"/settings" },
  ]

  const generatedReports = [
    {
      id: 1,
      patientId: "P-1247",
      patientName: "John Smith",
      scanType: "Chest X-ray",
      reportTitle: "Chest X-ray Analysis - Pneumonia Detection",
      aiConfidence: 94.7,
      findings: ["No acute findings", "Clear lung fields", "Normal cardiac silhouette"],
      priority: "Normal",
      generatedDate: "2024-01-15",
      status: "Reviewed",
      downloadUrl: "#",
    },
    {
      id: 2,
      patientId: "P-1245",
      patientName: "Maria Garcia",
      scanType: "Brain MRI",
      reportTitle: "Brain MRI Analysis - Stroke Assessment",
      aiConfidence: 89.3,
      findings: ["Mild white matter changes", "No acute infarction", "Age-related changes"],
      priority: "Low",
      generatedDate: "2024-01-14",
      status: "Pending Review",
      downloadUrl: "#",
    },
    {
      id: 3,
      patientId: "P-1243",
      patientName: "Robert Johnson",
      scanType: "CT Scan",
      reportTitle: "Abdominal CT - Appendicitis Screening",
      aiConfidence: 97.2,
      findings: ["Appendiceal wall thickening", "Periappendiceal fat stranding", "Possible acute appendicitis"],
      priority: "High",
      generatedDate: "2024-01-14",
      status: "Urgent Review",
      downloadUrl: "#",
    },
    {
      id: 4,
      patientId: "P-1241",
      patientName: "Lisa Chen",
      scanType: "Mammography",
      reportTitle: "Mammography Analysis - Breast Cancer Screening",
      aiConfidence: 91.8,
      findings: ["BI-RADS Category 2", "Benign findings", "Routine follow-up recommended"],
      priority: "Normal",
      generatedDate: "2024-01-13",
      status: "Reviewed",
      downloadUrl: "#",
    },
    {
      id: 5,
      patientId: "P-1239",
      patientName: "David Wilson",
      scanType: "Knee X-ray",
      reportTitle: "Knee X-ray Analysis - Osteoarthritis Assessment",
      aiConfidence: 88.5,
      findings: ["Mild joint space narrowing", "Osteophyte formation", "Grade 2 osteoarthritis"],
      priority: "Low",
      generatedDate: "2024-01-13",
      status: "Reviewed",
      downloadUrl: "#",
    },
  ]

  const filteredReports = generatedReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || report.status.toLowerCase().includes(filterStatus.toLowerCase())

    return matchesSearch && matchesFilter
  })

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.generatedDate) - new Date(a.generatedDate)
      case "priority":
        const priorityOrder = { High: 3, Low: 2, Normal: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case "confidence":
        return b.aiConfidence - a.aiConfidence
      default:
        return 0
    }
  })

  const handleLogout = () => {  
    // Clear user session (e.g., remove token from localStorage)  
    localStorage.removeItem("token");
    // Redirect to login page 
    window.location.href = "/signup";
  }
  
  return (
    <div className="reports-container">
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
          {/* Header Section */}
          <section className="page-header">
            <div className="header-content">
              <h1>Generated Reports</h1>
              <p>AI-powered medical scan analysis reports</p>
            </div>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">{generatedReports.length}</span>
                <span className="stat-label">Total Reports</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {generatedReports.filter((r) => r.status === "Pending Review").length}
                </span>
                <span className="stat-label">Pending Review</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{generatedReports.filter((r) => r.priority === "High").length}</span>
                <span className="stat-label">High Priority</span>
              </div>
            </div>
          </section>

          {/* Filters and Search */}
          <section className="filters-section">
            <div className="filters-left">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search by patient name, ID, or report title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>
            <div className="filters-right">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                <option value="all">All Status</option>
                <option value="reviewed">Reviewed</option>
                <option value="pending">Pending Review</option>
                <option value="urgent">Urgent Review</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="confidence">Sort by AI Confidence</option>
              </select>
            </div>
          </section>

          {/* Reports Grid */}
          <section className="reports-grid">
            {sortedReports.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div className="report-title">
                    <h3>{report.reportTitle}</h3>
                    <span className={`priority-badge ${report.priority.toLowerCase()}`}>
                      {report.priority} Priority
                    </span>
                  </div>
                  <div className="report-meta">
                    <span className="patient-info">
                      {report.patientName} ({report.patientId})
                    </span>
                    <span className="scan-type">{report.scanType}</span>
                  </div>
                </div>

                <div className="report-body">
                  <div className="ai-confidence">
                    <div className="confidence-label">AI Confidence</div>
                    <div className="confidence-bar">
                      <div className="confidence-fill" style={{ width: `${report.aiConfidence}%` }}></div>
                      <span className="confidence-text">{report.aiConfidence}%</span>
                    </div>
                  </div>

                  <div className="findings-section">
                    <h4>Key Findings:</h4>
                    <ul className="findings-list">
                      {report.findings.map((finding, index) => (
                        <li key={index}>{finding}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="report-footer">
                  <div className="report-date">Generated: {report.generatedDate}</div>
                  <div className="report-status">
                    <span className={`status-badge ${report.status.toLowerCase().replace(" ", "-")}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="report-actions">
                    <button className="btn-secondary">View Details</button>
                    <button className="btn-primary">Download PDF</button>
                    <button className="btn-treatment">Suggest Treatment</button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Empty State */}
          {sortedReports.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No reports found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default GeneratedReports
