"use strict"
const bccryptjs = require("bcryptjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Invoices",
            [
                {
                    name: "",
                    isActive: true,
                    status: "new",
                    phone: 9182086821,
                    date: "2021.02.25",
                    persons: 5,
                    ServiceId: 1,
                    description: "Заявка на размещение",
                    email: "wilde@bk.ru",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
            ],
            {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Invoices", null, {})
    },
}
