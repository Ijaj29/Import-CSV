const agentModel = require("../Models/agent.model");
const policyInfoModel = require("../Models/policyInfo.model");
const userModel = require("../Models/user.model");

const Srv = {
  getAllUser: () => {
    return userModel.find();
  },

  getOne: (id) => {
    return agentModel.findById(id);
  },

  getPolicyInfo: (firstname) => {
    return policyInfoModel.findOne({ firstname });
  },

};

module.exports = Srv;
