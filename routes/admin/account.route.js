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

router.delete("/delete/:id", controller.deleteItem);

router.patch("/change-status/:id/:status", controller.changeStatus);

router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single("avatar"), cloud.cloud, validate.accountsEdit, controller.editItem);
module.exports = router;