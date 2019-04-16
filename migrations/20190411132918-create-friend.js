'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Friends', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT
            },
            revenue: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATEONLY
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Friends');
    }
};