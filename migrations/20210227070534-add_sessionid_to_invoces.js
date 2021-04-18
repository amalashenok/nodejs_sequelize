"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Invoices", "SessionId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Sessions",
                key: "id",
            },
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
            defaultValue: null,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Invoices", "SessionId")
    },
}
