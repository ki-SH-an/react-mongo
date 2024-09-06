import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '.https://github.com/ki-SH-an/react-mongo/blob/main/src/pages/Home.js';
import JobMakerLogin from './pages/jobmaker-login';
import JobMakerRegister from './pages/jobmaker-register';
import JobSeekerLogin from './pages/jobseeker-login';
import JobSeekerRegister from './pages/jobseeker-register';
import JobSeekerDashboard from './pages/JobSeekerDashboard'; // Import the JobSeekerDashboard component
import JobMakerDashboard from './pages/JobMakerDashboard'; // Import the JobMakerDashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Routes for Job Maker */}
        <Route path="/jobmaker-login" element={<JobMakerLogin />} />
        <Route path="/jobmaker-register" element={<JobMakerRegister />} />
        <Route path="/jobmaker-dashboard" element={<JobMakerDashboard />} /> {/* Add this route */}
        {/* Routes for Job Seeker */}
        <Route path="/jobseeker-login" element={<JobSeekerLogin />} />
        <Route path="/jobseeker-register" element={<JobSeekerRegister />} />
        <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
