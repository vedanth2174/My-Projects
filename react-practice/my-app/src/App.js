import React, { useState, useEffect } from "react";
import "./App.css";
import ProfileCard from "./components/ProfileCard";

export default function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Check for token on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fake login (replace with your backend later)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (email === "test@test.com" && pass === "1234") {
      const fakeToken = "abcd.efgh.ijkl"; // pretend JWT
      localStorage.setItem("token", fakeToken);
      setIsLoggedIn(true);
    } else {
      setError("Invalid credentials");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <>
          <div className="header">
            <h1>Welcome, Vedant 🎉</h1>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>

          <div className="profile-list">
            <ProfileCard
              name="Vedant Hippalgave"
              age="20"
              tagline="When nothing is for sure, anything can happen..."
            />
            <ProfileCard
              name="Bill Gates"
              age="54"
              tagline="I am the owner of Microsoft"
            />
            <ProfileCard
              name="Virat Kohli"
              age="36"
              tagline="I am the Best"
            />
          </div>
        </>
      )}
    </div>
  );
}
