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

module.exports.detail = async (req, res) => {
    const find = {
        slug: req.params.slug,
        status: "active",
        deleted: false
    }

    const product = await Product.findOne(find);

    if(product.discountPercentage) {
        product.newPrice = ((product.price*(100 - product.discountPercentage)) / 100).toFixed(2);
    } else {
        product.newPrice = product.price;
    }
    res.render("client/pages/products/detail", {
        product: product
    })
}