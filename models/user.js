'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        gender: DataTypes.CHAR,
        dateofbirth: DataTypes.DATEONLY,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        city: DataTypes.STRING,
        wallet: DataTypes.INTEGER,
        role: DataTypes.CHAR,
        banned: DataTypes.BOOLEAN,
        imagepath: DataTypes.STRING
    }, {});
    User.associate = function(models) {
        // associations can be defined here
        User.hasOne(models.Friend);
        User.hasMany(models.Feedback);
        User.hasMany(models.Transaction)
    };
    return User;
};