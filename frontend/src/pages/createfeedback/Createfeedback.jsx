import React, { useState } from "react";
import axios from "axios";
import "./createfeedbacjk.css"; 

const CreateFeedback = () => {
  const [feedback, setFeedback] = useState({
    User: "", 
    Performance: "",
    Ratings: "",
    Feedback: "",
    Speaker: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/submit-feedback", feedback);
      alert(response.data.message);

      setFeedback({ User: "", Performance: "", Ratings: "", Feedback: "", Speaker: "" });

    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="createfeedback-container">
      <div className="createfeedback-card">
        <h2 className="createfeedback-title">Feedback Form</h2>
        <form onSubmit={handleSubmit} className="createfeedback-form">
          <div className="createfeedback-group">
            <label>User</label>
            <input type="text" name="User" value={feedback.User} onChange={handleChange} required />
          </div>
          <div className="createfeedback-group">
            <label>Performance</label>
            <input type="text" name="Performance" value={feedback.Performance} onChange={handleChange} required />
          </div>
          <div className="createfeedback-group">
            <label>Ratings (1-5)</label>
            <input type="number" name="Ratings" value={feedback.Ratings} onChange={handleChange} min="1" max="5" required />
          </div>
          <div className="createfeedback-group">
            <label>Feedback</label>
            <textarea name="Feedback" value={feedback.Feedback} onChange={handleChange} required></textarea>
          </div>
          <div className="createfeedback-group">
            <label>Speaker</label>
            <input type="text" name="Speaker" value={feedback.Speaker} onChange={handleChange} required />
          </div>
          <button type="submit" className="createfeedback-button">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default CreateFeedback;
