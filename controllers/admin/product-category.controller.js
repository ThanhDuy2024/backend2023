const ProductCategory = require("../../models/product.category.model");
const adminURL = require("../../config/system");
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }
    const productCategory = await ProductCategory.find(find);
    res.render("admin/pages/product-category/index", {
        productCategory: productCategory
    });
}


module.exports.create = async (req, res) => {
    res.render("admin/pages/product-category/create");
}

module.exports.createItem = async (req, res) => {
    try {
        if(req.body.position) {
            const productCategory = new ProductCategory(req.body);
            await productCategory.save();
        } else {
            const countProduct = await ProductCategory.countDocuments();
            req.body.position = countProduct + 1;
            const productCategory = new ProductCategory(req.body);
            await productCategory.save();
        }
        req.flash('success', 'Thêm sản phẩm thành công');
        res.redirect(`${adminURL.prefixAdmin}/product-category`);
    } catch (error) {
        console.log(error);
    }
}