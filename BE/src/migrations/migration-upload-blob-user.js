'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('users', 'avatar', {
                type: Sequelize.BLOB('long'),
                allowNull: true
            })
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};