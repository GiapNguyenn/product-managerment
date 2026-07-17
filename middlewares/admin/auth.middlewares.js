const Account = require("../../model/account.model")
const systemConfig = require("../../config/system");
module.exports.requireAuth = async (req , res , next) => {

    if(!req.cookies.token) {
        res.redirect(systemConfig.perfixAdmin + "/auth/login");
    }else {
        const user = await Account.findOne({ token : req.cookies.token})
        if(!user){
            res.redirect(systemConfig.perfixAdmin + "/auth/login");
        }else {
            next();
        }
    }
}