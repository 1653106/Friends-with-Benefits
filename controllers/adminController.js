let adminController = {};
let models = require('../models');
let sequelize = require('sequelize');
let multer = require('multer');
let User = models.User;
let Friend = models.Friend;
let Transaction = models.Transaction;
const Op = sequelize.Op;

adminController.getByID = (req, res, next) => {
    User.findOne({
        where: {
            username: req.session.username
        }
    }).then(admin => {
        res.locals.admin = admin;
        next();
    })
};

adminController.updateProfile = (req, res) => {
    console.log(req.body.adminname);
    User.update({
        name: req.body.adminname,
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
        res.redirect('/login-admin/admin-profile');
    });
};

adminController.changePassword = (req, res) => {
    if (res.locals.admin.password == req.body.oldpassword) {
        User.update({
            password: req.body.newpassword
        }, {
            where: {
                username: req.session.username
            }
        }).then(() => {
            res.redirect('/login-admin/admin-profile');
        });

    } else {
        req.session.error = 'Incorrect password!';
        res.redirect('/error');
    }
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

adminController.uploadAvatar = function(req, res) {
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
                res.redirect('/login-admin/admin-profile');
            });
        }
    });
};
//Gender-chart
adminController.getGender = function(req, res) {
    User.count({
        where: {
            gender: "f"
        }
    }).then(count => {
        res.locals.female = count;
        User.count({
            where: {
                gender: "m"
            }
        }).then(count => {
            res.locals.male = count;
            User.count({
                where: {
                    gender: "l"
                }
            }).then(count => {
                res.locals.lgbt = count;
                User.count({
                    where: {
                        gender: null
                    }
                }).then(count => {
                    res.locals.null = count;
                    res.render('admin-dashboard');
                    req.session.current_url = '/login-admin/admin-dashboard';
                })
            })
        })
    })
}

adminController.countTotalUsers = (req, res, next) => {
    User.count({
        where: {
            username: {
                [Op.not]: "admin"
            }
        }
    }).then(count => {
        res.locals.totalAccount = count;
        next();
    })
}

adminController.countTotalFriends = (req, res, next) => {
    Friend.count({
        where: {
            UserId: {
                [Op.not]: null
            }
        }
    }).then(count => {
        res.locals.totalFriend = count;
        next();
    })
}

//delete account
adminController.deleteAccount = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect(req.session.current_url);
    });
}

//Load account
adminController.loadAccount = (req, res) => {
    User.findAll({
        where: {
            username: {
                [Op.not]: "admin"
            }
        }
    }).then(users => {
        users.forEach(element => {
            element.phone = (element.phone != null) ? element.phone : 'Unknown';

            let gender = (element.gender == undefined) ? '' : element.gender.trim();
            switch (gender) {
                case 'm':
                    element.gender = 'Male';
                    break;
                case 'f':
                    element.gender = 'Female';
                    break;
                case 'l':
                    element.gender = 'LGBT';
                    break;
                default:
                    element.gender = 'Unknown';
                    break;
            }

            switch (element.city) {
                case 'hanoi':
                    element.city = 'Hà Nội';
                    break;
                case 'tphcm':
                    element.city = 'TP HCM';
                    break;
                case 'haiphong':
                    element.city = 'Hải Phòng';
                    break;
                case 'danang':
                    element.city = 'Đà Nẵng';
                    break;
                case 'cantho':
                    element.city = 'Cần Thơ';
                    break;
                case 'angiang':
                    element.city = 'An Giang';
                case 'bariavungtau':
                    element.city = 'Bà Rịa - Vũng Tàu';
                    break;
                case 'bacgiang':
                    element.city = 'Bắc Giang';
                    break;
                case 'backan':
                    element.city = 'Bắc Kạn';
                    break;
                case 'baclieu':
                    element.city = 'Bạc Liêu';
                    break;
                case 'bacninh':
                    element.city = 'Bắc Ninh';
                    break;
                case 'bentre':
                    element.city = 'Bến Tre';
                    break;
                case 'binhdinh':
                    element.city = 'Bình Định';
                    break;
                case 'binhduong':
                    element.city = 'Bình Dương';
                    break;
                case 'binhphuoc':
                    element.city = 'Bình Phước';
                    break;
                case 'binhthuan':
                    element.city = 'Bình Thuận';
                    break;
                case 'camau':
                    element.city = 'Cà Mau';
                    break;
                case 'caobang':
                    element.city = 'Cao Bằng';
                    break;
                case 'daklak':
                    element.city = 'Đắk Lắk';
                    break;
                case 'daknong':
                    element.city = 'Đắk Nông';
                    break;
                case 'dienbien':
                    element.city = 'Điện Biên';
                    break;
                case 'dongnai':
                    element.city = 'Đồng Nai';
                    break;
                case 'dongthap':
                    element.city = 'Đồng Tháp';
                    break;
                case 'gialai':
                    element.city = 'Gia Lai';
                    break;
                case 'hagiang':
                    element.city = 'Hà Giang';
                    break;
                case 'hanam':
                    element.city = 'Hà Nam';
                    break;
                case 'hatinh':
                    element.city = 'Hà Tĩnh';
                    break;
                case 'haiduong':
                    element.city = 'Hải Dương';
                    break;
                case 'haugiang':
                    element.city = 'Hậu Giang';
                    break;
                case 'hoabinh':
                    element.city = 'Hoà Bình';
                    break;
                case 'hungyen':
                    element.city = 'Hưng Yên';
                    break;
                case 'khanhhoa':
                    element.city = 'Khánh Hoà';
                    break;
                case 'kiengiang':
                    element.city = 'Kiên Giang';
                    break;
                case 'kontum':
                    element.city = 'Kon Tum';
                    break;
                case 'laichau':
                    element.city = 'Lai Châu';
                    break;
                case 'lamdong':
                    element.city = 'Lâm Đồng';
                    break;
                case 'langson':
                    element.city = 'Lạng Sơn';
                    break;
                case 'laocai':
                    element.city = 'Lào Cai';
                    break;
                case 'longan':
                    element.city = 'Long An';
                    break;
                case 'namdinh':
                    element.city = 'Nam Định';
                    break;
                case 'nghean':
                    element.city = 'Nghệ An';
                    break;
                case 'ninhbinh':
                    element.city = 'Ninh Bình';
                    break;
                case 'ninhthuan':
                    element.city = 'Ninh Thuận';
                    break;
                case 'phutho':
                    element.city = 'Phú Thọ';
                    break;
                case 'quangbinh':
                    element.city = 'Quảng Bình';
                    break;
                case 'quangnam':
                    element.city = 'Quảng Nam';
                    break;
                case 'quangngai':
                    element.city = 'Quảng Ngãi';
                    break;
                case 'quangninh':
                    element.city = 'Quảng Ninh';
                    break;
                case 'quangtri':
                    element.city = 'Quảng Trị';
                    break;
                case 'soctrang':
                    element.city = 'Sóc Trăng';
                    break;
                case 'sonla':
                    element.city = 'Sơn La';
                    break;
                case 'tayninh':
                    element.city = 'Tây Ninh';
                    break;
                case 'thaibinh':
                    element.city = 'Thái Bình';
                    break;
                case 'thainguyen':
                    element.city = 'Thái Nguyên';
                    break;
                case 'thanhhoa':
                    element.city = 'Thanh Hoá';
                    break;
                case 'thuathienhue':
                    element.city = 'Thừa Thiên Huế';
                    break;
                case 'tiengiang':
                    element.city = 'Tiền Giang';
                    break;
                case 'travinh':
                    element.city = 'Trà Vinh';
                    break;
                case 'tuyenquang':
                    element.city = 'Tuyên Quang';
                    break;
                case 'vinhlong':
                    element.city = 'Vĩnh Long';
                    break;
                case 'vinhphuc':
                    element.city = 'Vĩnh Phúc';
                    break;
                case 'yenbai':
                    element.city = 'Yên Bái';
                    break;
                case 'phuyen':
                    element.city = 'Phú Yên';
                    break;
                default:
                    element.city = 'Unknown';
                    break;
            }
        })
        res.locals.account = users;
        res.render('admin-account');
        req.session.current_url = '/login-admin/admin-account';
    })
}

adminController.countTransactions = (req, res, next) => {
    Transaction.count().then(count => {
        res.locals.totalTransactions = count;
        next();
    })
}

adminController.loadTransaction = (req, res) => {
    Transaction.findAll({
        include: [{
                model: models.Friend,
                include: models.User
            },
            {
                model: models.User
            }
        ],
    }).then(transactions => {
        res.locals.transactions = transactions;
        res.render('admin-transaction');
        req.session.current_url = '/login-admin/admin-transaction';
    })
}

adminController.getTransactionByID = (req, res) => {
    Transaction.findOne({
        include: [{
                model: models.Friend,
                include: models.User
            },
            {
                model: models.User
            }
        ],
        where: {
            id: req.params.id
        }
    }).then(transaction => {
        res.locals.transaction = transaction;
        res.render('admin-transaction-details');
        req.session.current_url = '/login-admin/admin-transaction-details';
    })
}

adminController.generateChart = (req, res) => {
    //find date array
    var dateArray = getDates(req.body.fromdate, req.body.todate);
    var countArray = new Array();
    var promises = new Array();

    dateArray.forEach(element => {
        promises.push(
            User.count({
                where: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', element.toISOString().substring(0, 10))
            }).then(count => {
                countArray.push(count);
            })
        );

    })

    Promise.all(promises).then(() => {
        console.log(countArray);
        res.locals.accounts = countArray;
        res.locals.fromdate = req.body.fromdate;
        res.locals.todate = req.body.todate;
        //res.redirect('/login-admin/admin-users-chart');
    })
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = new Date(startDate);
    while (currentDate <= new Date(stopDate)) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}

module.exports = adminController;