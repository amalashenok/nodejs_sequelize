"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Subcategories", [{
                name: "Развлечения дома",
                isActive: true,
                desc: "Дома с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Творчество",
                isActive: true,
                desc: "Дома с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Познание",
                isActive: true,
                desc: "Дома с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Физическая активность",
                isActive: true,
                desc: "В город с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Развлечения в городе",
                isActive: true,
                desc: "В город с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Культура и познание",
                isActive: true,
                desc: "В город с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Оздоровление",
                isActive: true,
                desc: "На природу с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Культура и познание",
                isActive: true,
                desc: "На природу с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Аренда домиков",
                isActive: true,
                desc: "На природу с детьми",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Площадки",
                isActive: true,
                desc: "День рождения ребенка",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Аниматоры и ведущие",
                isActive: true,
                desc: "День рождения ребенка",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                name: "Идеи подарков",
                isActive: true,
                desc: "День рождения ребенка",
                image: "asset/img/noimage.png",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            }
        ], {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Subcategories", null, {})
    },
}