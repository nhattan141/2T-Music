'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Songs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            songName: {
                type: Sequelize.STRING
            },
            singer: {
                type: Sequelize.STRING
            },
            lyrics: {
                type: Sequelize.TEXT
            },
            img: {
                type: Sequelize.STRING
            },
            file: {
                type: Sequelize.STRING
            },
            isRecent: {
                type: Sequelize.STRING
            },
            isTop3: {
                type: Sequelize.STRING
            },
            isNewRelease: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Songs');
    }
};