const Account = require("../../models/account.model");
const md5 = require("md5");
const configAdim = require("../../config/system")

module.exports.login = (req, res) => {
    res.render("admin/pages/account/auth");
}

module.exports.loginItem = async (req, res) => {
    const Login = await Account.findOne({
        email: req.body.email
    });

    if(Login) {
        if(md5(req.body.password) != Login.password) {
            req.flash("error", "Tài khoản hoặc mật khẩu không đúng");
            res.redirect(`${configAdim.prefixAdmin}/auth/login`);
            return;
        }
    } else {
        req.flash("error", "Tài khoản hoặc mật khẩu không đúng");
        res.redirect(`${configAdim.prefixAdmin}/auth/login`);
        return;
    }

    req.flash("success", "Đăng nhập thành công")
    res.redirect(`${configAdim.prefixAdmin}/dashboard`);
}
