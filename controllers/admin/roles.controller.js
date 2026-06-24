const Role = require("../../model/role.model")
const systemConfig = require("../../config/system");
const { param } = require("../../routers/admin/roles.route");


// [GET] /admin/roles
module.exports.index= async (req, res) => {
  let find = {
    deleted : false
  }
  const records = await Role.find(find);
  res.render("./admin/pages/roles/index.pug",{
    pageTitle:"Trang phân quyền",
    records : records
  })
}
// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("./admin/pages/roles/create.pug",{
    pageTitle:"Tạo nhóm quyền",
  })
}
// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    console.log(req.body)
   const record = Role(req.body);
   await record.save();
   res.redirect(`${systemConfig.perfixAdmin}/roles`)
}
// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
      const id = req.params.id;
      let find = {
        _id : id,
        deleted : false
      };
      const data = await Role.findOne(find);
        res.render("./admin/pages/roles/edit.pug",{
        pageTitle:"Sửa nhóm quyền",
        data : data
      })
    }
    catch (error) {
      res.redirect(`${systemConfig.perfixAdmin}/roles`)
    }
}
// [PATCH] /admin/roles/edit/:id 
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const data =await Role.updateOne({_id: id}, req.body)
    res.redirect(`${systemConfig.perfixAdmin}/roles`)

}
// [Get] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted : false
  }
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle : "phân quyền",
    records : records
  })
}
// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try{
    const permissions = JSON.parse(req.body.permissions)
    console.log(permissions)
    for (const item of permissions) {
      await Role.updateOne({ _id: item.id }, {permissions : item.permissions })
    }
    req.flash( "success","cập nhật quyền thành công!")
    res.redirect("back")
  }
  catch {
    req.flash("error" , " cập nhật quyền ko thành công ")
  }
}
// 1h32p10s  bài 21 tiếp theo 

