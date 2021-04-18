'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn("Services", "worktime", {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        })
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Services", "worktime");
    }
};