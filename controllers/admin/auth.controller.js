const Account = require("../../models/account.model");
const md5 = require("md5");
const configAdim = require("../../config/system")

//[GET] /admin/auth/login
module.exports.login = (req, res) => {
    res.render("admin/pages/account/auth");
}


//[POST] /admin/auth/login
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
        res.cookie("token", Login.token);
    } else {
        req.flash("error", "Tài khoản hoặc mật khẩu không đúng");
        res.redirect(`${configAdim.prefixAdmin}/auth/login`);
        return;
    }

    req.flash("success", "Đăng nhập thành công")
    res.redirect(`${configAdim.prefixAdmin}/dashboard`);
}

//[GET] /admin/auth/Logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`${configAdim.prefixAdmin}/auth/login`);
}
