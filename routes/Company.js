// Import the required modules
const express = require("express")
const router = express.Router()

// Company Controllers Import
const {
  createCompany,
  editCompanyDetails,
  getAllCompanies,
  deleteCompany,
} = require("../controllers/Company")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

// ********************************************************************************************************
//                                      Company routes
// ********************************************************************************************************

// Company can Only be Created by Instructors
router.post("/createCompany", auth, isInstructor, createCompany)
// Edit Company routes
router.post("/editCompanyDetails", auth, isInstructor, editCompanyDetails)

// Get all Registered Courses
router.get("/getAllCompanies", getAllCompanies)

// // Get Details for a Specific Courses
// router.post("/getCourseDetails", getCourseDetails)

// // Get Details for a Specific Courses
// router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// Delete a Course
router.delete("/deleteCompany",  auth, isInstructor,deleteCompany)


module.exports = router
