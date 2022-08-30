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
      Song.belongsToMany(models.User, { as: 'songs', through: models.Favorite, foreignKey: "id" });
      // models.User.belongsToMany(models.Song, { through: models.Favorite, foreignKey: "id" })
      // Song.hasMany(models.Favorite)
      // models.Favorite.belongsTo(models.User, {
      //       foreignKey: 'userID'
      //   });
      Song.sync()
    }
  };
  Song.init({
    songName: DataTypes.STRING,
    singer: DataTypes.STRING,
    lyrics: DataTypes.TEXT,
    img: DataTypes.STRING,
    file: DataTypes.STRING,
    isRecent: DataTypes.STRING,
    isTop3: DataTypes.STRING,
    isNewRelease: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};