module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "vui lòng ko để trống ô tiêu đề");
        res.redirect("back");
        return;
    }    if (!req.body.title.length  < 8) {
        req.flash("error", "vui lòng nhập ít nhất 8 kí tự");
        res.redirect("back");
        return;
    }
    next();
}