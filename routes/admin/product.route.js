const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer = require('multer');

const cloudinary = require('cloudinary').v2
const cloud = require("../../middleware/cloudinary");
const storage = multer.memoryStorage();

const validate = require("../../validates/admin/product.validates");
const upload = multer({ storage })

require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeAll);

route.delete("/delete/:id", controller.deleteItem);

route.get("/create", controller.create);
route.post("/create", upload.single('thumbnail'), cloud.cloud ,validate.createItem, controller.createItem);

route.get("/edit/:id", controller.edit);
route.patch("/edit/:id", upload.single('thumbnail'), cloud.cloud, validate.createItem, controller.editItem);

route.get("/detail/:id", controller.detail);
module.exports = route;