const systemConfig = require("../../config/system.js")
const authMidleware = require("../../middlewares/admin/auth.middlewares.js")
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
  app.use(PAST_ADMIN+'/dashboard', authMidleware.requireAuth ,dashBoardRoute)
  app.use(PAST_ADMIN+"/products",authMidleware.requireAuth,productRoute)
  app.use(PAST_ADMIN+"/products-category",authMidleware.requireAuth ,productCategoryRoute)
  app.use(PAST_ADMIN+"/roles",authMidleware.requireAuth ,roleRoute)
  app.use(PAST_ADMIN+"/accounts", authMidleware.requireAuth ,accountRoute)
  app.use(PAST_ADMIN+"/auth", authRoute)
}