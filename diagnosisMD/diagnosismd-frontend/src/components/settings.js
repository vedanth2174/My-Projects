"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./settings.css"

const Settings = () => {
    const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("generated")
  const [userName] = useState("Dr. Sarah Johnson")
  const [activeSection, setActiveSection] = useState("profile")

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1 (555) 123-4567",
    specialization: "Radiology",
    license: "MD-12345",
    hospital: "General Hospital",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    reportReady: true,
    treatmentSuggestions: true,
    systemUpdates: false,
  })

  const [aiSettings, setAiSettings] = useState({
    confidenceThreshold: 85,
    autoSuggestTreatments: true,
    showAlternativeDiagnoses: true,
    enablePredictiveAnalysis: true,
  })

  const sidebarItems = [
    { icon: "📊", label: "Dashboard" ,link:"/dashboard"},
    { icon: "📤", label: "Upload Scan", link:"/upload" },
    { icon: "📋", label: "View Generated Reports", link:"/generated-reports" },
    { icon: "📄", label: "Upload Doctor Report", link:"/upload-doctor-report" },
    { icon: "💊", label: "Suggested Treatments", link:"/treatments" },
    { icon: "⚙️", label: "Settings", active: true, link:"/settings" },
  ]

  const settingSections = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "ai", label: "AI Preferences", icon: "🤖" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "support", label: "Support", icon: "❓" },
  ]

  const handleProfileUpdate = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (setting) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleAiSettingChange = (setting, value) => {
    setAiSettings((prev) => ({ ...prev, [setting]: value }))
  }

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
            <input type="text" placeholder="Search settings..." />
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
              <h1>Settings</h1>
              <p>Manage your account preferences and system configurations</p>
            </div>
          </section>

          <div className="settings-layout">
            {/* Settings Navigation */}
            <nav className="settings-nav">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  className={`settings-nav-item ${activeSection === section.id ? "active" : ""}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="nav-icon">{section.icon}</span>
                  <span className="nav-label">{section.label}</span>
                </button>
              ))}
            </nav>

            {/* Settings Content */}
            <div className="settings-content">
              {/* Profile Settings */}
              {activeSection === "profile" && (
                <div className="settings-section">
                  <h2>Profile Information</h2>
                  <div className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate("email", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Specialization</label>
                        <select
                          value={profileData.specialization}
                          onChange={(e) => handleProfileUpdate("specialization", e.target.value)}
                        >
                          <option value="Radiology">Radiology</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Orthopedics">Orthopedics</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Medical License</label>
                        <input
                          type="text"
                          value={profileData.license}
                          onChange={(e) => handleProfileUpdate("license", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Hospital/Institution</label>
                      <input
                        type="text"
                        value={profileData.hospital}
                        onChange={(e) => handleProfileUpdate("hospital", e.target.value)}
                      />
                    </div>
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === "notifications" && (
                <div className="settings-section">
                  <h2>Notification Preferences</h2>
                  <div className="notification-settings">
                    <div className="setting-group">
                      <h3>Delivery Methods</h3>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationSettings.emailNotifications}
                            onChange={() => handleNotificationToggle("emailNotifications")}
                          />
                          <span className="toggle-slider"></span>
                          Email Notifications
                        </label>
                        <p>Receive notifications via email</p>
                      </div>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationSettings.smsNotifications}
                            onChange={() => handleNotificationToggle("smsNotifications")}
                          />
                          <span className="toggle-slider"></span>
                          SMS Notifications
                        </label>
                        <p>Receive notifications via text message</p>
                      </div>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationSettings.pushNotifications}
                            onChange={() => handleNotificationToggle("pushNotifications")}
                          />
                          <span className="toggle-slider"></span>
                          Push Notifications
                        </label>
                        <p>Receive browser push notifications</p>
                      </div>
                    </div>

                    <div className="setting-group">
                      <h3>Notification Types</h3>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationSettings.reportReady}
                            onChange={() => handleNotificationToggle("reportReady")}
                          />
                          <span className="toggle-slider"></span>
                          Report Ready
                        </label>
                        <p>When AI analysis is complete</p>
                      </div>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationSettings.treatmentSuggestions}
                            onChange={() => handleNotificationToggle("treatmentSuggestions")}
                          />
                          <span className="toggle-slider"></span>
                          Treatment Suggestions
                        </label>
                        <p>When new treatment recommendations are available</p>
                      </div>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationSettings.systemUpdates}
                            onChange={() => handleNotificationToggle("systemUpdates")}
                          />
                          <span className="toggle-slider"></span>
                          System Updates
                        </label>
                        <p>Platform updates and maintenance notifications</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Preferences */}
              {activeSection === "ai" && (
                <div className="settings-section">
                  <h2>AI Preferences</h2>
                  <div className="ai-settings">
                    <div className="setting-group">
                      <h3>Analysis Settings</h3>
                      <div className="range-setting">
                        <label>AI Confidence Threshold: {aiSettings.confidenceThreshold}%</label>
                        <input
                          type="range"
                          min="70"
                          max="95"
                          value={aiSettings.confidenceThreshold}
                          onChange={(e) =>
                            handleAiSettingChange("confidenceThreshold", Number.parseInt(e.target.value))
                          }
                          className="confidence-slider"
                        />
                        <p>Minimum confidence level for AI suggestions</p>
                      </div>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={aiSettings.autoSuggestTreatments}
                            onChange={() =>
                              handleAiSettingChange("autoSuggestTreatments", !aiSettings.autoSuggestTreatments)
                            }
                          />
                          <span className="toggle-slider"></span>
                          Auto-suggest Treatments
                        </label>
                        <p>Automatically generate treatment recommendations</p>
                      </div>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={aiSettings.showAlternativeDiagnoses}
                            onChange={() =>
                              handleAiSettingChange("showAlternativeDiagnoses", !aiSettings.showAlternativeDiagnoses)
                            }
                          />
                          <span className="toggle-slider"></span>
                          Show Alternative Diagnoses
                        </label>
                        <p>Display secondary diagnostic possibilities</p>
                      </div>
                      <div className="toggle-setting">
                        <label>
                          <input
                            type="checkbox"
                            checked={aiSettings.enablePredictiveAnalysis}
                            onChange={() =>
                              handleAiSettingChange("enablePredictiveAnalysis", !aiSettings.enablePredictiveAnalysis)
                            }
                          />
                          <span className="toggle-slider"></span>
                          Enable Predictive Analysis
                        </label>
                        <p>Use AI to predict potential complications</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === "security" && (
                <div className="settings-section">
                  <h2>Security Settings</h2>
                  <div className="security-settings">
                    <div className="setting-group">
                      <h3>Password & Authentication</h3>
                      <button className="btn-secondary">Change Password</button>
                      <button className="btn-secondary">Enable Two-Factor Authentication</button>
                    </div>
                    <div className="setting-group">
                      <h3>Session Management</h3>
                      <p>Active Sessions: 2</p>
                      <button className="btn-danger">Sign Out All Devices</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Settings */}
              {activeSection === "billing" && (
                <div className="settings-section">
                  <h2>Billing & Subscription</h2>
                  <div className="billing-info">
                    <div className="current-plan">
                      <h3>Current Plan: Professional</h3>
                      <p>$99/month - Unlimited scans and reports</p>
                      <button className="btn-primary">Upgrade Plan</button>
                    </div>
                    <div className="billing-history">
                      <h3>Recent Invoices</h3>
                      <div className="invoice-item">
                        <span>January 2024 - $99.00</span>
                        <button className="btn-secondary">Download</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Support Settings */}
              {activeSection === "support" && (
                <div className="settings-section">
                  <h2>Support & Help</h2>
                  <div className="support-options">
                    <div className="support-card">
                      <h3>📚 Documentation</h3>
                      <p>Access user guides and tutorials</p>
                      <button className="btn-secondary">View Docs</button>
                    </div>
                    <div className="support-card">
                      <h3>💬 Contact Support</h3>
                      <p>Get help from our support team</p>
                      <button className="btn-secondary">Contact Us</button>
                    </div>
                    <div className="support-card">
                      <h3>🐛 Report Bug</h3>
                      <p>Report issues or suggest improvements</p>
                      <button className="btn-secondary">Report Issue</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings
