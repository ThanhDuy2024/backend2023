const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const prefixAdmin = require("../../config/system");
module.exports = (app) => {
    app.use(prefixAdmin.prefixAdmin + "/dashboard", dashboardRoute);
    app.use(prefixAdmin.prefixAdmin + "/product", productRoute);
    app.use(prefixAdmin.prefixAdmin + "/product-category", productCategoryRoute);
}