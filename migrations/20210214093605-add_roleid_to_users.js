 'use strict';

 module.exports = {
     up: async(queryInterface, Sequelize) => {
         await queryInterface.addColumn('Users', 'RoleId', {
             type: Sequelize.INTEGER,
             references: {
                 model: 'Roles',
                 key: 'id',
             },
             onUpdate: 'NO ACTION',
             onDelete: 'NO ACTION',
             defaultValue: null
         });
     },

     down: async(queryInterface, Sequelize) => {
         await queryInterface.removeColumn('Users', 'RoleId');
     }
 };