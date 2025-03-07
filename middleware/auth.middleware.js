const Account = require("../models/account.model")
const adminUrl = require("../config/system")
const Role = require("../models/role.model")
module.exports.require = async (req, res, next) => {
    if(req.cookies.token) {
        const account = await Account.findOne({token: req.cookies.token}).select("-password")
        if(account) {
            res.locals.user = account 
            const role = await Role.findOne({_id: account.role_id});
            res.locals.role = role
            next();
        } else {
            res.redirect(`${adminUrl.prefixAdmin}/auth/login`)
        }
    } else {
        res.redirect(`${adminUrl.prefixAdmin}/auth/login`)
    }
}