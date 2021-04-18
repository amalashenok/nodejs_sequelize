'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.hasMany(models.Invoice, { as: 'invoices' });
    }
  }
  Session.init(
    {
      ssid: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING },
      phone: { type: DataTypes.INTEGER },
      email: DataTypes.STRING,
      city: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Session',
      timestamps: true,
      paranoid: true,
    },
  );
  return Session;
};
