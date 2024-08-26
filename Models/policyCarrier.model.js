const mongoose = require("mongoose");

const policyCarrierSchema = new mongoose.Schema(
  {
    company_name: {
      type: "String",
    },
  },
  { timestamps: true }
);

const policyCarrierModel = mongoose.model("policycarrier", policyCarrierSchema);

module.exports = policyCarrierModel;
