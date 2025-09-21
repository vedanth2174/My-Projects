import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Upload from "./components/upload";
import GeneratedReports from "./components/generated-reports";
import UploadDoctorReport from "./components/upload-doctor-report";
import SuggestedTreatment from "./components/suggested-treatment";
import Settings from "./components/settings";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (!token) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generated-reports"
          element={
            <ProtectedRoute>
              <GeneratedReports/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-doctor-report"
          element={
            <ProtectedRoute>
              <UploadDoctorReport/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/treatments"
          element={
            <ProtectedRoute>
              <SuggestedTreatment/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
