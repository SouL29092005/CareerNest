import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String],
    required: true,
    validate: v => v.length > 0
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  experienceLevel: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Internship", "Contract"]
  },
  openings: {
    type: Number,
    required: true,
    min: 1
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    default: []
  }]
}, { timestamps: true });

// Indexes for faster queries
jobSchema.index({ title: "text", description: "text" });
jobSchema.index({ location: 1 });
jobSchema.index({ jobType: 1 });

export const Job = mongoose.model("Job", jobSchema);