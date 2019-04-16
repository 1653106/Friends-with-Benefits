let express = require('express');
let session = require('express-session');
let app = express();
let bodyParser = require('body-parser');
let router = require('./routes/router');
let userRouter = require('./routes/userRouter');
let adminRouter = require('./routes/adminRouter');

//Set session
app.use(session({
    secret: 'HSIAO',
    cookie: { maxAge: 3600000 },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));

//Set view engine
let expressHbs = require('express-handlebars');
app.engine('hbs', expressHbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set static public folder
app.use(express.static(__dirname + '/public'));

//Define routes
app.use('/', router);
app.use('/login-user', userRouter);
app.use('/login-admin', adminRouter);

//Set port
app.set('port', process.env.PORT || 3105);

//Start server
app.listen(app.get('port'), () => {
    console.log('Friends with Benefits is listening on port' + app.get('port'));
});