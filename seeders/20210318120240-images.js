"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "Images",
            [
                {
                    name: "noimage.png",
                    type: "primary",
                    ServiceId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                {
                    name: "noimage.png",
                    type: "secondary",
                    ServiceId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                {
                    name: "noimage.png",
                    type: "secondary",
                    ServiceId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                {
                    name: "noimage.png",
                    type: "secondary",
                    ServiceId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },

            ],
            {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("Images", null, {})
    },
}