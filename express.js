const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const frontAuth = require('../api/middlewares/front/auth');
const frontRoutes = require('../api/routes/v1/front/index');
const adminRoutes = require('../api/routes/v1/admin/index');
const path = require('path');
const app = express();
const cookieParser = require("cookie-parser");
const session = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisissessionkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/images", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../../admin/static/css")));
app.use(cookieParser());


// authentication middleware to get token
// app.use(frontAuth.signUpValidation);

// mount admin api v1 routes
app.use('/admin', adminRoutes);
// mount user api v1 routes
app.use('/user', frontRoutes);


// Admin Site Build Path
// app.use('/admin/', express.static(path.join(__dirname, '../../admin')))
// app.get('/admin/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../../admin', 'index.html'));
// });




// Front Site Build Path
// app.use('/', express.static(path.join(__dirname, '../../build')))
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../../build', 'index.html'));
// });

module.exports = app;