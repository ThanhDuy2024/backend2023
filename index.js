const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require("dotenv").config();

const database = require("./config/database");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const adminUrl = require('./config/system');

const port = process.env.PORT;
const app = express();

app.use(cookieParser('LTD123'));
app.use(session({ cookie: { maxAge: 3000 }}));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.set('views', './views');
app.set('view engine', 'pug');

database.connect();
route(app);
routeAdmin(app);
app.locals.prefixAdmin = adminUrl.prefixAdmin;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

