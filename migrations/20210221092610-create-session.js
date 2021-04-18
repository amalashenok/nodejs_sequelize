"use strict"
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Sessions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            ssid: {
                type: Sequelize.STRING,
            },
            isActive: { type: Sequelize.BOOLEAN },
            phone: { type: Sequelize.INTEGER },
            email: {
                type: Sequelize.STRING,
            },
            city: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Sessions")
    },
}
