let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

//sync database
let models = require('../models');
router.get('/sync', (req, res) => {
    models.sequelize.sync().then(() => {
        res.send('tables created!');
    });
});

//index
router.get('/', (req, res) => {
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

//friend details
router.get('/friend-details', (req, res) => {
    if (req.session.current_url.includes('login-user')) {
        res.redirect('/login-user/friend-details');
    } else res.render('friend-details');

    req.session.current_url = '/friend-details';
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

module.exports = router;