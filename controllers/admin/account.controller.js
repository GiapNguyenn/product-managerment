const Account = require("../../model/account.model")
const md5 = require("md5")
const systemConfig = require("../../config/system");
const Role = require("../../model/role.model")

// [GET] /admin/accounts
module.exports.index = async (req , res) => {
    let find = {
        deleted : false ,
    };
    const records = await Account.find(find).select("-password -token");
    for (const record of records) {
        const role = await Role.findOne({
            _id : record.role_id,
            deleted : false
        });
        record.role = role ;
    }
    res.render(`admin/pages/accounts/index`, {
        records : records
    })
}
// [GET] /admin/accounts/create
module.exports.create = async (req , res) => {
    const roles = await Role.find({deleted : false});
    res.render(`admin/pages/accounts/create`, {
     pageTitle : "tạo mới tài khoản",
     roles : roles
    })
}
// [POST] /admin/accounts/create
module.exports.createPost = async (req , res) => {
    const emailExist = await Account.findOne({
        email : req.body.email,
        deleted : false
    });
    console.log(emailExist)
    if(emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        res.redirect("back");
        return;
    } else {
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect(systemConfig.perfixAdmin + "/accounts");
    }

}
// [GET]/admin/accounts/edit/:id 
module.exports.edit = async (req , res) => {
    let find = {
        _id : req.params.id ,
        deleted : false 
    }
    try {
        const data = await Account.findOne(find);
        const roles = await Role.find({deleted : false});
        res.render("admin/pages/accounts/edit" , {
            data : data ,
            roles : roles
        });
    }
    catch (error) {
        res.redirect(`/${systemConfig.perfixAdmin}/accounts`)
    }
};
// [PATCH]/admin/accounts/edit/:id 
module.exports.editPatch = async (req , res) => {
    const id = req.params.id
    console.log(id)

    const emailExist = await Account.findOne({
        _id : { $ne : id} , // $ne là ko bằng id này nghĩ là tìm các bảng ghi ko phải là id này
        email : req.body.email,
        deleted : false
    });
    if(emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        return res.redirect("back");
    }else {
        if(req.body.password) {
        req.body.password =md5(req.body.password)
        }
        else {
            delete req.body.password;
        }
       const result = await Account.updateOne({ _id : id } , req.body)
       console.log(result);
    }
    return res.redirect(`back`)
    // return res.redirect(`${systemConfig.perfixAdmin}/accounts`)
}