const mongoose=require("monngoose");
const profileSchema=new mongoose.Schema({
    middleName: {
        type: String,
        required: true,
        trim: true,
      },
      branch: {
        type: String,
        required: true,
        trim: true,
      },
      prnNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      tenthPercentAttachment: {
        type: String,
        required: true,
      },
      twelfthPercentAttachment: {
        type: String,
        required: true,
      },
      aggregateCGPAAttachment: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      disability: {
        required: true,
        type: String,
      }, 
      amcat: {
        elqScore: {
          required: true,
          type: Number,
        },
        autometaScore: {
          required: true,
          type: Number,
        },
      },
      dateOfBirth:{
        type:Date,
        required: true,
    },
    linkedInProfile: {
        type: String,
        trim: true,
        required: true,
    },
    passportAttachment: {
        type: String,
    },
    profilePhoto: {
        required: true,
        type: String,
    },
    aadharNo: {
        type: String,
        required: true,
        unique: true,
    },
    panCard:{
        type: String,
        unique: true,
    },
    contactNumber:{
      type:Number,
      required:true,
      trim:true,
    },
    resume:{
      type:String,
      reauired:true,
    }
})
module.exports=mongoose.Schema("Profile",profileSchema);