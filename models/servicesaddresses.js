'use strict';
const { Model } = require('sequelize');
const Service = require('./service');
const Address = require('./address');

module.exports = (sequelize, DataTypes) => {
  class ServicesAddresses extends Model {}

  ServicesAddresses.init(
    {
      ServiceId: {
        type: DataTypes.INTEGER,
        references: { model: Service, key: 'id' },
      },
      AddressId: {
        type: DataTypes.INTEGER,
        references: { model: Address, key: 'id' },
      },
    },
    {
      sequelize,
      modelName: 'ServicesAddresses',
    },
  );
  return ServicesAddresses;
};
