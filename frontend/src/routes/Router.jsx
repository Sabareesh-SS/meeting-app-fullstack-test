import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Home from '../pages/home/Home';
import Feedback from '../pages/feedback/Feedback';
import Adminhome from '../pages/adminhome/Adminhome';
import Adminfeedback from '../pages/adminfeedback/adminfeedback.jsx';
import Createfeedback from '../pages/createfeedback/Createfeedback';
import Login from '../pages/login/Login.jsx';
import Meeting from '../pages/meetings/Meeting.jsx';

const role = localStorage.getItem("userRole");

export default function Router() {
  const location = useLocation();
  const hideNavbarOn = ["/"]; 

  return (
    <div>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      
      <Routes>
        {role === "admin" ? (
          <>
            <Route path="/adminhome" element={<Adminhome />} />
            <Route path="/adminfeedback" element={<Adminfeedback />} />
          </> 
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/createfeedback" element={<Createfeedback />} />
            <Route path="/meeting" element={<Meeting />} />
          </>
        )}
        
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}
