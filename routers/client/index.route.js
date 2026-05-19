//nhúng hàm product.router.js vào
const productRoutes = require("./product.route")
const homeRoute = require("./home.route")
// sử dùng hàm module.exports gọi 
module.exports = (app) => {
  app.use('/', homeRoute)
   app.use('/products', productRoutes)
}