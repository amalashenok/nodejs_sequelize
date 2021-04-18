'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    static associate(models) {
      Subcategory.hasMany(models.Service, { as: 'services' });
    }
  }
  Subcategory.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Subcategory',
      timestamps: true,
      paranoid: true,
    },
  );
  return Subcategory;
};
