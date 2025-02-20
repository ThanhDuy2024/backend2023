const ProductCategory = require("../../models/product.category.model");
const adminURL = require("../../config/system");
const createTree = require("../../helpers/createTree");
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }

    const createTree = (arr, parent_id = "") => {
        const tree = [];
        arr.forEach(item => {
            if (item.parent_id === parent_id) {
                const newItem = item;
                const children = createTree(arr, item.id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree
    }

    const productCategory = await ProductCategory.find(find);
    const newProductCategory = createTree(productCategory);
    res.render("admin/pages/product-category/index", {
        productCategory: newProductCategory
    });
}


module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }

    const tree = createTree.tree
    const productCategory = await ProductCategory.find(find);
    const newProductCategory = tree(productCategory);
    res.render("admin/pages/product-category/create", {
        productCategory: newProductCategory
    });
}

module.exports.createItem = async (req, res) => {
    try {
        if (req.body.position) {
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

module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const category = await ProductCategory.findOne({_id: id});

    const find = {
        deleted: false
    }
    const tree = createTree.tree
    const productCategory = await ProductCategory.find(find);
    const newProductCategory = tree(productCategory);
    res.render("admin/pages/product-category/edit",{
        category: category,
        productCategory: newProductCategory
    });
}

module.exports.editItem = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        await ProductCategory.updateOne({_id: id}, body);
        req.flash('success', 'Sửa sản phẩm thành công');
        res.redirect(`${adminURL.prefixAdmin}/product-category`);
    } catch (error) {
        req.flash('error', 'Sửa sản phẩm thất bại');
        res.redirect("back");
    }
}