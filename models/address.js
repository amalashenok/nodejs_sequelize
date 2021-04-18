'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsToMany(models.Service, { through: models.ServicesAddresses });
    }
  }
  Address.init(
    {
      street: { type: DataTypes.STRING, allowNull: false, unique: true },
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Address',
      timestamps: true,
      paranoid: true,
    },
  );
  return Address;
};
