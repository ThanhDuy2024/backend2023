const express = require("express");
const route = express.Router();

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({storage});
const controller = require("../../controllers/admin/product-category.controller");
const cloud = require("../../middleware/cloudinary");
const validate = require("../../validates/admin/product.validates");

route.get("/", controller.index);

route.get("/create", controller.create);

route.post("/create", upload.single("thumbnail"), cloud.cloud, validate.createItem ,controller.createItem);
module.exports = route;