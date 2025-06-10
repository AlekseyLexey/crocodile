'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('ThemeRooms', [
      {
        theme_id: 1,
        room_id: 1
      },
      {
        theme_id: 2,
        room_id: 2
      },
      {
        theme_id: 3,
        room_id: 3
      }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('ThemeRooms', null, {});

  }
};
