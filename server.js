var express = require('express');
var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_f0305hvv:ilvktr3i0blhp0rqm72ef9e78h@ds159641.mlab.com:59641/heroku_f0305hvv', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/cs5610-student-app', {useNewUrlParser: true});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    cookie: {maxAge: 60000*30}
}));

app.use(function(req, res, next) {
    const localUrl = "http://localhost:4200";
    const remoteUrl = "https://hidden-sands-54855.herokuapp.com";
    res.header("Access-Control-Allow-Origin",
        remoteUrl);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

require('./services/user.service.server')(app);
require('./services/section.service.server')(app);

// app.get('/', function (req, res) {
//     res.send('Hello World')
// });
app.listen(process.env.PORT || 4000);
// app.listen(4000);
