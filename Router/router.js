const express = require("express");
const agentCtrl = require("../Controller/agent.ctrl");
const userCtrl = require("../Controller/user.ctrl");
const fileUpload = require("../Services/multer");
const policyInfoCtrl = require("../Controller/policyInfo.ctrl");

const router = express.Router();

router.post("/", fileUpload.single("File"), agentCtrl.addAgent);
router.get("/userlist", userCtrl.getAllUser);
router.get("/single/policyInfo/:firstname", policyInfoCtrl.getUserWisePolicyInfo);

module.exports = router;
