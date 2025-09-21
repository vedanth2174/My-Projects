"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./upload-doctor-report.css"

const UploadDoctorReport = () => {
    const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("generated")
  const [userName] = useState("Dr. Sarah Johnson")
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    reportType: "",
    reportDate: "",
    doctorName: "",
    hospitalName: "",
    diagnosis: "",
    recommendations: "",
    followUpDate: "",
    priority: "normal",
  })

  const sidebarItems = [
    { icon: "📊", label: "Dashboard",link:"/dashboard"},
    { icon: "📤", label: "Upload Scan", link:"/upload" },
    { icon: "📋", label: "View Generated Reports", link:"/generated-reports" },
    { icon: "📄", label: "Upload Doctor Report", active: true , link:"/upload-doctor-report" },
    { icon: "💊", label: "Suggested Treatments", link:"/treatments" },
    { icon: "⚙️", label: "Settings", link:"/settings" },
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/tiff",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024 // 50MB limit
    })

    const newFiles = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: "pending",
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((fileObj) => {
      simulateUpload(fileObj.id)
    })
  }

  const simulateUpload = (fileId) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.uploadProgress + Math.random() * 20, 100)
            return {
              ...file,
              uploadProgress: newProgress,
              status: newProgress === 100 ? "completed" : "uploading",
            }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 5000)
  }

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting doctor report:", { formData, uploadedFiles })
    // Handle form submission
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="upload-doctor-report-container">
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
          <div className="upload-doctor-report-header">
            <h1>Upload Doctor Report</h1>
            <p>Upload existing medical reports and documentation for patient records</p>
          </div>

          <form onSubmit={handleSubmit} className="upload-doctor-report-form">
            {/* Patient Information Section */}
            <section className="form-section">
              <h2>Patient Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="patientId">Patient ID *</label>
                  <input
                    type="text"
                    id="patientId"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    placeholder="Enter patient ID"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patientName">Patient Name *</label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient full name"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Report Information Section */}
            <section className="form-section">
              <h2>Report Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="reportType">Report Type *</label>
                  <select
                    id="reportType"
                    name="reportType"
                    value={formData.reportType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select report type</option>
                    <option value="radiology">Radiology Report</option>
                    <option value="pathology">Pathology Report</option>
                    <option value="laboratory">Laboratory Report</option>
                    <option value="consultation">Consultation Report</option>
                    <option value="discharge">Discharge Summary</option>
                    <option value="operative">Operative Report</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="reportDate">Report Date *</label>
                  <input
                    type="date"
                    id="reportDate"
                    name="reportDate"
                    value={formData.reportDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="doctorName">Doctor Name *</label>
                  <input
                    type="text"
                    id="doctorName"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    placeholder="Enter doctor's name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hospitalName">Hospital/Clinic Name</label>
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="Enter hospital or clinic name"
                  />
                </div>
              </div>
            </section>

            {/* Clinical Information Section */}
            <section className="form-section">
              <h2>Clinical Information</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="diagnosis">Primary Diagnosis</label>
                  <textarea
                    id="diagnosis"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    placeholder="Enter primary diagnosis or findings"
                    rows="3"
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="recommendations">Recommendations/Treatment Plan</label>
                  <textarea
                    id="recommendations"
                    name="recommendations"
                    value={formData.recommendations}
                    onChange={handleInputChange}
                    placeholder="Enter treatment recommendations or follow-up instructions"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="followUpDate">Follow-up Date</label>
                  <input
                    type="date"
                    id="followUpDate"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority Level</label>
                  <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange}>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </section>

            {/* File Upload Section */}
            <section className="form-section">
              <h2>Upload Report Files</h2>
              <div
                className={`upload-zone ${dragActive ? "drag-active" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="upload-content">
                  <div className="upload-icon">📄</div>
                  <h3>Drag and drop your report files here</h3>
                  <p>or click to browse files</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    accept=".pdf,.jpg,.jpeg,.png,.tiff,.txt,.doc,.docx"
                    className="file-input"
                  />
                  <div className="file-types">
                    <p>Supported formats: PDF, JPEG, PNG, TIFF, TXT, DOC, DOCX</p>
                    <p>Maximum file size: 50MB per file</p>
                  </div>
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="uploaded-files">
                  <h3>Uploaded Files ({uploadedFiles.length})</h3>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="file-item">
                      <div className="file-info">
                        <div className="file-icon">
                          {file.type.includes("pdf") ? "📄" : file.type.includes("image") ? "🖼️" : "📝"}
                        </div>
                        <div className="file-details">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <div className="file-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${file.uploadProgress}%` }}></div>
                        </div>
                        <span className="progress-text">
                          {file.status === "completed" ? "Complete" : `${Math.round(file.uploadProgress)}%`}
                        </span>
                      </div>
                      <button type="button" className="remove-file" onClick={() => removeFile(file.id)}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Submit Section */}
            <section className="form-section">
              <div className="submit-section">
                <button type="button" className="btn-secondary">
                  Save as Draft
                </button>
                <button type="submit" className="btn-primary">
                  Upload Report
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>
    </div>
  )
}

export default UploadDoctorReport
