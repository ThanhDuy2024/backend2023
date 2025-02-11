//[GET] /product

const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});

    products.forEach(item => {
        item.newPrice = ((item.price*(100 - item.discountPercentage)) / 100).toFixed(2);
    });
    res.render("client/pages/products/index", {
        pageTitle: "Product page",
        products: products
    });
}