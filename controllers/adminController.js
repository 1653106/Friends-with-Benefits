let adminController = {};
let models = require('../models');
let multer = require('multer');
let User = models.User;

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
//Chart
adminController.getGender = function(req,res)
{
    User.count({
        where : {
            gender:"f"
        }
    }).then(count=>{
        res.locals.female=count;
        User.count({
            where : {
                gender:"m"
            }
        }).then(count=>{
            res.locals.male=count;
            User.count({
                where : {
                    gender:"l"
                }
            }).then(count=>{
                res.locals.lgbt=count;
                res.render('admin-dashboard');
                req.session.current_url = '/login-admin/admin-dashboard';
            })
        })
    })
   
    
    
}
module.exports = adminController;