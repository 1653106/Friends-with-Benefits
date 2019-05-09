let userController = {};
let models = require('../models');
let sequelize = require('sequelize');
let multer = require('multer');
let User = models.User;
let Friend = models.Friend;
let Feedback = models.Feedback;
let Transaction = models.Transaction;

const Op = sequelize.Op;

//Load friendlist
userController.getAllFriend = (req, res, next) => {
    console.log(req.session.userid);
    User.findAll({
        limit: 4,
        include: [models.Friend],
        where: {
            id: {
                [Op.not]: req.session.userid
            },
            role: 'f'
        }
    }).then(users => {
        res.locals.users = users;
        next();
    });
};

userController.getDetail = (req, res, next) => {
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
                    model: models.User,
                }
            }
        ],
        where: {
            UserId: req.session.userid,
        }
    }).then(friend => {
        let page = req.query.page || 1;
        let pageLimit = 3;
        let offset = (page - 1) * pageLimit;

        if (friend.Feedbacks.length < 1) {
            pagination = null;
        } else {
            let pagination = {
                page: parseInt(page),
                limit: pageLimit,
                totalRows: friend.Feedbacks.length
            };

            friend.Feedbacks.sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });

            res.locals.pagination = pagination;
            friend.Feedbacks = friend.Feedbacks.slice(offset, offset + pageLimit);
        }

        res.locals.friend = friend;

        //--------------------------------------------------------------------

        sumReview = 0;
        let count = 0;
        friend.Feedbacks.forEach(element => {
            sumReview += element.rate;
            count++;
        })

        res.locals.avgReview = Math.round((sumReview / count) * 100) / 100;
        next();
    });
}

//Load friend detail
userController.getFriendDetail = (req, res, next) => {
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
                    model: models.User,
                }
            }
        ],
        where: {
            UserId: req.params.UserId,
        }
    }).then(friend => {
        let page = req.query.page || 1;
        let pageLimit = 3;
        let offset = (page - 1) * pageLimit;

        if (friend.Feedbacks.length < 1) {
            pagination = null;
        } else {
            let pagination = {
                page: parseInt(page),
                limit: pageLimit,
                totalRows: friend.Feedbacks.length
            };

            friend.Feedbacks.sort((a, b) => {
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            });

            res.locals.pagination = pagination;
            friend.Feedbacks = friend.Feedbacks.slice(offset, offset + pageLimit);
        }

        res.locals.friend = friend;

        //--------------------------------------------------------------------

        sumReview = 0;
        let count = 0;
        friend.Feedbacks.forEach(element => {
            sumReview += element.rate;
            count++;
        })

        res.locals.avgReview = Math.round((sumReview / count) * 100) / 100;
        next();
    });
};

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
        dateofbirth: req.body.dateofbirth,
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

userController.addFund = (req, res) => {
    User.findOne({
        where: {
            username: req.session.username
        }
    }).then(user => {
        if (user.password == req.body.password) {
            User.update({
                wallet: parseInt(user.wallet) + parseInt(req.body.fund)
            }, {
                where: {
                    username: user.username
                }
            }).then(() => {
                res.redirect(req.session.current_url);
            });
        } else {
            req.session.error = 'Incorrect password!';
            res.redirect('/error');
        }
    });
};

userController.withdraw = (req, res) => {
    User.findOne({
        where: {
            username: req.session.username
        }
    }).then(user => {
        if (parseInt(user.wallet) < parseInt(req.body.fund)) {
            req.session.error = 'Incorrect password!';
            res.redirect('/error');
        } else {
            if (user.password == req.body.password) {
                User.update({
                    wallet: parseInt(user.wallet) - parseInt(req.body.fund)
                }, {
                    where: {
                        username: user.username
                    }
                }).then(() => {
                    res.redirect(req.session.current_url);
                });
            } else {
                req.session.error = 'Incorrect password!';
                res.redirect('/error');
            }
        }
    });
};

userController.becomeFriend = (req, res) => {
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
                        res.redirect('friend-details/' + user.id);
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
                        res.redirect('friend-details/' + user.id);
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

// upload avatar
let Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + req.session.username + ".png");
    }
});

let upload = multer({ storage: Storage }).single("userAvatar");

userController.uploadAvatar = function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            req.session.error = 'Upload fail!';
            res.redirect('/error');
        } else {
            User.update({
                imagepath: "/images/" + req.file.filename
            }, {
                where: {
                    username: req.session.username
                }
            }).then(() => {
                res.redirect('/login-user/settings-profile');
            });
        }
    });
};

userController.searchFriendByName = (req, res, next) => {
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

userController.searchFriendByFilter = (req, res, next) => {
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

//feedback
userController.postFeedback = (req, res, next) => {
    User.findOne({
        where: {
            username: req.session.username
        }
    }).then(commenter => {
        Feedback.create({
            comment: req.body.comment,
            rate: req.body.starrating,
            FriendId: req.body.friendid,
            UserId: commenter.id
        }).then(() => {
            next();
        }).catch(error => {
            res.send(error);
        })
    })
};

userController.saveTransaction = (req, res) => {
    console.log(req.session.friendId);

    Friend.findOne({
        where: {
            UserId: req.session.friendId
        }
    }).then(friend => {
        User.findOne({
            where: {
                username: req.session.username
            }
        }).then(user => {
            if (user.wallet >= friend.price * req.body.priceperh) {
                Transaction.create({
                    UserId: user.id,
                    FriendId: friend.id,
                    totalprice: friend.price * req.body.priceperh,
                    hours: req.body.priceperh
                });

                User.update({
                    wallet: user.wallet - friend.price * req.body.priceperh
                }, {
                    where: {
                        username: req.session.username
                    }
                });

                res.redirect(req.session.current_url);
            } else {
                req.session.error = 'Not enough money';
                res.redirect('/login-user/error');
            }
        });
    });
};

userController.loadTransaction = (req, res, next) => {
    Transaction.findAll({
        include: [{
            model: models.Friend,
            include: models.User
        }],
        where: {
            UserId: req.session.userid
        }
    }).then(transactions => {
        res.locals.transactions = transactions;
        res.locals.moneySpent = 0;
        transactions.forEach(element => {
            res.locals.moneySpent += element.totalprice;
        })
        next();
    });
};

userController.getFriendHired = (req, res, next) => {
    Transaction.count({
        where: {
            UserId: req.session.userid
        },
        distinct: true,
        col: 'FriendId'
    }).then(count => {
        res.locals.friendHired = count;
        next();
    });
};

userController.getAverageReview = (req, res, next) => {
    Friend.findOne({
        include: [{ model: models.Feedback, required: false }],
        where: {
            UserId: req.session.userid
        }
    }).then(friend => {
        if (friend == null) {
            res.locals.avgReview = 0;
            next();
        }

        sumReview = 0;
        let count = 0;

        friend.Feedbacks.forEach(element => {
            sumReview += element.rate;
            count++;
        });

        res.locals.avgReview = Math.round((sumReview / count) * 100) / 100;

        next();
    });
};

module.exports = userController;