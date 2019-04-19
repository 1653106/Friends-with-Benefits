'use strict';
module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
        price: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        detail: DataTypes.TEXT,
        revenue: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN
    }, {});
    Friend.associate = function(models) {
        // associations can be defined here
        Friend.belongsTo(models.User);
        Friend.hasMany(models.Feedback);
    };
    return Friend;
};