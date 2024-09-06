const mongoose = require('mongoose');

const jobMakerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const JobMaker = mongoose.model('JobMaker', jobMakerSchema);
module.exports = JobMaker;
