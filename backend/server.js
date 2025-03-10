require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(bodyParser.json());

//to create meetings
app.post("/api/meetings", (req, res) => {
  const { Topic, Date, time, venue} = req.body;
  if (!Topic || !Date || !time || !venue ) {
    return res.status(400).json({ message: "All fields are required." });
  }
  db.query(
    "INSERT INTO meetings (Topic, Date, time, venue) VALUES (?, ?, ?, ?)",
    [Topic, Date, time, venue],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating meeting" });
      }
      res.status(201).json({ id: result.insertId, Topic, Date, time, venue}); 
    }
  );
});

//to view meetings
app.get("/api/meetings", (req, res) => {
  const sql = "SELECT * FROM meetings";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//user feedback for specific user
app.get("/api/feedbacks/", (req, res) => {
  const user = req.params.user;
  const query = "SELECT * FROM feedbacks";

  db.query(query, [user], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

app.get("/api/feedbacks", (req, res) => {
  const sql = "SELECT * FROM feedbacks";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching feedbacks" });
    }
    res.json(result);
  });
});

app.post("/api/submit-feedback", (req, res) => {
  const { User, Performance, Ratings, Feedback, Speaker } = req.body;

  if (!User || !Performance || !Ratings || !Feedback || !Speaker) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db.query(
    "INSERT INTO feedbacks (User, Performance, Ratings, Feedback, Speaker) VALUES (?, ?, ?, ?, ?)",
    [User, Performance, Ratings, Feedback, Speaker],
    (err, result) => {
      if (err) {
        console.error("Error inserting feedback:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: " Feedback submitted successfully!" });
    }
  );
});

app.get("/api/login", (req, res) => {
  const { email, password } = req.query; 

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ role: user.roles });
  });
});

app.put("/api/meetings/:id", (req, res) => {
  const { id } = req.params;
  const { Topic, Date, time, venue } = req.body;
  
  if (!Topic || !Date || !time || !venue ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "UPDATE meetings SET Topic=?, `Date`=?, time=?, venue=? WHERE id=?";
  db.query(sql, [Topic, Date, time, venue, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating meeting" });
    }
    res.status(200).json({ message: "Meeting updated successfully!" });
  });
});

app.delete("/api/meetings/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM meetings WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting meeting" });
    }
    res.status(200).json({ message: "Meeting deleted successfully!" });
  });
});


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
