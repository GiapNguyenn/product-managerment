const Product = require("../../model/product.model")
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const { render } = require("pug")
// [GET] /admin/products
module.exports.products = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query)
  console.log(filterStatus)
  // console.log(req.query.status)
  let find = {
    deleted: false,
  }
  if (req.query.status) {
    find.status = req.query.status
  }
  //tim kiem
  const objectSearch = searchHelper(req.query);

  if (objectSearch.keyword) {
    find.title = objectSearch.regex;
  }

  // end tiem kiem 

  // console.log(products)

  //phan trang 
  const countProduct = await Product.countDocuments(find) //truy vấn trong database dùng asyn await

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countProduct
  )

  // if(req.query.page){
  //   objectPagination.currentPage =parseInt(req.query.page);
  // }
  // objectPagination.skip = (objectPagination.currentPage -1) * objectPagination.limitItems
  // console.log(objectPagination.currentPage) //trang hiện tại
  // const countProduct = await Product.countDocuments(find) //truy vấn trong database dùng asyn await
  // const totalPage = Math.ceil(countProduct/objectPagination.limitItems);
  // console.log(totalPage)
  // objectPagination.totalPage = totalPage

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("./admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  })
}
//end phan trang

//[Patch]/admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash('success', 'Cập nhật trạng thái thành công ');
  res.redirect("back");

}
//[Patch]/admin/product/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} bảng ghi`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} bảng ghi`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
      req.flash('success', `Cập nhật trạng thái đã xoá thành công cho ${ids.length} bảng ghi`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        const posion = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position })
      }
      req.flash('success', `Cập nhật vị trí thành công cho ${ids.length} bảng ghi`);
      break;
    default:
      break;
  }
  res.redirect("back")
};
// [delete] /admin/product/delete/:id 
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // await Product.deleteOne({ _id : id});
  await Product.updateOne({ _id: id },
    {
      deleted: true,
      deletedAt: new Date()
    }

  )
  req.flash('success', `Cập nhật trạng thái đã xoá thành công `);
  res.redirect("back");
}
// [GET] /admin/product/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  })
}
// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.perfixAdmin}/products`)
}
// [GET] /admin/product/edit/:id 
module.exports.edit = async (req, res) => {
  try {
    console.log(req.params.id);
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/products/edit", {
      pageTitle: "chỉnh sửa sản phẩm ",
      product: product
    })
  } catch (error) {
    req.flash("error", "Không tìm thấy sản phẩm");
    res.redirect(`${systemConfig.perfixAdmin}/products`)
  }
}
// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
  }
  catch (error) {
    req.flash("error", "Có lỗi xảy ra khi cập nhật sản phẩm");
  }
  res.redirect("back")
};
//[GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted : false,
      _id : req.params.id
    }
    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/products/detail", {
      pageTitle : product.title,
      product : product
    })
  } catch (error) {
    req.flash("error", "Không tìm thấy sản phẩm");
    res.redirect(`${systemConfig.perfixAdmin}/products`)
  }
}



