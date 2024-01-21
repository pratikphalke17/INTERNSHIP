const mongoose = require("mongoose");
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );
    console.log(
      "Email sent successfully: ",
      mailResponse ? mailResponse.response : "No response received"
    );
  } catch (error) {
    console.log("Error occurred while sending email: ", error.message || error);
    throw error;
  }
}
OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database");

  if (this.isNew) {
    try {
      await sendVerificationEmail(this.email, this.otp);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
