module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "vui lòng ko để trống ô tiêu đề");
        res.redirect("back");
        return;
    }    if (!req.body.title.length  > 5) {
        req.flash("error", "vui lòng nhập ít nhất 5 kí tự");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    next();
}