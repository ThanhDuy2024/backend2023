const configAdmin = require("../../config/system"); 
module.exports.login = (req, res, next) => {
    if(!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu")
        res.redirect(`${configAdmin.prefixAdmin}/auth/login`)
    }

    if(!req.body.email) {
        req.flash("error", "Vui lòng nhập email")
        res.redirect(`${configAdmin.prefixAdmin}/auth/login`);
    }

    next();
}
