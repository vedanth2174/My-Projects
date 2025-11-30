import React, { useState } from "react";
import "./AddSuggestionModal.css";

export const AddSuggestionModal = ({ isOpen, onClose, network_id, networkName }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date();

  const month = String(today.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://reverse-auction-m5yj.onrender.com/add-suggestion`
    const payload = {
      id: Math.floor(100 + Math.random() * 900),
      date: formattedDate,
      author: user.email,
      title: title,
      description: description,
      status: "Pending",
      votes: 0,
      network_id: network_id,
    };
    try{
        console.log(payload)
        const response = await fetch(url,{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        if(data){
            console.log("Suggestion saved successfully.")
            alert(data.message)
            setTitle("");
            setDescription("");
        }
    }catch(err){
        console.error("Error adding suggestion: ",err)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Suggestion</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal-info">
          <p>
            Submit your suggestion to <strong>{networkName}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="suggestion-form">
          <div className="form-group">
            <label htmlFor="title">Suggestion Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, concise title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about your suggestion"
              rows={6}
              required
            />
          </div>

          <div className="form-footer">
            <p className="form-note">
              Your suggestion will be stored on blockchain for transparency
            </p>
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit Suggestion
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
