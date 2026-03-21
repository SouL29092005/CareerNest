import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  role: {
    type: String,
    enum: ['student', 'recruiter'],
    required: true
  },

  profile: {
    bio: {
      type: String,
      default: ""
    },

    skills: [{
      type: String
    }],

    resume: {
      type: String // URL
    },

    resumeOriginalName: {
      type: String
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },

    profilePhoto: {
      type: String,
      default: ""
    }
  }

}, { timestamps: true });


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model("User", userSchema);