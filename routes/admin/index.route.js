const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const prefixAdmin = require("../../config/system");
module.exports = (app) => {
    app.use(prefixAdmin.prefixAdmin + "/dashboard", dashboardRoute);
    app.use(prefixAdmin.prefixAdmin + "/product", productRoute);
}