const ProductCategory = require("../../model/products-category.model")
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus")
const createTreeHelper = require("../../helpers/createTree")
// [GET] /admin/product-category 
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted : false,
    }
    if (req.query.status) {
    find.status = req.query.status
  }
    const records = await ProductCategory.find(find)
    const newRecords = createTreeHelper.Tree(records)
    res.render("admin/pages/products-category/index" , {
        pageTitle : "Danh mục sản phẩm",
        records : newRecords,
        filterStatus: filterStatus
    });
}
//[Patch]/admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await ProductCategory.updateOne({ _id: id }, { status: status });
  req.flash('success', 'Cập nhật trạng thái thành công ');
  res.redirect("back");

}
// [GET] /admin/products-category/create 
module.exports.create = async (req, res) => {
    let find = {
        deleted : false
    };
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.Tree(records)
    console.log(newRecords)
    res.render("admin/pages/products-category/create" , {
        pageTitle : "Thêm mới danh mục sản phẩm",
        records : newRecords
    });
}
// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
 if(req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1 ;
 }else {
    req.body.position = parseInt(req.body.position) ;
 }
 const record = new ProductCategory(req.body);
 await record.save();
 res.redirect(`${systemConfig.perfixAdmin}/products-category`) ;
}
// 1h30p bai 20 tt 