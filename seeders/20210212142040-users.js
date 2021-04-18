'use strict';
const bccryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Wilde',
          lastName: 'Rasta',
          email: 'wilde@bk.ru',
          status: true,
          password: bccryptjs.hashSync('123', bccryptjs.genSaltSync(8)),
          RoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          firstName: 'user',
          lastName: 'user',
          email: 'user2@user.ru',
          status: true,
          password: bccryptjs.hashSync('123', bccryptjs.genSaltSync(8)),
          RoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
