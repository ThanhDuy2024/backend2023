module.exports.createItem = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tên sản phẩm!");
        res.redirect("back");
        return;
    }

    if (req.body.title.length < 4) {
        req.flash("error", "Vui lòng nhập tên sản phẩm lớn hơn 4 ký tự!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.accounts = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập tên!");
        res.redirect("back");
        return;
    }

    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập password!");
        res.redirect("back");
        return;
    }


    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("back");
        return;
    }

    if (req.body.fullName.length < 4) {
        req.flash("error", "Vui lòng nhập tên dài hơn 4 ký tự!");
        res.redirect("back");
        return;
    }
    next();
}

module.exports.accountsEdit = (req, res, next) => {
    if(!req.body.fullName) {
        req.flash("error", "Họ và tên không được bỏ trống")
        res.redirect("back");
        return;
    }

    if(!req.body.email) {
        req.flash("error", "Email không được bỏ trống")
        res.redirect("back");
        return;
    }

    next();

}