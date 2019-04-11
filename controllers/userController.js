let userController = {};
let models = require('../models');
let User = models.User;
let Friend = models.Friend;

userController.getByID = (req, res, next) => {
    User.findOne({
        where: {
            username: req.session.username
        }
    }).then(user => {
        res.locals.user = user;

        if (user.role.toString().trim() === 'f') {
            Friend.findOne({
                where: {
                    UserId: user.id
                }
            }).then(friend => {
                res.locals.friend = friend;
                console.log(res.locals.friend.id);
                next();
            });
        } else {
            next();
        }
    });
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

userController.changePassword = (req, res) => {
    if (res.locals.user.password == req.body.oldpassword) {
        User.update({
            password: req.body.newpassword
        }, {
            where: {
                username: req.session.username
            }
        }).then(() => {
            res.redirect('/login-user/settings-profile');
        });

    } else {
        req.session.error = 'Incorrect password!';
        res.redirect('/error');
    }
};

userController.becomeFriend = (req, res) => {
    if (req.body.asfriend == 'on') {

    };

    User.findOne({
        where: {
            username: req.session.username
        }
    }).then(user => {
        if (req.body.asfriend == 'on') {
            User.update({
                role: 'f'
            }, {
                where: {
                    username: req.session.username
                }
            });

            Friend.count({
                where: {
                    UserId: user.id
                }
            }).then(count => {
                if (count == 1) {
                    Friend.update({
                        price: req.body.price,
                        description: req.body.description,
                        detail: req.body.detail,
                        status: (req.body.status == 'on') ? 1 : 0
                    }, {
                        where: {
                            UserId: user.id
                        }
                    }).then(() => {
                        res.redirect('friend-details');
                    }).catch(error => {
                        res.send(error);
                    });
                } else {
                    Friend.create({
                        UserId: user.id,
                        price: req.body.price,
                        description: req.body.description,
                        detail: req.body.detail,
                        status: (req.body.status == 'on') ? 1 : 0
                    }).then(() => {
                        res.redirect('friend-details');
                    }).catch(error => {
                        res.send(error);
                    });
                }
            });
        } else {
            User.update({
                role: 'u'
            }, {
                where: {
                    username: req.session.username
                }
            }).then(() => {
                res.redirect('settings-friend');
            });
        }
    });
};

module.exports = userController;