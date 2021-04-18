'use strict';
const { Model } = require('sequelize');
const Service = require('./service');
const Tag = require('./tag');

module.exports = (sequelize, DataTypes) => {
  class ServicesTags extends Model {}

  ServicesTags.init(
    {
      ServiceId: {
        type: DataTypes.INTEGER,
        references: { model: Service, key: 'id' },
      },
      TagId: {
        type: DataTypes.INTEGER,
        references: { model: Tag, key: 'id' },
      },
    },
    {
      sequelize,
      modelName: 'ServicesTags',
    },
  );
  return ServicesTags;
};
