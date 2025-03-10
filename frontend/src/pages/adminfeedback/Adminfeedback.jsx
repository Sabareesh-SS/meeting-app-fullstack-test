import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminfeedback.css";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/feedbacks")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
      });
  }, []);

  return (
    <div className="feedback-page">
      <h2 className="feedback-title">All Feedbacks</h2>
      {feedbacks.length > 0 ? (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Speaker</th>
              <th>Performance</th>
              <th>Feedback</th>
              <th>Ratings</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb.id}>
                <td>{fb.User}</td>
                <td>{fb.speaker}</td>
                <td>{fb.performance}</td>
                <td>{fb.feedback || "No comments"}</td>
                <td>{fb.ratings}/5</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-feedback">No feedback available.</p>
      )}
    </div>
  );
};

export default Feedback;
