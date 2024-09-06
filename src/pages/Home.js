import React, { useState,useEffect } from "react";
import { Box, Button, Typography, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "./https://github.com/ki-SH-an/react-mongo/blob/main/src/pages/Home.css";
import comImage from "./https://github.com/ki-SH-an/react-mongo/blob/main/src/pages/com.gif"; // Ensure this path is correct

const Home = () => {
  useEffect(() => {
    // Add Watson Assistant chat script
    window.watsonAssistantChatOptions = {
      integrationID: "24398786-0d67-49a9-a711-e548babffb48", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "96d039a1-d0a2-4aed-aa11-f1ea84c9b072", // The ID of your service instance.
      onLoad: async (instance) => { await instance.render(); }
    };

    setTimeout(() => {
      const t = document.createElement('script');
      t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
              (window.watsonAssistantChatOptions.clientVersion || 'latest') +
              "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    }, 0);
  }, []);
  // State to manage which section is visible
  const [activeSection, setActiveSection] = useState("");

  return (
    <>
      <nav>
        <div className="logo">JobPortal</div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <Container className="home-container">
        <Box className="hero-content">
          <Box className="hero-text">
            <Typography
              variant="h2"
              className="hero-heading"
              style={{ fontSize: "4.5rem" }}
            >
              Find Your Perfect Career Match
            </Typography>
            <Typography
              variant="body1"
              className="hero-paragraph"
              sx={{ fontSize: "1.5rem", marginTop: "1rem", color: "#f5f5f5" }}
            >
              Connect with top jobs and fast-track your career today. Let's make
              it happen.
            </Typography>

            {/* Buttons Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button
                  variant="contained"
                  onClick={() => setActiveSection("jobMaker")}
                  className="hero-button"
                  sx={{
                    padding: "1rem 2rem",
                    fontSize: "1.25rem",
                    backgroundColor: "#007aff",
                    color: "#fff",
                    borderRadius: "50px",
                    textTransform: "none",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                    "&:hover": {
                      backgroundColor: "#005bb5",
                    },
                  }}
                >
                  Job Maker
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => setActiveSection("jobSeeker")}
                  className="hero-button"
                  sx={{
                    padding: "1rem 2rem",
                    fontSize: "1.25rem",
                    color: "#007aff",
                    borderRadius: "50px",
                    textTransform: "none",
                    borderColor: "#007aff",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "#005bb5",
                      color: "#005bb5",
                    },
                  }}
                >
                  Job Seeker
                </Button>
              </Box>

              {/* Conditionally Render Additional Buttons */}
              {activeSection === "jobMaker" && (
                <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/jobmaker-login"
                    className="hero-button"
                    sx={{
                      padding: "1rem 2rem",
                      fontSize: "1.25rem",
                      color: "#007aff",
                      borderRadius: "50px",
                      textTransform: "none",
                      borderColor: "#007aff",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        borderColor: "#005bb5",
                        color: "#005bb5",
                      },
                    }}
                  >
                    Login-Admin
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/jobmaker-register"
                    className="hero-button"
                    sx={{
                      padding: "1rem 2rem",
                      fontSize: "1.25rem",
                      backgroundColor: "#007aff",
                      color: "#fff",
                      borderRadius: "50px",
                      textTransform: "none",
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                      "&:hover": {
                        backgroundColor: "#005bb5",
                      },
                    }}
                  >
                    Register-Admin
                  </Button>
                </Box>
              )}

              {activeSection === "jobSeeker" && (
                <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/jobseeker-login"
                    className="hero-button"
                    sx={{
                      padding: "1rem 2rem",
                      fontSize: "1.25rem",
                      color: "#007aff",
                      borderRadius: "50px",
                      textTransform: "none",
                      borderColor: "#007aff",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        borderColor: "#005bb5",
                        color: "#005bb5",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/jobseeker-register"
                    className="hero-button"
                    sx={{
                      padding: "1rem 2rem",
                      fontSize: "1.25rem",
                      backgroundColor: "#007aff",
                      color: "#fff",
                      borderRadius: "50px",
                      textTransform: "none",
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                      "&:hover": {
                        backgroundColor: "#005bb5",
                      },
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <img
            src={comImage}
            alt="Company"
            className="hero-image"
            style={{
              maxWidth: "500px",
              marginLeft: "2rem",
              borderRadius: "20px",
            }}
          />
        </Box>
      </Container>

      {/* Featured Companies Section */}
      <Container className="featured-companies">
        <Typography
          variant="h4"
          className="section-heading"
          sx={{ margin: "2rem 0", textAlign: "center" }}
        >
          Featured Companies
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6} md={3}>
            <Box className="company-logo" sx={{ textAlign: "center" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
                alt="Company 1"
                style={{ maxWidth: "150px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box className="company-logo" sx={{ textAlign: "center" }}>
              <img
                src="https://pngimg.com/d/microsoft_PNG2.png"
                alt="Company 2"
                style={{ maxWidth: "150px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box className="company-logo" sx={{ textAlign: "center" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/2560px-Meta-Logo.png"
                alt="Company 3"
                style={{ maxWidth: "150px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box className="company-logo" sx={{ textAlign: "center" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                alt="Company 4"
                style={{ maxWidth: "150px" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Job Categories Section */}
      <Container
        className="job-categories"
        sx={{ backgroundColor: "#000", padding: "4rem 0" }}
      >
        <Typography
          variant="h4"
          className="section-heading"
          sx={{ margin: "2rem 0", textAlign: "center" }}
        >
          Explore Job Categories
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6} md={4}>
            <Box
              className="category-box"
              sx={{
                textAlign: "center",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6">Technology</Typography>
              <Typography variant="body2">100+ Jobs Available</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box
              className="category-box"
              sx={{
                textAlign: "center",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6">Marketing</Typography>
              <Typography variant="body2">75+ Jobs Available</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box
              className="category-box"
              sx={{
                textAlign: "center",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6">Finance</Typography>
              <Typography variant="body2">50+ Jobs Available</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Candidate Success Stories Section */}
      <Container className="success-stories">
        <Typography
          variant="h4"
          className="section-heading"
          sx={{ margin: "2rem 0", textAlign: "center" }}
        >
          Success Stories
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              className="story-box"
              sx={{
                padding: "2rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body1">
                "JobPortal helped me land my dream job in tech. The process was
                smooth, and the support was fantastic!"
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              className="story-box"
              sx={{
                padding: "2rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6">Jane Smith</Typography>
              <Typography variant="body1">
                "Thanks to JobPortal, I found a great marketing position that
                aligns perfectly with my skills and interests."
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Newsletter Signup Section */}
      <Container
        className="newsletter-signup"
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" className="section-heading">
          Stay Updated with Job Alerts
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
          Sign up for our newsletter and get the latest job opportunities
          delivered to your inbox.
        </Typography>
        <form>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              padding: "1rem",
              borderRadius: "50px",
              width: "300px",
              border: "none",
              marginRight: "1rem",
            }}
          />
          <Button
            variant="contained"
            sx={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "50px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Subscribe
          </Button>
        </form>
      </Container>

      {/* Footer Section */}
      <footer className="footer">
        <Container>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", padding: "2rem 0", color: "#777" }}
          >
            &copy; 2024 JobPortal. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </>
  );
};

export default Home;
