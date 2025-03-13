const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product.category.model");
const filterButtonsHelper = require("../../helpers/filterButtons");
const objectSearch = require("../../helpers/search");
const objectPaginationHelper = require("../../helpers/pagination");
const prefixAdmin = require("../../config/system");
const createTree = require("../../helpers/createTree");
const Account = require("../../models/account.model");
//[GET] /admin/products
module.exports.index = async (req, res) => {
   
    const filterButtons = filterButtonsHelper(req.query);
    let find = {
        deleted: false,
    }

    //cac keyword deu phai them database
    if(req.query.status) {
        find.status = req.query.status;
    }
    //search
    const searchKeyword = objectSearch(req.query);

    if(searchKeyword.regex) {
        find.title = searchKeyword.regex;
    }
    //end search

    //pagination
    const countProduct = await Product.countDocuments(find);

    const pagination = {
        page: 1,
        limit: 4
    }

    const objectPagination = objectPaginationHelper(
       pagination,
       req.query,
       countProduct
    )

    //sort
    const sortItem = {}
    if(req.query.sortKey && req.query.sortMethod) {
        sortItem[req.query.sortKey] = req.query.sortMethod;
    } else {
        sortItem.position = "desc";
    }
    //limit/skip
    const products = await Product.find(find)
                    .sort(sortItem)
                    .limit(objectPagination.limit)
                    .skip(objectPagination.skip);

    for(const product of products) {
        const user = await Account.findOne({_id: product.createdBy.account_id});
        if(user){
            product.accountFullName = user.fullName
        }
    }
    //Chỉ có for Of với map mới thay đổi được 1 object 
    res.render("admin/pages/product/index", {
        pageTitle: "Dashboard page",
        products: products,
        filterButtons: filterButtons,
        keyword: searchKeyword.keyword,
        pagination: objectPagination
    });
}

///[PATCH] admin/product/change-status/active/123
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status});
    req.flash('success', 'Sản phẩm đã được cập nhật');
    res.redirect("back");
}

//[PATCH] admin/product/change-multi/active/123
module.exports.changeAll = async (req, res) => {
    const type = req.body.type;
    const id = (req.body.ids).split(", ");
    if(req.body.ids) {
        switch (type) {
            case "active":
                await Product.updateMany({"_id": id}, {"$set":{"status": "active"}});
                req.flash('success', ` ${id.length} sản phẩm đã được cập nhật`);
                break;
            case "inactive":
                await Product.updateMany({"_id": id}, {"$set":{"status": "inactive"}});
                req.flash('success', ` ${id.length} sản phẩm đã được cập nhật`);
                break;
            case "delete-all":
                await Product.updateMany({"_id": id}, {"$set":{"deleted": true, "deletedBy": {"account_id": res.locals.user.id, "deleteAt": new Date()}}})
                req.flash('success', ` ${id.length} sản phẩm đã được xóa`);
                break;
            case "change-position":
                for(item of id) {
                    [idItem, position] = item.split("-");
                    await Product.updateOne({_id: idItem}, {position: parseInt(position)});
                }
                break;
            default:
                break;
        }
    }
    
    res.redirect("back");
}

//[DELETE] admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    if(id) {
        //await Product.deleteOne({ _id: id});
        await Product.updateOne(
            { _id: id}, 
            {
                deletedBy: {
                    account_id: res.locals.user.id,
                    deleteAt: new Date()
                },
                deleted: true
            },
        );
    }
    req.flash('success', ` Một sản phẩm đã được xóa`);
    res.redirect("back");
}

module.exports.create = async (req, res) => {
    const productCategory = await ProductCategory.find({deleted: false});
    const tree = createTree.tree(productCategory);

    res.render(`admin/pages/product/create`, {
        productCategory: tree
    })
}

module.exports.createItem = async (req, res) => {
    if(req.body.position =="") {
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    } else {
       req.body.position = parseInt(req.body.position);
    }

    req.body.createdBy = {
        account_id: res.locals.user.id
    }
    const product = new Product(req.body);
    await product.save();
    req.flash('success', `Sản phẩm đã được thêm`);
    res.redirect(`${prefixAdmin.prefixAdmin}/product`);
}
//[GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
    const find = {
        _id: req.params.id,
        deleted: false
    }
    try {
        const product = await Product.findOne(find);
        const productCategory = await ProductCategory.find({deleted: false});
        const tree = createTree.tree(productCategory);
        res.render(`admin/pages/product/edit`, {
            products: product,
            productCategory: tree
        }) 
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm");
        res.redirect(`${prefixAdmin.prefixAdmin}/product`);
    }
}

//[PATCH] /admin/product/edit/:id
module.exports.editItem = async (req, res) => {
    try {
        const id = req.params.id
        await Product.updateOne({_id: id}, req.body);
        req.flash("success", "Chỉnh sửa thành công");
        res.redirect("back");
    } catch (error) {
        req.flash("error", "Không thể chỉnh sửa sản phẩm");
        res.redirect("back");
    }
}

module.exports.detail = async (req, res) => {
    const find = {
        _id: req.params.id,
        deleted: false
    }
    const product = await Product.findOne(find);
    const productCategory = await ProductCategory.findOne({_id: product.category_parent_id});
    if(productCategory) {
        product.categoryTitle = productCategory.title;
    }
    res.render("admin/pages/product/detail", {
        product: product,
    });
}