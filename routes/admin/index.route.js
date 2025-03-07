const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const rolesRoute = require("./roles.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route")
const authMiddleware = require("../../middleware/auth.middleware")
const prefixAdmin = require("../../config/system");
module.exports = (app) => {
    app.use(prefixAdmin.prefixAdmin + "/dashboard", authMiddleware.require, dashboardRoute);
    app.use(prefixAdmin.prefixAdmin + "/product", authMiddleware.require, productRoute);
    app.use(prefixAdmin.prefixAdmin + "/product-category", authMiddleware.require, productCategoryRoute);
    app.use(prefixAdmin.prefixAdmin + "/roles", authMiddleware.require, rolesRoute);
    app.use(prefixAdmin.prefixAdmin + "/accounts", authMiddleware.require, accountRoute);
    app.use(prefixAdmin.prefixAdmin + "/auth", authRoute);
}