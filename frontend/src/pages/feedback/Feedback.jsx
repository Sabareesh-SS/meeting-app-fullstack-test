import React, { useEffect, useState } from "react";
import axios from "axios";
import "./feedback.css";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const user = "user"; 

  useEffect(() => {
    axios.get(`http://localhost:8000/api/feedbacks/`)
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
      });
  }, []);

  return (
    <div className="feedback-page">
      <h2 className="feedback-title">My Feedbacks</h2>
      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((fb) => (
            <div key={fb.id} className="feedback-card">
              <h3 className="feedback-user">Speaker: {fb.speaker}</h3>
              <p><strong>Performance:</strong> {fb.performance}</p>
              <p><strong>Feedback:</strong> {fb.feedback || "No comments"}</p>
              <p><strong>Ratings:</strong> {fb.ratings}/5</p>
            </div>
          ))
        ) : (
          <p className="no-feedback">No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
