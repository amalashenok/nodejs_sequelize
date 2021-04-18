'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.belongsTo(models.Service);
      Invoice.belongsTo(models.Session);
    }
  }
  Invoice.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      status: {
        type: DataTypes.ENUM,
        values: ['new', 'pending', 'close'],
      },
      phone: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      persons: DataTypes.INTEGER,
      description: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Invoice',
      timestamps: true,
      paranoid: true,
    },
  );
  return Invoice;
};
