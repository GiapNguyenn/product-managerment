const md5 = require("md5");
const Account = require("../../model/account.model")
const systemConfig = require("../../config/system");
// [GET]/admin/login 
module.exports.login = ( req , res ) => {
    res.render("admin/pages/auth/index.pug" , {
        pageTitle : "Trang đăng nhập"
    })
}
// [POST]/admin/login 
module.exports.loginPost = async ( req , res ) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email : email,
        deleted : false
    })
    if(!user){
        req.flash("error", "email ko tồn tại")
        res.redirect("back")
        return
    }
    if(md5(password) != user.password) {
        req.flash("error", "mật khẩu ko chính xác")
        res.redirect("back")
        return
    }
    if(user.status != "active") {
        req.flash("error", "tài khoản ko hoạt động")
        res.redirect("back")
        return
    }
    res.cookie("token", user.token)
    res.redirect(`${systemConfig.perfixAdmin}/dashboard`)
}