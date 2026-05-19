const systemConfig = require("../../config/system.js")
//nhúng hàm product.router.js vào
const dashBoardRoute = require("./dashboard.route.js")
const productRoute =require("./product.route.js")
// sử dùng hàm module.exports gọi 
module.exports = (app) => {
  const PAST_ADMIN = systemConfig.perfixAdmin
  app.use(PAST_ADMIN+'/dashboard', dashBoardRoute)
  app.use(PAST_ADMIN+"/products",productRoute)
}