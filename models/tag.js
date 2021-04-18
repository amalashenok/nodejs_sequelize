'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Service, { through: models.ServicesTags });
      Tag.belongsTo(models.Group);
    }
  }
  Tag.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Tag',
      timestamps: true,
      paranoid: true,
    },
  );
  return Tag;
};
