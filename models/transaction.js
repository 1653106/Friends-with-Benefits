'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        hours: DataTypes.INTEGER,
        totalprice: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {});
    Transaction.associate = function(models) {
        // associations can be defined here
        Transaction.belongsTo(models.User);
        Transaction.belongsTo(models.Friend);
    };
    return Transaction;
};