let controller = {};
let models = require('../models');
let User = models.User;
let Friend = models.Friend;

controller.login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(user => {
        if (user != null) {
            req.session.username = user.username;
            res.redirect('/login-user');
        } else {
            req.session.error = 'Incorrect username or password!';
            res.redirect('/error');
        }
    })
};

controller.register = (req, res) => {
    console.log(req.body.registerusername);

    User.count({
        where: { username: req.body.registerusername }
    }).then(count => {
        if (count > 0) {
            res.send('Username already exists');
        } else {
            User.create({
                username: req.body.registerusername,
                password: req.body.registerpassword,
                name: req.body.name,
                dateofbirth: req.body.dateofbirth,
                email: req.body.email,
                role: 'u',
                banned: false
            }).then(() => {
                res.redirect('/');
            }).catch(error => {
                res.send(error);
            });
        }
    });
};

//Load friendlist
controller.getAllFriend = (req, res, next) => {
    Friend.findAll({
            limit: 4,
        })
        .then(friends => {
            res.locals.friends = friends;

            friends.forEach((element) => {
                User.findOne({
                    where: {
                        id: element.UserId
                    }
                }).then(user => {
                    res.locals.user = user;
                    next();
                })
            });
        });
};

//Load friend detail
controller.getFriendDetail = (req, res, next) => {
    Friend.findOne({
        where: {
            UserId: req.params.UserId
        }
    }).then(friend => {
        res.locals.friend = friend;

        User.findOne({
            where: {
                id: req.params.UserId
            }
        }).then(user => {
            res.locals.user = user;
            next();
        });
    });
};

module.exports = controller;