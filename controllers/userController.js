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

module.exports = userController;