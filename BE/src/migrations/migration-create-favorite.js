'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Favorites', {
            userID: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            songID: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Favorites');
    }
};