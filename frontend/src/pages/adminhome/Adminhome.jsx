import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminhome.css";

const Adminhome = () => {
  const [meetings, setMeetings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);

  const [newMeeting, setNewMeeting] = useState({
    Topic: "",
    Date: "",
    time: "",
    venue: "",
    Img: "",
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = () => {
    axios
      .get("http://localhost:8000/api/meetings")
      .then((response) => setMeetings(response.data))
      .catch((error) => alert("Error fetching meetings: " + error.message));
  };

  const handleInputChange = (e) => {
    setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
  };

  const handleSaveMeeting = () => {
    if (!newMeeting.Topic || !newMeeting.Date || !newMeeting.time || !newMeeting.venue) {
      alert("All fields are required!");
      return;
    }

    if (editMode) {
      axios
        .put(`http://localhost:8000/api/meetings/${selectedMeetingId}`, newMeeting)
        .then(() => {
          fetchMeetings();
          resetPopup();
          alert("Meeting updated successfully!");
        })
        .catch((error) => alert("Error updating meeting: " + error.message));
    } else {
      axios
        .post("http://localhost:8000/api/meetings", newMeeting)
        .then(() => {
          fetchMeetings();
          resetPopup();
          alert("Meeting created successfully!");
        })
        .catch((error) => alert("Error creating meeting: " + error.message));
    }
  };

  const handleDeleteMeeting = (id) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      axios
        .delete(`http://localhost:8000/api/meetings/${id}`)
        .then(() => {
          fetchMeetings();
          alert("Meeting deleted successfully!");
        })
        .catch((error) => alert("Error deleting meeting: " + error.message));
    }
  };

  const handleEditMeeting = (meeting) => {
    setNewMeeting(meeting);
    setSelectedMeetingId(meeting.id);
    setEditMode(true);
    setShowPopup(true);
  };

  const resetPopup = () => {
    setEditMode(false);
    setShowPopup(false);
    setNewMeeting({ Topic: "", Date: "", time: "", venue: "", Img: "" });
  };

  return (
    <div className="homepage">
      <main className="content">
        <h2 className="meeting-title">Meetings</h2>

        {meetings.length > 0 ? (
          <div className="meetings">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="meeting-card">
                <p className="meeting-text">Topic: {meeting.Topic}</p>
                <p>
                  <b>Date:</b> {new Date(meeting.Date).toISOString().split("T")[0]} <br />
                  <b>Time:</b> {meeting.time}
                </p>
                <p>
                  <b>Venue:</b> {meeting.venue}
                </p>
                <div className="meeting-actions">
                  <button className="edit-button" onClick={() => handleEditMeeting(meeting)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteMeeting(meeting.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-meetings">No Meetings available at the moment</p>
        )}

        <div className="create-button-container">
          <button className="create-button" onClick={() => setShowPopup(true)}>Create Meeting</button>
        </div>
      </main>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{editMode ? "Edit Meeting" : "Create a New Meeting"}</h3>
            <p><b>Topic</b></p>
            <input type="text" name="Topic" value={newMeeting.Topic} onChange={handleInputChange} required />
            <p><b>Date</b></p>
            <input type="date" name="Date" value={newMeeting.Date} onChange={handleInputChange} required />
            <p><b>Time</b></p>
            <input type="time" name="time" value={newMeeting.time} onChange={handleInputChange} required />
            <p><b>Venue</b></p>
            <input type="text" name="venue" value={newMeeting.venue} onChange={handleInputChange} required />

            <div className="popup-buttons">
              <button onClick={handleSaveMeeting}>{editMode ? "Update" : "Create"}</button>
              <button onClick={resetPopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminhome;
