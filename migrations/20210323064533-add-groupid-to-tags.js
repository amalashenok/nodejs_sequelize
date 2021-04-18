"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Tags", "GroupId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Groups",
                key: "id",
            },
            onUpdate: "NO ACTION",
            onDelete: "NO ACTION",
            defaultValue: null,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Tags", "GroupId")
    },
}