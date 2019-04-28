let express = require('express');
let adminRouter = express.Router();
let adminController = require('../controllers/adminController');

adminRouter.use(adminController.getByID);

//admin dashboard
adminRouter.get('/', (req, res) => {
    res.redirect('/login-admin/admin-dashboard');
    req.session.current_url = '/login-admin/admin-dashboard';
});

adminRouter.get('/admin-dashboard', adminController.getGender);

//admin account
adminRouter.get('/admin-account', (req, res) => {
    res.render('admin-account');
    req.session.current_url = '/login-admin/admin-account';
});

//admin profile
adminRouter.get('/admin-profile', (req, res) => {
    res.render('admin-profile');
    req.session.current_url = '/login-admin/admin-profile';
});

//admin transaction
adminRouter.get('/admin-transaction', (req, res) => {
    res.render('admin-transaction');
    req.session.current_url = '/login-admin/admin-transaction';
});

//admin transaction details
adminRouter.get('/admin-transaction-details', (req, res) => {
    res.render('admin-transaction-details');
    req.session.current_url = '/login-admin/admin-transaction-details';
});

//admin guests chart
adminRouter.get('/admin-guests-chart', (req, res) => {
    res.render('admin-guests-chart');
    req.session.current_url = 'login-admin/admin-guests-chart';
});

//admin users chart
adminRouter.get('/admin-users-chart', (req, res) => {
    res.render('admin-users-chart');
    req.session.current_url = 'login-admin/admin-users-chart';
});

//admin transactions chart
adminRouter.get('/admin-transactions-chart', (req, res) => {
    res.render('admin-transactions-chart');
    req.session.current_url = 'login-admin/admin-transactions-chart';
});

//admin reports chart
adminRouter.get('/admin-reports-chart', (req, res) => {
    res.render('admin-reports-chart');
    req.session.current_url = 'login-admin/admin-reports-chart';
});

//update profile
adminRouter.post('/update-profile', adminController.updateProfile);

//change password
adminRouter.post('/change-password', adminController.changePassword);

//upload avatar
adminRouter.post('/upload-avatar', adminController.uploadAvatar);

module.exports = adminRouter;