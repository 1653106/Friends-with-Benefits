'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.CHAR
            },
            dateofbirth: {
                type: Sequelize.DATE
            },
            phone: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            wallet: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            role: {
                type: Sequelize.CHAR
            },
            banned: {
                type: Sequelize.BOOLEAN
            },
            imagepath: {
                allowNull: false,
                defaultValue: '/images/default.png',
                type: Sequelize.STRING
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
        return queryInterface.dropTable('Users');
    }
};