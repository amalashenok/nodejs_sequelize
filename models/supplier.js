'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate(models) {
      Supplier.hasMany(models.Service, { as: 'services' });
    }
  }
  Supplier.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Supplier',
      timestamps: true,
      paranoid: true,
    },
  );
  return Supplier;
};
