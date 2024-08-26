const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: "String",
    },
    dob: {
      type: "String",
    },
    address: {
      type: "String",
    },
    phone: {
      type: "String",
    },
    city: {
      type: "String",
    },
    state: {
      type: "String",
    },
    zip: {
      type: "String",
    },
    email: {
      type: "String",
    },
    gender: {
      type: "String",
    },
    userType: {
      type: "String",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
