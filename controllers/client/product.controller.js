const Product = require ("../../model/product.model")
// [GET] /products
module.exports.index= async (req, res) => {
  const products = await Product.find({
    status:"active",
    deleted : false
  });
  //loc qua tu phan tu tehm priceNew va gan cho no gia tri logic
  const productNew=products.map(item=> {
    item.priceNew = (item.price *(100 -item.discountPercentage)/100).toFixed(0); //ham toFixed(0) la khong lam tron dau thap phan 
    return item
  });
  console.log(productNew)
  res.render("client/pages/products/index.pug",{
    pageTitle:"Trang sản phẩm",
    products : productNew
  })
}