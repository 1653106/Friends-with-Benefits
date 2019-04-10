let userController = {};
let models = require('../models');
let User = models.User;

userController.getByID = (req, res, next) => {
    User.findOne({
        where: {
            username: req.session.username
        }
    }).then(user => {
        res.locals.user = user;
        next();
    })
};

userController.updateProfile = (req, res) => {
    User.update({
        name: req.body.usr,
        gender: req.body.gender,
        city: req.body.cityselect,
        phone: req.body.phone,
        email: req.body.email
    }, {
        where: {
            username: req.session.username
        }
    }).then(() => {
        res.redirect('/login-user/settings-profile');
    });
};

module.exports = userController;