const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const {
  updateProfile,
  getAllUserDetails,
  getEnrolledCourses,

} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)


module.exports = router
