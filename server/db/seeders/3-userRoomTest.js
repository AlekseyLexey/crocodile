'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('UserRooms', [
      {
        user_id: 1,
        room_id: 1,
        point: 10
      },
      {
        user_id: 2,
        room_id: 2,
        point: 15
      },
      {
        user_id: 3,
        room_id: 3,
        point: 20
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('UserRooms', null, {});
     
  }
};
