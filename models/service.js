'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.Category);
      Service.belongsToMany(models.Tag, { through: models.ServicesTags });
      Service.hasMany(models.Invoice, { as: 'invoices' });
      Service.belongsToMany(models.Address, { through: models.ServicesAddresses });
      Service.belongsTo(models.Supplier);
      Service.belongsTo(models.Subcategory);
      Service.hasMany(models.Image);
    }
  }
  Service.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      image: DataTypes.STRING,
      content: DataTypes.STRING,
      description: DataTypes.TEXT,
      isActive: DataTypes.BOOLEAN,
      rate: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      worktime: DataTypes.STRING,
      limits: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Service',
      timestamps: true,
      paranoid: true,
    },
  );
  return Service;
};
