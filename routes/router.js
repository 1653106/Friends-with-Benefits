let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');
let friendId = 0;

//sync database
let models = require('../models');
router.get('/sync', (req, res) => {
    models.sequelize.sync().then(() => {
        res.send('tables created!');
    });
});

//index
router.get('/', controller.getAllFriend, (req, res) => {
    res.render('index');
    req.session.current_url = '';
});

//search
router.get('/search', (req, res) => {
    if (req.session.current_url.includes('login-user')) {
        res.redirect('/login-user/search');
    } else res.render('search');

    req.session.current_url = '/search';
});

//about
router.get('/about', (req, res) => {
    if (req.session.current_url.includes('login-user')) {
        res.redirect('/login-user/about');
    } else res.render('about');

    req.session.current_url = '/about';
});

//settings profile
router.get('/settings-profile', (req, res) => {
    res.redirect('/login-user/settings-profile');
});

//settings transaction
router.get('/settings-transaction', (req, res) => {
    res.redirect('/login-user/settings-transaction');
});

//settings friend
router.get('/settings-friend', (req, res) => {
    res.redirect('/login-user/settings-friend');
});

//error
router.get('/error', (req, res) => {
    res.locals.error = req.session.error;
    res.render('error');
});

//friend details
router.get('/friend-details/:UserId', controller.getFriendDetail, (req, res) => {
    req.session.friendId = req.params.UserId;
    friendId = req.params.UserId;
    if (req.session.current_url.includes('login-user')) {
        res.redirect('/login-user/friend-details/' + req.params.UserId);
    } else res.render('friend-details');

    req.session.current_url = '/friend-details/' + req.params.UserId;
});

//redirect add fund
router.post('/add-fund', (req, res) => {
    res.redirect('/login-user/add-fund');
});

//login
router.post('/login', controller.login);

//register
router.post('/register', controller.register);

module.exports = router;