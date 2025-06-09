'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('UserRooms', [
        {
        user_id: 1,
        room_id: 1,
        point: 10
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('UserRooms', null, {});
     
  }
};
