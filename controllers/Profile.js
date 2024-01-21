const mongoose = require("mongoose")
const Profile = require("../models/Profile")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageuploader")
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.updateProfile = async (req, res) => {
    try {
      const {dateOfBirth,contactNumber,gender,panCard, aadharNo,passportAttachment,linkedInProfile,amcat,disability,aggregateCGPAAttachment,twelfthPercentAttachment,tenthPercentAttachment,prnNumber,branch,middleName} = req.body
      const id = req.user.id
  
      // Find the profile by id
      const userDetails = await User.findById(id)
      const profile = await Profile.findById(userDetails.additionalDetails)
  
      const user = await User.findByIdAndUpdate(id, { dateOfBirth,contactNumber,gender,panCard, aadharNo,passportAttachment,linkedInProfile,amcat,disability,aggregateCGPAAttachment,twelfthPercentAttachment,tenthPercentAttachment,prnNumber,branch,middleName })
        
      await user.save()
  
      // Update the profile fields
      profile.dateOfBirth = dateOfBirth
      profile.contactNumber = contactNumber
      profile.gender = gender
      profile.panCard=panCard
      profile.aadharNo
      profile.passportAttachment=passportAttachment
      profile.linkedInProfile=linkedInProfile
      profile.amcat=amcat
      profile.disability=disability
      profile.aggregateCGPAAttachment=aggregateCGPAAttachment
      profile.twelfthPercentAttachment=twelfthPercentAttachment
      profile.tenthPercentAttachment=tenthPercentAttachment
      profile.prnNumber=prnNumber
      profile.branch=branch
      profile.middleName=middleName
  
      await profile.save()                                     // Save the updated profile
  
      // Find the updated user details
      const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()
        
      return res.json({
        success: true,
        message: "Profile updated successfully",
        updatedUserDetails,
      })
    } 
    catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }

  exports.getAllUserDetails = async (req, res) => {
    try {
      const id = req.user.id
      const userDetails = await User.findById(id).populate("additionalDetails").exec()
         
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      })
    } 
    catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  

  