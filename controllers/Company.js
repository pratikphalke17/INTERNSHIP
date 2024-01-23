const Company = require("../models/Company");
const User = require("../models/User");

// Function to create a new company
exports.createCompany = async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      nameOfCompany,
      description,
      roleDescription,
      jobLocation,
      twelfthCriteria,
      tenthCriteria,
      cgpa,
      backlog,
      disabilityCriteria,
      gender,
      amcatCriteria,
    } = req.body;

    // Check if any of the required fields are missing
    if (
      !nameOfCompany ||
      !description ||
      !roleDescription ||
      !jobLocation ||
      !twelfthCriteria ||
      !tenthCriteria ||
      !cgpa ||
      !backlog ||
      !disabilityCriteria ||
      !gender ||
      !amcatCriteria
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Mandatory" });
    }

    // Check if the user is an admin

    // Create a new company with the given details in DB;
    const newCompany = await Company.create({
      nameOfCompany,
      description,
      roleDescription,
      jobLocation,
      twelfthCriteria,
      tenthCriteria,
      cgpa,
      disabilityCriteria,
      gender,
      amcatCriteria,
      //   admin: adminDetails._id,                 TOdO
    });

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      { $push: { Company: newCompany._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newCompany,
      message: "Company Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create company",
      error: error.message,
    });
  }
};

// Edit Company Details
exports.editCompanyDetails = async (req, res) => {
  try {
    const { companyId } = req.body;
    //   const updates = req.body
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Update only the fields that are present in the request body
    const updated = await User.findByIdAndUpdate(companyId, {
      nameOfCompany,
      description,
      roleDescription,
      jobLocation,
      twelfthCriteria,
      tenthCriteria,
      cgpa,
      backlog,
      disabilityCriteria,
      gender,
      amcatCriteria,
    });

    // Update the profile fields
    company.nameOfCompany = nameOfCompany;
    company.description = description;
    company.roleDescription = roleDescription;
    company.jobLocation = jobLocation;
    company.twelfthCriteria = twelfthCriteria;
    company.tenthCriteria = tenthCriteria;
    company.cgpa = cgpa;
    company.backlog = backlog;
    company.disability = disability;
    company.disabilityCriteria = disabilityCriteria;
    company.gender = gender;
    company.amcatCriteria = amcatCriteria;

    await company.save(); // Save the updated company details

    return res.json({
      success: true,
      message: "company updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get Company List
exports.getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      data: allCompanies,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Company Data`,
      error: error.message,
    });
  }
};
