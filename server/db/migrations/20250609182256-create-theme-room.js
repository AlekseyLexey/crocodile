'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ThemeRooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      theme_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Themes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ThemeRooms');
  }
};