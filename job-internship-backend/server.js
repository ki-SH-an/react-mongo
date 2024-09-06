require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to your frontend's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Middleware setup
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define Mongoose schemas and models
const jobSeekerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
});

const jobMakerSchema = new mongoose.Schema({
  companyName: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
});

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  role: String,
  skills: [String],
  datePosted: { type: Date, default: Date.now },
});

const internshipSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  stipend: String,
  role: String,
  skills: [String],
  datePosted: { type: Date, default: Date.now },
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
const JobMaker = mongoose.model('JobMaker', jobMakerSchema);
const Job = mongoose.model('Job', jobSchema);
const Internship = mongoose.model('Internship', internshipSchema);

// Login route for job seekers and job makers
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body; // userType can be 'jobseeker' or 'jobmaker'

    // Determine the model to use based on userType
    const UserModel = userType === 'jobseeker' ? JobSeeker : JobMaker;
    
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Registration route for job seekers
app.post('/api/jobseeker/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the job seeker is already registered
    const existingJobSeeker = await JobSeeker.findOne({ email });
    if (existingJobSeeker) {
      return res.status(400).json({ message: 'Job Seeker already registered with this email' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new job seeker
    const jobSeeker = new JobSeeker({ name, email, password: hashedPassword });
    await jobSeeker.save();

    res.status(201).json({ message: 'Job Seeker registered successfully' });
  } catch (err) {
    console.error('Error during job seeker registration:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Registration route for job makers
app.post('/api/jobmaker/register', async (req, res) => {
  try {
    const { companyName, email, password } = req.body;

    // Check if the job maker is already registered
    const existingJobMaker = await JobMaker.findOne({ email });
    if (existingJobMaker) {
      return res.status(400).json({ message: 'Job Maker already registered with this email' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new job maker
    const jobMaker = new JobMaker({ companyName, email, password: hashedPassword });
    await jobMaker.save();

    res.status(201).json({ message: 'Job Maker registered successfully' });
  } catch (err) {
    console.error('Error during job maker registration:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Route for job makers to add jobs
app.post('/api/jobs', async (req, res) => {
  try {
    const { title, company, location, salary, role, skills } = req.body;
    const job = new Job({ title, company, location, salary, role, skills });
    await job.save();
    res.status(201).json({ message: 'Job added successfully' });
  } catch (err) {
    console.error('Error adding job:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Route for job makers to add internships
app.post('/api/internships', async (req, res) => {
  try {
    const { title, company, location, stipend, role, skills } = req.body;
    const internship = new Internship({ title, company, location, stipend, role, skills });
    await internship.save();
    res.status(201).json({ message: 'Internship added successfully' });
  } catch (err) {
    console.error('Error adding internship:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Route for job seekers to get jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Route for job seekers to get internships
app.get('/api/internships', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (err) {
    console.error('Error fetching internships:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
