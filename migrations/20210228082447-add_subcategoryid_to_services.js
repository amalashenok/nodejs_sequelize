'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('Services', 'SubcategoryId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Subcategories',
                key: 'id',
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
            defaultValue: null
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Services', 'SubcategoryId');
    }
};