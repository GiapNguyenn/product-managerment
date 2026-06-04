
//lech cau hinh express
const express = require('express');
const methodOverride = require('method-override')
const route = require("./routers/client/index.route")
const routeAdmin = require("./routers/admin/index.route")
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express();  

app.use(methodOverride('_method'))

//khi cài đặt env xog chạy lệnh dưới để export vào 
require("dotenv").config();
const port = process.env.PORT;

//cấu hình connect
const database = require("./config/database")
database.connect()

// flash 
  app.use(cookieParser('KeyBatKy'));
  app.use(session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
// End flash 
//lech cau hinh pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))

//nhúng file tĩnh vào bằng lệnh bên dưới
console.log(__dirname)
app.use(express.static(`${__dirname}/public`))

// Routers 
route(app)
routeAdmin(app)
// App local Variables 
const systemConfig=require("./config/system")
app.locals.prefixAdmin =systemConfig.perfixAdmin

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})