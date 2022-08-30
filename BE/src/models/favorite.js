'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Favorite.belongsTo(models.Song);
        }
    };
    Favorite.init({
        userID: DataTypes.INTEGER,
        songID: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Favorite',
    });
    // Favorite.associate = models => {
    //     Favorite.belongsTo(models.User, {
    //         foreignKey: 'userID'
    //     });
    //     Favorite.belongsTo(models.Song, {
    //         foreignKey: 'songID'
    //     });
    // }
    return Favorite;
};