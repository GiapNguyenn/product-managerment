
//lech cau hinh express
const express = require('express');
const methodOverride = require('method-override')
const route = require("./routers/client/index.route")
const routeAdmin = require("./routers/admin/index.route")
const bodyParser = require('body-parser')
const app = express();

app.use(methodOverride('_method'))

//khi cài đặt env xog chạy lệnh dưới để export vào 
require("dotenv").config();
const port = process.env.PORT;

//cấu hình connect
const database = require("./config/database")
database.connect()

//lech cau hinh pug
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))

//nhúng file tĩnh vào bằng lệnh bên dưới
app.use(express.static('public'))

// Routers 
route(app)
routeAdmin(app)
// App local Variables 
const systemConfig=require("./config/system")
app.locals.prefixAdmin =systemConfig.perfixAdmin

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})