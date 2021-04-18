'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("ServicesTags", {
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
            TagId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Tags',
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
        await queryInterface.dropTable('ServicesTags');
    }
}