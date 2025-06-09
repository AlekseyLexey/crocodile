'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('ThemeRooms', [
      {
        theme_id: 1,
        room_id: 1
      }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('ThemeRooms', null, {});

  }
};
