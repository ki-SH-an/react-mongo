const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
module.exports = JobSeeker;
