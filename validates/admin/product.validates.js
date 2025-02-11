module.exports.createItem = (req, res, next) => {
    if(!req.body.title) {
        req.flash("error", "Vui lòng nhập tên sản phẩm!");
        res.redirect("back");
        return;
    }

    if(req.body.title.length < 4) {
        req.flash("error", "Vui lòng nhập tên sản phẩm lớn hơn 4 ký tự!");
        res.redirect("back");
        return;
    }

    next();
}