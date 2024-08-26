const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    agent: {
      type: "String",
    },
  },
  { timestamps: true }
);

const agentModel = mongoose.model("agent", agentSchema);

module.exports = agentModel;
