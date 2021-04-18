'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('Services', 'CategoryId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Categories',
                key: 'id',
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
            defaultValue: null
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Services', 'CategoryId');
    }
};