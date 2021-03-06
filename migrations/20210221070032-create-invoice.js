"use strict"
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Invoices", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            date: { type: Sequelize.DATE },
            description: { type: Sequelize.STRING },
            email: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
            },

            status: {
                type: Sequelize.STRING,
            },
            persons: { type: Sequelize.INTEGER },

            phone: {
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
        await queryInterface.dropTable("Invoices")
    },
}
