'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    hours: DataTypes.INTEGER,
    totalprice: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  transaction.associate = function(models) {
    // associations can be defined here
    transaction.belongsTo(models.User)
    transaction.belongsTo(models.Friend)
  };
  return transaction;
};