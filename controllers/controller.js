let controller = {};
let models = require('../models');
let sequelize = require('sequelize');
let User = models.User;
let Friend = models.Friend;

const Op = sequelize.Op;

controller.login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(user => {
        if (user != null && user.username == 'admin' && user.role.trim() == 'a') {
            req.session.username = user.username;
            res.redirect('/login-admin')
        } else if (user != null) {
            req.session.username = user.username;
            req.session.userid = user.id;
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
                banned: false,
                imagepath: '/images/default.png'
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
    User.findAll({
        include: [models.Friend],
        where: {
            role: 'f'
        }
    }).then(users => {
        res.locals.autocomplete = users;

        let page = req.query.page || 1;
        let pageLimit = 8;
        let offset = (page - 1) * pageLimit;

        let pagination = {
            page: parseInt(page),
            limit: pageLimit,
            totalRows: users.length
        };

        if (users.length < 1) {
            pagination = null;
        }

        users.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        res.locals.pagination = pagination;
        users = users.slice(offset, offset + pageLimit);
        res.locals.users = users;
        next();
    });

    // User.findAll({
    //     limit: 4,
    //     include: [models.Friend],
    //     where: {
    //         role: 'f'
    //     }
    // }).then(hotusers => {
    //     let page = req.query.page || 1;
    //     let pageLimit = 4;
    //     let offset = (page - 1) * pageLimit;

    //     let paginationHot = {
    //         page: parseInt(page),
    //         limit: pageLimit,
    //         totalRows: hotusers.length
    //     };

    //     if (users.length < 1) {
    //         paginationHot = null;
    //     }

    //     hotusers.sort((a, b) => {
    //         return b.Friend.price - a.friend.price;
    //     });

    //     res.locals.paginationHot = paginationHot;
    //     hotusers = hotusers.slice(offset, offset + pageLimit);
    //     res.locals.hotusers = hotusers;
    //     next();
    // });
};

//Load friend detail
controller.getFriendDetail = (req, res, next) => {
    // User.findOne({
    //     include: [models.Friend],
    //     where: {
    //         id: req.params.UserId
    //     }
    // }).then(friend => {
    //     res.locals.friend = friend;
    //     next();
    // });

    Friend.findOne({
        include: [{
                model: models.User,
            },
            {
                required: false,
                model: models.Feedback,
                where: {
                    UserId: {
                        [Op.not]: null
                    }
                },
                include: {
                    model: models.User
                }
            }
        ],
        where: {
            UserId: req.params.UserId
        }
    }).then(friend => {
        let page = req.query.page || 1;
        let pageLimit = 3;
        let offset = (page - 1) * pageLimit;

        let pagination = {
            page: parseInt(page),
            limit: pageLimit,
            totalRows: friend.Feedbacks.length
        };

        if (friend.Feedbacks.length < 1) {
            pagination = null;
        }

        friend.Feedbacks.sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        res.locals.pagination = pagination;
        friend.Feedbacks = friend.Feedbacks.slice(offset, offset + pageLimit);
        res.locals.friend = friend;
        next();
    });
};

controller.searchFriendByName = (req, res, next) => {
    User.findAll({
        include: [models.Friend],
        where: {
            name: {
                [Op.like]: '%' + req.query.name + '%'
            },
            role: 'f'
        }
    }).then(users => {
        res.locals.users = users;
        next();
    });
};

controller.searchFriendByFilter = (req, res, next) => {
    User.findAll({
        include: [{
            model: models.Friend,
            price: {
                [Op.between]: [req.query.pricefrom, req.query.priceto]
            }
        }],
        where: {
            name: {
                [Op.like]: '%' + req.query.name + '%'
            },
            gender: req.query.gender,

            city: req.query.city,
            role: 'f'
        }
    }).then(users => {
        res.locals.users = users;
        next();
    })
};

module.exports = controller;