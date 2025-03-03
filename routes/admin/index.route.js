const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const rolesRoute = require("./roles.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route")
const prefixAdmin = require("../../config/system");
module.exports = (app) => {
    app.use(prefixAdmin.prefixAdmin + "/dashboard", dashboardRoute);
    app.use(prefixAdmin.prefixAdmin + "/product", productRoute);
    app.use(prefixAdmin.prefixAdmin + "/product-category", productCategoryRoute);
    app.use(prefixAdmin.prefixAdmin + "/roles", rolesRoute);
    app.use(prefixAdmin.prefixAdmin + "/accounts", accountRoute);
    app.use(prefixAdmin.prefixAdmin + "/auth", authRoute);
}