const systemConfig = require("../../config/system.js")
//nhúng hàm product.router.js vào
const dashBoardRoute = require("./dashboard.route.js")
const productRoute =require("./product.route.js")
const productCategoryRoute = require("./products-category.route.js")
const roleRoute = require("./roles.route.js")
const accountRoute = require("./account.route.js")
const authRoute = require("./auth.route.js")
// sử dùng hàm module.exports gọi 
module.exports = (app) => {
  const PAST_ADMIN = systemConfig.perfixAdmin
  app.use(PAST_ADMIN+'/dashboard', dashBoardRoute)
  app.use(PAST_ADMIN+"/products",productRoute)
  app.use(PAST_ADMIN+"/products-category", productCategoryRoute)
  app.use(PAST_ADMIN+"/roles", roleRoute)
  app.use(PAST_ADMIN+"/accounts", accountRoute)
  app.use(PAST_ADMIN+"/auth", authRoute)
}