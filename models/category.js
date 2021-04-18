'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Service, { as: 'services' });
    }
  }
  Category.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Category',
      timestamps: true,
      paranoid: true,
    },
  );
  return Category;
};
