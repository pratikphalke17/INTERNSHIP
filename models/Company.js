const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  nameOfCompany: {
    type: String,
    required: true,
  },
  description:{
    type :String,
    required:true
  },
  // Job Details
  roleDescription: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  //criteria
  cgpa: {
    type: Number,
    required: true,
    min: 0.0,
    max: 10.0,
  },
  tenthCriteria: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  twelfthCriteria: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  backlog: {
    type: String,
    enum: ["Active", "Passive"],
    required: true,
  },
  disabilityCriteria: {
    type: String,
  },
  gender:{
    type:string,

  },
    // AMCAT Exam Criteria
    amcatCriteria: {
      elqScore: {
        type: Number,
      },
      autometaScore: {
        type: Number,
      },
    },   

  // Salary Offered
  baseSalary: {
    type: Number,
    required: true,
  },
  bonuses: {
    type: Number,
  },
  allowances: {
    type: Number,
  },
  noOfRounds: {
    type: String,
    require: true,
  },
  nameOfRounds: {
    type: String,
    required: true,
  },
  detailsOfRounds: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Company", companySchema);
