'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('songs', 'img', {
                type: Sequelize.BLOB('long'),
                allowNull: true
            }),
            queryInterface.changeColumn('songs', 'file', {
                type: Sequelize.BLOB('long'),
                allowNull: true
            }),
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('songs');
    }
};