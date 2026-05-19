const Product = require("../../model/product.model")

const filterStatusHelper= require("../../helpers/filterStatus")
const searchHelper= require("../../helpers/search")
const paginationHelper= require("../../helpers/pagination")
const { render } = require("pug")
// [GET] /admin/products
module.exports.products= async (req, res) => {
  const filterStatus =filterStatusHelper(req.query)
  console.log(filterStatus)
  // console.log(req.query.status)
  let find = {
    deleted:false,
  }
  if(req.query.status){
    find.status = req.query.status
  }
  //tim kiem
  const objectSearch = searchHelper(req.query);
  
  if(objectSearch.keyword){
    find.title =objectSearch.regex;
  }
  
  // end tiem kiem 
  
  // console.log(products)

  //phan trang 
  const countProduct = await Product.countDocuments(find) //truy vấn trong database dùng asyn await
  let objectPagination = paginationHelper(
    {
    currentPage : 1,
    limitItems : 4
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
  //end phan trang
  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
  res.render("./admin/pages/products/index.pug",{
    pageTitle:"Danh sách sản phẩm",
    products:products,
    filterStatus:filterStatus,
    keyword : objectSearch.keyword,
    pagination : objectPagination
  })
}
//[Patch]/admin/product/change-status/:status/:id
module.exports.changeStatus = async (req ,res) => {
  const status = req.params.status
  const id = req.params.id
  await Product.updateOne({ _id : id},{status : status})
  res.redirect("back")
  
}
//[Patch]/admin/product/products/change-multi
module.exports.changeMulti = async (req ,res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id : {$in : ids }} , {status : "active"});
      break;
    case "inactive":
      await Product.updateMany({ _id : {$in : ids }} , {status : "inactive"});
      break;
    default:
      break;
  }
   res.redirect("back")
};    
  
