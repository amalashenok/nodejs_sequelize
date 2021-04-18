'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "ServicesTags", [{
                    ServiceId: 1,
                    TagId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 1,
                    TagId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 1,
                    TagId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 1,
                    TagId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 1,
                    TagId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 1,
                    TagId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 2,
                    TagId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 2,
                    TagId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 2,
                    TagId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 3,
                    TagId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 3,
                    TagId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 3,
                    TagId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 3,
                    TagId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 3,
                    TagId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 3,
                    TagId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 3,
                    TagId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 4,
                    TagId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 4,
                    TagId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                {
                    ServiceId: 4,
                    TagId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    TagId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    TagId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    TagId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    TagId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    TagId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    TagId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 6,
                    TagId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 6,
                    TagId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 6,
                    TagId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 6,
                    TagId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 6,
                    TagId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 7,
                    TagId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 7,
                    TagId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 7,
                    TagId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 7,
                    TagId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 7,
                    TagId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 7,
                    TagId: 10,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    TagId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    TagId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    TagId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    TagId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    TagId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    TagId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 9,
                    TagId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 9,
                    TagId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 9,
                    TagId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 9,
                    TagId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 9,
                    TagId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 9,
                    TagId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 9,
                    TagId: 10,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {}
        )
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("ServicesTags", null, {})
    },
};