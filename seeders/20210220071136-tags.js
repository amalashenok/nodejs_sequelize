"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Tags", [{
                name: "#рейтинг_5",
                isActive: true,
                GroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#дети_3+",
                isActive: true,
                GroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#дети_12+",
                isActive: true,
                GroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#антистресс",
                isActive: true,
                GroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#креативность",
                isActive: true,
                GroupId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#коммуникация",
                isActive: true,
                GroupId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#концентрация",
                isActive: true,
                GroupId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#физическое_развитие",
                isActive: true,
                GroupId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#в_помещении",
                isActive: true,
                GroupId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "#на_улице",
                isActive: true,
                GroupId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
        ], {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Tags", null, {})
    },
}