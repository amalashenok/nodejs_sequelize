'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Suppliers", [{
                    name: "Hobby Games",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    name: "Умная Москва",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    name: 'Спортивно-развлекательный центр "НЕБО"',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    name: "Portal Vr",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    name: "Арт Фабрика",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
                {
                    name: 'Национальный парк "Лосиный остров"',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null
                },
            ], {}
        )
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Suppliers", null, {})
    },
};