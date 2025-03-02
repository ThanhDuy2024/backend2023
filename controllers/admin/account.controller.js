const md5 = require('md5');
const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const randomToken = require('../../helpers/generateString');
const prefix = require('../../config/system');
const { accounts } = require('../../validates/admin/product.validates');
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }
    if(req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.fullName = regex
    }
    const account = await Account.find(find).select("-password -token").exec();

    for(const item in account) {
        const role = await Role.findOne({_id: account[item].role_id});
        account[item].role_title = role.title
    }
    // const role = await Role.find();


    // console.log(account);
    res.render("admin/pages/account/index", {
        accounts: account,
        // role: role,
        keyword: req.query.keyword
    });
}

//[GET] /admin/account/create   
module.exports.create = async (req, res) => {
    const find = {
        deleted: false,
    }
    const role = await Role.find(find);
    res.render("admin/pages/account/create", {
        role: role,
    });
}

//[POST] /admin/account/create
module.exports.createItem = async (req, res) => {
    try {
        if(req.body) {
            req.body.password = md5(req.body.password);
            req.body.token = randomToken.generateString(32);
        }
        
        const checkEmail = await Account.findOne({ email: req.body.email });
        if(checkEmail) {
            req.flash("error", "Email already exists");
            res.redirect(`${prefix.prefixAdmin}/accounts/create`);
        } else {
            const account = new Account(req.body);
            account.save();
            req.flash("success", "Create account successfully");
            res.redirect(`${prefix.prefixAdmin}/accounts`);
        }
    } catch (error) {
        res.send("Error: " + error);
    }
}

//[PATCH] /admin/account/delete/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const update = {
            deleted: true,
        }
        await Account.updateOne({ _id: id }, update);
        req.flash("success", "Delete account successfully");
        res.redirect(`${prefix.prefixAdmin}/accounts`);
    } catch (error) {   
        res.send("Error: " + error)
    }
}

//[PATCH] /admin/account/change-status/:id/:status

module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        const update = {
            status: status,
        }
        await Account.updateOne({_id: id}, update);
        req.flash("success", "Change status account successfully");
        res.redirect(`${prefix.prefixAdmin}/accounts`);
    } catch (error) {
        res.send("Error: " + error);
    }
}

//[GET] /admin/accounts/edit/:id

module.exports.edit =  async (req, res) => {
    const id = req.params.id
    const find = {
        deleted: false
    }
    const account = await Account.findOne( { _id: id }, { deleted: false } ).select("-password");
    const role = await Role.find(find);
    res.render("admin/pages/account/edit", {
        account: account,
        role: role
    });
}

//[PATCH] /admin/accouts/edit/:id
module.exports.editItem = async (req, res) => {
    const id = req.params.id;
    const emailExits = await Account.findOne({
        _id: {$ne: id}, // $ne = not equal
        email: req.body.email
    })

    if(emailExits) {
        req.flash("error", "Email has exited")
        res.redirect("back")
        return;
    } else {
        if(!req.body.password) {
            delete req.body.password;
        } else {
            req.body.password = md5(req.body.password);
        }
        await Account.updateOne({_id: id}, req.body);
        req.flash("success", "Update has completed");
    }
    res.redirect("back");
}