const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],//Todo
    required: true,
  },
  resetPasswordExpires: {
    type: Date,
  },
  token: {
    type: String,
  },
  companiesApplied:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"AppliedCompany",
  }],
  additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Profile",
  }
  

});
module.exports = mongoose.model("User", userSchema);
