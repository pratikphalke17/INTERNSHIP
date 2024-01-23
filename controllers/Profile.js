const mongoose = require("mongoose")
const Profile = require("../models/Profile")
const User = require("../models/User")
// const Company=require("../controllers/Company")
// const { uploadImageToCloudinary } = require("../utils/imageuploader")
// const { convertSecondsToDuration } = require("../utils/secToDuration")

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
  
  // exports.deleteAccount = async (req, res) => {
  //   try {
  //     const id = req.user.id
  //     console.log(id)
  //     const user = await User.findById({ _id: id })
  //     if (!user) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "User not found",
  //       })
  //     }
  //     // Delete Assosiated Profile with the User
  //     await Profile.findByIdAndDelete({
  //       _id: new mongoose.Types.ObjectId(user.additionalDetails),
  //     })
  //     for (const companyId of user.company) {
  //       await Company.findByIdAndUpdate(
  //         companyId,
  //         { $pull: { studentsEnroled: id } },
  //         { new: true }
  //       )
  //     }
  //     // Now Delete User
  //     await User.findByIdAndDelete({ _id: id })
  //     res.status(200).json({
  //       success: true,
  //       message: "User deleted successfully",
  //     })
      
  //   } catch (error) {
  //     console.log(error)
  //     res
  //       .status(500)
  //       .json({ success: false, message: "User Cannot be deleted successfully" })
  //   }
  // }
  

  exports.getEnrolledCompanies = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      }).populate({
          path: "companiesApplied",
        }).exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }