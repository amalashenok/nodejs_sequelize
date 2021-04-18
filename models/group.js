'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.Tag);
    }
  }
  Group.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      color: { type: DataTypes.STRING, allowNull: true, defaultValue: "#FFFFFF" },
    },
    {
      sequelize,
      modelName: 'Group',
      timestamps: true,
      paranoid: true,
    },
  );
  return Group;
};