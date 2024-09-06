// Registration for Job Makers
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./jmr.css";

const JobMakerRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/jobmaker/register', {
        companyName,
        email,
        password
      });

      if (response.data) {
        navigate('/jobmaker-login');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <Container>
      <Box
  sx={{
    backgroundColor: '#ffffff', // White background
    padding: '2rem', // Add padding for inner spacing
    borderRadius: '12px', // Rounded corners
    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.2)', // Shadow for depth effect
    maxWidth: '400px', // Limit the box width
    margin: '0 auto', // Center the box horizontally
    textAlign: 'center', // Center align text inside the box
  }}
>
  <Typography variant="h4" gutterBottom>
    Register as Job Maker
  </Typography>
  <form onSubmit={handleRegister}>
    <TextField
      label="Company Name"
      fullWidth
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Email"
      fullWidth
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Password"
      type="password"
      fullWidth
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      margin="normal"
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
      sx={{ marginTop: '1rem', padding: '0.75rem', width: '100%' }}
    >
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

export default JobMakerRegistration;
