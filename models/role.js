'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { as: 'users' });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Role',
      timestamps: true,
      paranoid: true,
    },
  );
  return Role;
};
