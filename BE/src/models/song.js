'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Song.init({
    songName: DataTypes.STRING,
    singer: DataTypes.STRING,
    lyrics: DataTypes.TEXT,
    img: DataTypes.BLOB,
    file: DataTypes.BLOB,
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};