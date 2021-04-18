"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Invoices", "ServiceId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Services",
                key: "id",
            },
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
            defaultValue: null,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Invoices", "ServiceId")
    },
}
