// Registration for Job Seekers
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./jsr.css";

const JobSeekerRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/jobseeker/register', {
        name,
        email,
        password,
        cgpa,
        skills
      });

      if (response.data) {
        navigate('/jobseeker-login');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <Container>
      <Box
  sx={{
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
  }}
>
  <Typography variant="h4" sx={{ marginBottom: '1.5rem', color: '#222' }}>
    Register as Job Seeker
  </Typography>
  <form onSubmit={handleRegister}>
    <TextField
      label="Name"
      fullWidth
      value={name}
      onChange={(e) => setName(e.target.value)}
      sx={{ marginBottom: '1rem' }}
    />
    <TextField
      label="Email"
      fullWidth
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      sx={{ marginBottom: '1rem' }}
    />
    <TextField
      label="Password"
      type="password"
      fullWidth
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      sx={{ marginBottom: '1rem' }}
    />
    <TextField
      label="CGPA"
      fullWidth
      value={cgpa}
      onChange={(e) => setCgpa(e.target.value)}
      sx={{ marginBottom: '1rem' }}
    />
    <TextField
      label="Skills"
      fullWidth
      value={skills}
      onChange={(e) => setSkills(e.target.value)}
      sx={{ marginBottom: '1rem' }}
    />
    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
      Register
    </Button>
  </form>
  {error && (
    <Typography color="error" sx={{ marginTop: '1rem' }}>
      {error}
    </Typography>
  )}
</Box>
    </Container>
  );
};

export default JobSeekerRegistration;
