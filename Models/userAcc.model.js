const mongoose = require("mongoose");

const userAccSchema = new mongoose.Schema(
  {
    account_name: {
      type: "String",
    },
  },
  { timestamps: true }
);

const userAccModel = mongoose.model("useracc", userAccSchema);

module.exports = userAccModel;
