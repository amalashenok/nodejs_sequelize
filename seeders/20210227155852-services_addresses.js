'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert(
            "ServicesAddresses", [
                {
                    ServiceId: 4,
                    AddressId: 13,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    AddressId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    AddressId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    AddressId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 5,
                    AddressId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 6,
                    AddressId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 6,
                    AddressId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 7,
                    AddressId: 7,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    AddressId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    AddressId: 9,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    AddressId: 10,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 8,
                    AddressId: 11,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ServiceId: 9,
                    AddressId: 12,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ], {}
        )
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete("ServicesAddresses", null, {})
    },
};