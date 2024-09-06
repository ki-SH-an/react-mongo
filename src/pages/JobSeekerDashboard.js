import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './JobSeekerDashboard.css'; // Ensure this CSS file includes styles for the new elements


const JobSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('job');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profilePic, setProfilePic] = useState('/aizen.gif'); // Default profile picture
  const [profileDetails, setProfileDetails] = useState({
    companyName: 'ABC Corp',
    email: 'contact@abccorp.com',
    industries: 'Technology, Finance',
  });
  const fileInputRef = useRef(null);
  const [listings, setListings] = useState([]);
  const [viewType, setViewType] = useState('jobs'); // 'jobs' or 'internships'
  const [searchTerm, setSearchTerm] = useState(''); // State for search term


  // Fetch listings on viewType change
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const endpoint = viewType === 'jobs' ? '/api/jobs' : '/api/internships';
        const response = await axios.get(`http://localhost:5000${endpoint}`);
        setListings(response.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };


    fetchListings();
  }, [viewType]);


  // Filter listings based on the search term
  const filteredListings = listings.filter((listing) => {
    const skills = Array.isArray(listing.skills) ? listing.skills.join(', ') : listing.skills;
   
    return (
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (viewType === 'jobs' && listing.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (viewType === 'internships' && listing.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      skills.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="navbar-left">
          <img src="/OPNEXT.png" alt="Logo" className="logo" />
        </div>
        <div className="navbar-center">
          <button
            className={`toggle-button ${activeTab === 'job' ? 'active' : ''}`}
            onClick={() => setActiveTab('job')}
          >
            Jobs
          </button>
          <button
            className={`toggle-button ${activeTab === 'internship' ? 'active' : ''}`}
            onClick={() => setActiveTab('internship')}
          >
            Internships
          </button>
        </div>
        <div className="navbar-right">
          <img
            src={profilePic}
            alt="Profile"
            className="account-image"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />
        </div>
      </div>
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarVisible(false)}>×</button>
        <div className="profile-section">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <button
            className="edit-dp-btn"
            onClick={() => fileInputRef.current.click()}
          >
            Change Logo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files.length) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => setProfilePic(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <div className="profile-details">
          <label>
            Company Name:
            <input
              type="text"
              value={profileDetails.companyName}
              onChange={(e) => setProfileDetails({ ...profileDetails, companyName: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={profileDetails.email}
              onChange={(e) => setProfileDetails({ ...profileDetails, email: e.target.value })}
            />
          </label>
          <label>
            Industries:
            <input
              type="text"
              value={profileDetails.industries}
              onChange={(e) => setProfileDetails({ ...profileDetails, industries: e.target.value })}
            />
          </label>
          <button className="edit-details-btn">Save Changes</button>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="dashboard-title">{activeTab === 'job' ? 'Job Listings' : 'Internship Listings'}</div>
      <div className="listings">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <div className="listing-title">{listing.title}</div>
              <div className="listing-company">Company: {listing.company}</div>
              <div className="listing-location">Location: {listing.location}</div>
              {activeTab === 'job' && (
                <>
                  <div className="listing-role">Role: {listing.role}</div>
                  <div className="listing-salary">Salary: {listing.salary}</div>
                </>
              )}
              {activeTab === 'internship' && (
                <>
                  <div className="listing-stipend">Stipend: {listing.stipend}</div>
                  <div className="listing-skills">Skills: {listing.skills.join(', ')}</div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="no-listings">No listings available</div>
        )}
      </div>
    </div>
  );
};


export default JobSeekerDashboard;
