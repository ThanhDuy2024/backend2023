const express = require('express');
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cloud = require("../../middleware/cloudinary");
const validate = require("../../validates/admin/product.validates");

const controller = require('../../controllers/admin/account.controller');

router.get("/", controller.index);

router.get("/create", controller.create);
router.post("/create", upload.single("avatar"), cloud.cloud, validate.accounts, controller.createItem);
module.exports = router;