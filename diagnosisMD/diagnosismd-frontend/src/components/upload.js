"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./upload.css"

const Upload = () => {
    const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("generated")
  const [userName] = useState("Dr. Sarah Johnson")
  const [analysisResult, setAnalysisResult] = useState()
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState({})
  const [report, setReport] = useState();
  const [patientInfo, setPatientInfo] = useState({
    patientId: "",
    patientName: "",
    age: "",
    gender: "",
    scanType: "",
    bodyPart: "",
    clinicalHistory: "",
    urgency: "routine",
  })
  const fileInputRef = useRef(null)

  const acceptedFileTypes = [".jpg", ".jpeg", ".png", ".dcm", ".dicom", ".tiff", ".tif", ".pdf"]

  const scanTypes = ["X-ray", "CT Scan", "MRI", "Ultrasound", "Mammography", "PET Scan", "Nuclear Medicine"]

  const bodyParts = ["Chest", "Abdomen", "Head/Brain", "Spine", "Pelvis", "Extremities", "Heart", "Other"]

  const sidebarItems = [
    { icon: "📊", label: "Dashboard",link:"/dashboard"},
    { icon: "📤", label: "Upload Scan", active: true , link:"/upload" },
    { icon: "📋", label: "View Generated Reports", link:"/generated-reports" },
    { icon: "📄", label: "Upload Doctor Report", link:"/upload-doctor-report" },
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

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      const extension = "." + file.name.split(".").pop().toLowerCase()
      return acceptedFileTypes.includes(extension)
    })

    validFiles.forEach((file) => {
      const fileId = Date.now() + Math.random()
      const newFile = {
        id: fileId,
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
      }

      setUploadedFiles((prev) => [...prev, newFile])
      simulateUpload(fileId)
    })
  }

  const simulateUpload = (fileId) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "completed" } : file)))
        setUploadProgress((prev) => ({ ...prev, [fileId]: 100 }))
      } else {
        setUploadProgress((prev) => ({ ...prev, [fileId]: Math.floor(progress) }))
      }
    }, 200)
  }

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[fileId]
      return newProgress
    })
  }

  const handleInputChange = (field, value) => {
    setPatientInfo((prev) => ({ ...prev, [field]: value }))
  }

  // upload.js

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!uploadedFiles || uploadedFiles.length === 0) {
    alert("⚠️ Please upload at least one scan before submitting.");
    return;
  }

  const firstFile = uploadedFiles[0].file;
  if (!(firstFile instanceof File)) {
    alert("❌ Invalid file type. Please re-upload.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", firstFile);

    const API_URL = "https://unbewitchingly-conservational-chace.ngrok-free.dev/predict";

    console.log("📤 Uploading file:", firstFile.name);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend Error:", errorText);
      alert("Server Error: " + errorText);
      return;
    }

    const blob = await response.blob();

    // ⚡ Trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "xray_report.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();

    alert("🩻 AI Report PDF generated and downloaded successfully!");
  } catch (err) {
    console.error("❌ Request Failed:", err);
    alert("Something went wrong while connecting to the API.");
  }
};









  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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
          <div className="upload-container">
            <div className="upload-header">
              <h1>Upload Medical Scan</h1>
              <p>Upload X-rays, MRI, CT scans, and other medical images for AI-powered analysis</p>
            </div>

            <form onSubmit={handleSubmit} className="upload-form">
              {/* Patient Information Section */}
              <section className="patient-info-section">
                <h2>Patient Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="patientId">Patient ID *</label>
                    <input
                      type="text"
                      id="patientId"
                      value={patientInfo.patientId}
                      onChange={(e) => handleInputChange("patientId", e.target.value)}
                      placeholder="Enter patient ID"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="patientName">Patient Name *</label>
                    <input
                      type="text"
                      id="patientName"
                      value={patientInfo.patientName}
                      onChange={(e) => handleInputChange("patientName", e.target.value)}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      id="age"
                      value={patientInfo.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="Age"
                      min="0"
                      max="150"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      value={patientInfo.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Scan Information Section */}
              <section className="scan-info-section">
                <h2>Scan Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="scanType">Scan Type *</label>
                    <select
                      id="scanType"
                      value={patientInfo.scanType}
                      onChange={(e) => handleInputChange("scanType", e.target.value)}
                      required
                    >
                      <option value="">Select scan type</option>
                      {scanTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bodyPart">Body Part *</label>
                    <select
                      id="bodyPart"
                      value={patientInfo.bodyPart}
                      onChange={(e) => handleInputChange("bodyPart", e.target.value)}
                      required
                    >
                      <option value="">Select body part</option>
                      {bodyParts.map((part) => (
                        <option key={part} value={part}>
                          {part}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="clinicalHistory">Clinical History</label>
                    <textarea
                      id="clinicalHistory"
                      value={patientInfo.clinicalHistory}
                      onChange={(e) => handleInputChange("clinicalHistory", e.target.value)}
                      placeholder="Enter relevant clinical history, symptoms, or previous findings..."
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="urgency">Priority Level</label>
                    <select
                      id="urgency"
                      value={patientInfo.urgency}
                      onChange={(e) => handleInputChange("urgency", e.target.value)}
                    >
                      <option value="routine">Routine</option>
                      <option value="urgent">Urgent</option>
                      <option value="stat">STAT</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* File Upload Section */}
              <section className="file-upload-section">
                <h2>Upload Files</h2>
                <div
                  className={`upload-dropzone ${dragActive ? "drag-active" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-icon">📁</div>
                  <h3>Drag and drop files here</h3>
                  <p>or click to browse files</p>
                  <div className="supported-formats">
                    <span>Supported formats: DICOM, JPEG, PNG, TIFF, PDF</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={acceptedFileTypes.join(",")}
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="uploaded-files">
                    <h3>Uploaded Files ({uploadedFiles.length})</h3>
                    <div className="files-list">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="file-item">
                          <div className="file-info">
                            <div className="file-icon">
                              {file.name.toLowerCase().includes(".dcm")
                                ? "🏥"
                                : file.name.toLowerCase().includes(".pdf")
                                  ? "📄"
                                  : "🖼️"}
                            </div>
                            <div className="file-details">
                              <span className="file-name">{file.name}</span>
                              <span className="file-size">{formatFileSize(file.size)}</span>
                            </div>
                          </div>
                          <div className="file-status">
                            {file.status === "uploading" && (
                              <div className="progress-container">
                                <div className="progress-bar">
                                  <div
                                    className="progress-fill"
                                    style={{ width: `${uploadProgress[file.id] || 0}%` }}
                                  />
                                </div>
                                <span className="progress-text">{uploadProgress[file.id] || 0}%</span>
                              </div>
                            )}
                            {file.status === "completed" && <span className="status-completed">✅ Complete</span>}
                            <button type="button" className="remove-file-btn" onClick={() => removeFile(file.id)}>
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>


              {/* Submit Section */}
              <section className="submit-section">
                <div className="submit-actions">
                  <button type="button" className="btn-secondary">
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={uploadedFiles.length === 0 || !patientInfo.patientId || !patientInfo.scanType}
                  >
                    Start AI Analysis
                  </button>
                </div>
                <div className="submit-info">
                  <p>
                    By submitting, you confirm that you have the necessary permissions to upload and analyze these
                    medical images.
                  </p>
                </div>
              </section>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Upload
