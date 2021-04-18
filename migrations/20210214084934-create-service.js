'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Services', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            isActive: {
                type: Sequelize.BOOLEAN
            },
            rate: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.DECIMAL
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Services');
    }
};