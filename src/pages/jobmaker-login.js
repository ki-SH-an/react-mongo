import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobMakerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password, userType: 'jobmaker' });
      localStorage.setItem('token', response.data.token);
      navigate('/jobmaker-dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Invalid credentials, please try again.');
    }
  };

  // Inline styling for the container and box
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000', // Black background for the body
  };

  const boxStyle = {
    backgroundColor: '#fff', // White background for the box
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '400px',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Login as Job Maker</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#6c63ff',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobMakerLogin;