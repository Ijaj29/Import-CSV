const Srv = require("../Services/srv");

const policyInfoCtrl = {
  getUserWisePolicyInfo: async (req, res) => {
    console.log("req :", req.params);
    try {
      const policyInfoInfo = await Srv.getPolicyInfo(req.params.firstname);
      console.log('policyInfoInfo :', policyInfoInfo);
      if (policyInfoInfo) {
        console.log("Internal :", req.params);
        res.send({
          data: policyInfoInfo
        });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};

module.exports = policyInfoCtrl;
