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
        Friend.belongsTo(models.User, {
            onDelete: 'CASCADE',
            hooks: true
        });
        Friend.hasMany(models.Feedback);
        Friend.hasMany(models.Transaction);
    };
    return Friend;
};