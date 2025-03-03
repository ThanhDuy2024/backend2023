const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller");
// const validate = require("../../validates/admin/")
router.get("/login", controller.login);
router.post("/login", controller.loginItem)
module.exports = router;

