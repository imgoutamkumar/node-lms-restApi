const express = require("express");
const { userDetailsById } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/details/:id", verifyToken, userDetailsById);

module.exports = router; //defalut export
