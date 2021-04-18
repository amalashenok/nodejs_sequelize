"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Roles",
            [
                {
                    name: "Администраторы",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                {
                    name: "Пользователи",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
            ],
            {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Roles", null, {})
    },
}
