let express = require('express');
let userRouter = express.Router();
let userController = require('../controllers/userController');

userRouter.use(userController.getByID);

//index-login
userRouter.get('/', userController.getAllFriend, (req, res) => {
    if (req.session.current_url == '/search') {
        res.redirect('/login-user/search');
        req.session.current_url = '/login-user/search';
    } else if (req.session.current_url == '/filter') {
        res.redirect('/login-user/filter');
        req.session.current_url = '/login-user/filter';
    } else if (req.session.current_url == '/about') {
        res.redirect('/login-user/about');
        req.session.current_url = '/login-user/about';
    } else if (req.session.current_url == ('/friend-details/' + req.session.friendId)) {
        res.redirect('/login-user' + req.session.current_url);
        req.session.current_url = '/login-user' + req.session.current_url;
    } else {
        res.render('index-login');
        req.session.current_url = '/login-user';
    }
});

//search login
userRouter.get('/search', userController.searchFriendByName, (req, res) => {
    res.render('search-login');
    req.session.current_url = '/login-user/search';
});

//filter login
userRouter.get('/filter', userController.searchFriendByFilter, (req, res) => {
    res.render('search-login');
    req.session.current_url = '/login-user/filter';
});

//about login
userRouter.get('/about', (req, res) => {
    res.render('about-login');
    req.session.current_url = '/login-user/about';
});

//friend details login
userRouter.get(('/friend-details/:UserId'), userController.getFriendDetail, (req, res) => {
    res.render('friend-details-login');
    req.session.current_url = '/login-user/friend-details/' + req.params.UserId;
});

//settings profile
userRouter.get('/settings-profile', (req, res) => {
    res.render('settings-profile');
    req.session.current_url = '/login-user/settings-profile';
});

//settings transaction
userRouter.get('/settings-transaction', (req, res) => {
    res.render('settings-transaction');
    req.session.current_url = '/login-user/settings-transaction';
});

//settings friend
userRouter.get('/settings-friend', (req, res) => {
    res.render('settings-friend');
    req.session.current_url = '/login-user/settings-friend';
});

//update profile
userRouter.post('/update-profile', userController.updateProfile);

//change password
userRouter.post('/change-password', userController.changePassword);

//update friend
userRouter.post('/become-friend', userController.becomeFriend);

//add fund
userRouter.post('/add-fund', userController.addFund);

//upload avatar
userRouter.post('/upload-avatar', userController.uploadAvatar);

module.exports = userRouter;