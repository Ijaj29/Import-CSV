const Srv = require("../Services/srv");

const userCtrl = {
  getAllUser: async (req, res) => {
    try {
      const userInfo = await Srv.getAllUser();
      if (userInfo) {
        res.send(userInfo);
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};

module.exports = userCtrl;
