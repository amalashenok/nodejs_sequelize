'use strict';
const bccryptjs = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role);
    }

    async validPassword(password) {
      return await bccryptjs.compare(password, this.password);
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      status: DataTypes.BOOLEAN,
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
    },
  );

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bccryptjs.hash(user.password, bccryptjs.genSaltSync(8));
    user.password = hashedPassword;
  });

  User.beforeBulkUpdate(async user => {
    user.attributes.password = bccryptjs.hashSync(user.attributes.password, 7);
  });

  return User;
};
