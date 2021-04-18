'use strict';
const { Model } = require('sequelize');
const { options } = require('../routes/imagesRouter');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Service);
    }
  }
  Image.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.ENUM, values: ['primary', 'secondary'] }
    },
    {
      sequelize,
      modelName: 'Image',
      timestamps: true,
      paranoid: true,
    }
  );

  Image.beforeCreate(async (image, options) => {

    if (image.type === 'primary') {
      const img = await Image.findOne({ where: { type: 'primary', ServiceId: image.ServiceId } });
      if (img) {
        throw new Error("Primary image was already set for this service " + image.ServiceId);
      }
    }
  });

  return Image;
};