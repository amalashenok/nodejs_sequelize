'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("ServicesAddresses", {
            ServiceId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Services',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                defaultValue: null
            },
            AddressId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Addresses',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                defaultValue: null
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },

        })
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('ServicesAddresses');
    }
}