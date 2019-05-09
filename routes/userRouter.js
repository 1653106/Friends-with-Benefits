let express = require('express');
let userRouter = express.Router();
let userController = require('../controllers/userController');

userRouter.use(userController.getByID);

//index-login
userRouter.get('/', userController.getAllFriend, (req, res) => {
    if (req.session.current_url.includes('/search') && !req.session.current_url.includes('/login-user')) {
        res.redirect('/login-user' + req.session.current_url);
        req.session.current_url = '/login-user' + req.session.current_url;
    } else if (req.session.current_url.includes('/filter') && !req.session.current_url.includes('/login-user')) {
        res.redirect('/login-user' + req.session.current_url);
        req.session.current_url = '/login-user' + req.session.current_url;
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
    req.session.current_url = '/login-user/search?name=' + req.query.name;
});

//filter login
userRouter.get('/filter', userController.searchFriendByFilter, (req, res) => {
    res.render('search-login');
    req.session.current_url = '/login-user/filter?name=' + req.query.name + '&gender=' + req.query.gender + '&pricefrom=' + req.query.pricefrom + '&priceto=' + req.query.priceto + '&city=' + req.query.city;
});

//about login
userRouter.get('/about', (req, res) => {
    res.render('about-login');
    req.session.current_url = '/login-user/about';
});

//details
userRouter.get('/details', userController.getDetail, (req, res) => {
    res.render('details');
    req.session.current_url = '/login-user/details';
});

//friend details login
userRouter.get('/friend-details/:UserId', userController.getFriendDetail, (req, res) => {
    req.session.friendId = req.params.UserId;
    res.render('friend-details-login');
    req.session.current_url = '/login-user/friend-details/' + req.params.UserId;
});

//feedback
userRouter.post('/feedback', userController.postFeedback, (req, res) => {
    res.redirect(req.session.current_url);
});

//settings profile
userRouter.get('/settings-profile', userController.getFriendHired, (req, res) => {
    res.render('settings-profile');
    req.session.current_url = '/login-user/settings-profile';
});

//settings transaction
userRouter.get('/settings-transaction', userController.loadTransaction, (req, res) => {
    res.render('settings-transaction');
    req.session.current_url = '/login-user/settings-transaction';
});

//settings friend
userRouter.get('/settings-friend', userController.getAverageReview, (req, res) => {
    res.render('settings-friend');
    req.session.current_url = '/login-user/settings-friend';
});

//error
userRouter.get('/error', (req, res) => {
    res.locals.error = req.session.error;
    res.render('error');
    req.session.current_url = '/login-user/error';
})

//update profile
userRouter.post('/update-profile', userController.updateProfile);

//change password
userRouter.post('/change-password', userController.changePassword);

//update friend
userRouter.post('/become-friend', userController.becomeFriend);

//add fund
userRouter.post('/add-fund', userController.addFund);

//withdraw
userRouter.post('/withdraw', userController.withdraw);

//upload avatar
userRouter.post('/upload-avatar', userController.uploadAvatar);

//save Transaction
userRouter.post('/save-transaction', userController.saveTransaction);

module.exports = userRouter;