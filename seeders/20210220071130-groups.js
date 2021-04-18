"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Groups", [{
                name: "Популярные",
                color: "#FF9F39",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Развитие навыков",
                color: "#466FBD",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Локация",
                color: "#00CCA9",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
        ], {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Groups", null, {})
    },
}