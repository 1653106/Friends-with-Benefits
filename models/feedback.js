'use strict';
module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        comment: DataTypes.TEXT,
        rate: DataTypes.INTEGER
    }, {});
    Feedback.associate = function(models) {
        // associations can be defined here
        Feedback.belongsTo(models.User);
        Feedback.belongsTo(models.Friend);
    };
    return Feedback;
};