import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./meeting.css";

const Meetings = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60); 

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/createfeedback");
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  return (
    <div className="meeting-container">
      <h1 className="meeting-title">Welcome to the Meeting</h1>
      <p className="meeting-text">Your meeting has started</p>
      <div className="meeting-timer">Time Remaining: {timeLeft}s</div>
    </div>
  );
};

export default Meetings;
