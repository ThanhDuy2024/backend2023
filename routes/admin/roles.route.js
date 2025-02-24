const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/role.controller");

route.get("/", controller.index);

route.get("/create", controller.create);
route.post("/create", controller.createItem)

route.get("/edit/:id", controller.edit);
route.patch("/edit/:id", controller.editItem);

route.get("/detail/:id", controller.detail);
module.exports = route