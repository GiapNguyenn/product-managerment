const ProductCategory = require("../../model/products-category.model")
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus")
const createTreeHelper = require("../../helpers/createTree")
const { json } = require("body-parser")
// [GET] /admin/product-category 
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false,
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    const records = await ProductCategory.find(find)
    const newRecords = createTreeHelper.Tree(records)
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords,
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
        deleted: false
    };
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.Tree(records)
    console.log(newRecords)
    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        records: newRecords
    });
}
// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.perfixAdmin}/products-category`);
}
// [GET] /admin/products-category/edit/:id 
module.exports.edit = async (req, res) => {
    try {
    const id = req.params.id;
    const data = await ProductCategory.findOne({
        _id: id,
        deleted: false
    })
    const records = await ProductCategory.find({
        deleted: false
    });
    const newRecords = createTreeHelper.Tree(records)
    res.render("admin/pages/products-category/edit", {
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        data: data,
        records: newRecords
    });
    }
    catch {
        res.redirect(`${systemConfig.perfixAdmin}/products-category`)
    }
}
// [PATCH] /admin/products-category/edit/:id 
module.exports.editPatch = async (req, res) => {
   try {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position)
    await ProductCategory.updateOne({_id: id}, req.body)
    res.redirect(`${systemConfig.perfixAdmin}/products-category`)
   } catch (error) {
    res.send("lỗi")
   }
}
