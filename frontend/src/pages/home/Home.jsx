import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const HomePage = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/meetings")
      .then((response) => {
        setMeetings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });
  }, []);



  return (
    <div className="homepage">
      <main className="content">
        <h2 className="meeting-title">My Meetings</h2>
        {meetings.length > 0 ? (
          <div className="meetings">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="meetingss-card">
                <p className="meeting-text">Topic: {meeting.Topic}</p>
                <p>
                  <b>Date:</b> {new Date(meeting.Date).toISOString().split("T")[0]} <br />
                  <b>Time:</b> {meeting.time}
                </p>
                <p>
                  <b>Venue:</b> {meeting.venue}
                </p>
                <button 
                  className="enter-meeting-button" 
                  onClick={() => navigate("/meeting")}
                >
                  Enter Meeting
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-meetings">No Meetings available at the moment</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
