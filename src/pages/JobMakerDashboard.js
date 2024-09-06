import React, { useState } from 'react';
import axios from 'axios';
import './JobMakerDashboard.css'; // Assuming you have your CSS file

const JobMakerDashboard = () => {
  const [listingType, setListingType] = useState(null); // 'job' or 'internship'
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    stipend: '',
    role: '',
    skills: ''
  });

  const handleListingTypeChange = (type) => {
    setListingType(type);
    // Optionally reset form data if needed
    setFormData({
      title: '',
      company: '',
      location: '',
      salary: '',
      stipend: '',
      role: '',
      skills: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = listingType === 'job' ? '/api/jobs' : '/api/internships';
      const dataToSend = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        ...(listingType === 'job' ? { salary: formData.salary, role: formData.role, skills: formData.skills } : { stipend: formData.stipend, role: formData.role, skills: formData.skills })
      };
      const response = await axios.post(`http://localhost:5000${endpoint}`, dataToSend);
      console.log(`${listingType.charAt(0).toUpperCase() + listingType.slice(1)} added successfully:`, response.data);
      // Optionally handle success, like showing a success message or clearing the form
    } catch (err) {
      console.error(`Error adding ${listingType}:`, err);
      // Optionally handle errors, like showing an error message
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Job Maker Dashboard</h1>
      {listingType === null ? (
        <div className="listing-type-selection">
          <button onClick={() => handleListingTypeChange('job')} className="listing-button">Add Job</button>
          <button onClick={() => handleListingTypeChange('internship')} className="listing-button">Add Internship</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="listing-form">
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
          {listingType === 'job' ? (
            <>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
              <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
            </>
          ) : (
            <>
              <input type="text" name="stipend" value={formData.stipend} onChange={handleChange} placeholder="Stipend" />
              <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
            </>
          )}
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default JobMakerDashboard;
