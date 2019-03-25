let express = require('express');
let session = require('express-session');
let app = express();

//Set session
app.use(session({ secret: 'HSIAO' }));

//Set view engine
let expressHbs = require('express-handlebars');
app.engine('hbs', expressHbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

//Set static public folder
app.use(express.static(__dirname + '/public'));

//Define routes

//index
app.get('/', (req, res) => {
    res.render('index');
    req.session.current_url = '';
});

//index-login
app.get('/login-user', (req, res) => {
    if (req.session.current_url == '/search') {
        res.redirect('/login-user/search');
        req.session.current_url = '/login-user/search';
    } else if (req.session.current_url == '/about') {
        res.redirect('/login-user/about');
        req.session.current_url = '/login-user/about';
    } else if (req.session.current_url == '/friend-details') {
        res.redirect('/login-user/friend-details');
        req.session.current_url = '/login-user/friend-details';
    } else {
        res.render('index-login');
        req.session.current_url = '/login-user';
    }

});

//search
app.get('/search', (req, res) => {
    if (req.session.current_url.includes('login-user')) {
        res.redirect('/login-user/search');
    } else res.render('search');

    req.session.current_url = '/search';
});

//search login
app.get('/login-user/search', (req, res) => {
    res.render('search-login');
    req.session.current_url = '/login-user/search';
});

//about
app.get('/about', (req, res) => {
    if (req.session.current_url.includes('login-user')) {
        res.redirect('/login-user/about');
    } else res.render('about');

    req.session.current_url = '/about';
});

//about login
app.get('/login-user/about', (req, res) => {
    res.render('about-login');
    req.session.current_url = '/login-user/about';
});

//friend details
app.get('/friend-details', (req, res) => {
    if (req.session.current_url.includes('login-user')) {
        res.redirect('/login-user/friend-details');
    } else res.render('friend-details');

    req.session.current_url = '/friend-details';
});

//friend details login
app.get('/login-user/friend-details', (req, res) => {
    res.render('friend-details-login');
    req.session.current_url = '/login-user/friend-details';
});

//settings profile
app.get('/settings-profile', (req, res) => {
    res.redirect('/login-user/settings-profile');
});

app.get('/login-user/settings-profile', (req, res) => {
    res.render('settings-profile');
    req.session.current_url = '/login-user/settings-profile';
});

//settings transaction
app.get('/settings-transaction', (req, res) => {
    res.redirect('/login-user/settings-transaction');
});

app.get('/login-user/settings-transaction', (req, res) => {
    res.render('settings-transaction');
    req.session.current_url = '/login-user/settings-transaction';
});

//settings friend
app.get('/settings-friend', (req, res) => {
    res.redirect('/login-user/settings-friend');
});

app.get('/login-user/settings-friend', (req, res) => {
    res.render('settings-friend');
    req.session.current_url = '/login-user/settings-friend';
});

//admin dashboard
app.get('/login-admin', (req, res) => {
    res.redirect('/login-admin/admin-dashboard');
    req.session.current_url = '/login-admin/admin-dashboard';
});

app.get('/login-admin/admin-dashboard', (req, res) => {
    res.render('admin-dashboard');
    req.session.current_url = '/login-admin/admin-dashboard';
});

//admin account
app.get('/login-admin/admin-account', (req, res) => {
    res.render('admin-account');
    req.session.current_url = '/login-admin/admin-account';
});

//admin profile
app.get('/login-admin/admin-profile', (req, res) => {
    res.render('admin-profile');
    req.session.current_url = '/login-admin/admin-profile';
});

//admin transaction
app.get('/login-admin/admin-transaction', (req, res) => {
    res.render('admin-transaction');
    req.session.current_url = '/login-admin/admin-transaction';
});

//admin transaction details
app.get('/login-admin/admin-transaction-details', (req, res) => {
    res.render('admin-transaction-details');
    req.session.current_url = '/login-admin/admin-transaction-details';
});

//admin guests chart
app.get('/login-admin/admin-guests-chart', (req, res) => {
    res.render('admin-guests-chart');
    req.session.current_url = 'login-admin/admin-guests-chart';
});

//admin users chart
app.get('/login-admin/admin-users-chart', (req, res) => {
    res.render('admin-users-chart');
    req.session.current_url = 'login-admin/admin-users-chart';
});

//admin transactions chart
app.get('/login-admin/admin-transactions-chart', (req, res) => {
    res.render('admin-transactions-chart');
    req.session.current_url = 'login-admin/admin-transactions-chart';
});

//admin reports chart
app.get('/login-admin/admin-reports-chart', (req, res) => {
    res.render('admin-reports-chart');
    req.session.current_url = 'login-admin/admin-reports-chart';
});

//Set port
app.set('port', process.env.PORT || 3105);

//Start server
app.listen(app.get('port'), () => {
    console.log('Friends with Benefits is listening on port' + app.get('port'));
});