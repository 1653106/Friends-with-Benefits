'use strict';
module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        comment: DataTypes.TEXT,
        rate: DataTypes.INTEGER
    }, {});
    Feedback.associate = function(models) {
        // associations can be defined here
        Feedback.belongsTo(models.User, {
            onDelete: 'CASCADE',
            hooks: true
        });
        Feedback.belongsTo(models.Friend);
    };
    return Feedback;
};