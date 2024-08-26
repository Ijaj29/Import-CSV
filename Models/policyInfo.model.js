const mongoose = require("mongoose");

const policyInfoSchema = new mongoose.Schema(
  {
    policy_number: {
      type: String,
    },
    policy_start_date: {
      type: Date,
    },
    policy_end_date: {
      type: Date,
    },
    category_name: {
      type: String,
    },
    company_name: {
      type: String,
    },
    firstname: {
      type: String,
    },
  },
  { timestamps: true }
);

const policyInfoModel = mongoose.model("policyinfo", policyInfoSchema);

module.exports = policyInfoModel;
