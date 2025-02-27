const md5 = require('md5');
const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const randomToken = require('../../helpers/generateString');
const prefix = require('../../config/system');
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }
    const account = await Account.find(find).select("-password -token").exec();
    const role = await Role.find(find);
    for(const item in role) {
        for(const i in account) {
            if(account[i].role_id == role[item]._id) {
                account[i].role = role[item].title;
            }
        }
    }
    res.render("admin/pages/account/index", {
        accounts: account,
        role: role,
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