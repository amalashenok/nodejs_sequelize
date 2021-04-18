'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('Services', 'SupplierId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Suppliers',
                key: 'id',
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
            defaultValue: null
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Services', 'SupplierId');
    }
};