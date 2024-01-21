const mongoose = require("mongoose");
const appliedCompanySchema = new mongoose.Schema({
  nameOfCompany: {
    type: String,
  },
  status: {
		type: String,
		enum: ["Selcted", "Rejected","inQueue"],
	},
});
