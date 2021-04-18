"use strict"

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Categories", [{
                    name: "Дома с детьми",
                    isActive: true,
                    desc: "Дома с детьми",
                    image: "asset/img/noimage.png",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                {
                    name: "В город с детьми",
                    isActive: true,
                    desc: "В город с детьми",
                    image: "asset/img/noimage.png",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                {
                    name: "На природу с детьми",
                    isActive: true,
                    desc: "На природу с детьми",
                    image: "asset/img/noimage.png",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                {
                    name: "День рождения ребенка",
                    isActive: true,
                    desc: "День рождения ребенка",
                    image: "asset/img/noimage.png",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
            ], {}
        )
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Categories", null, {})
    },
}