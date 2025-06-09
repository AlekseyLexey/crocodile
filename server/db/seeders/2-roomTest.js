'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Rooms', [
      {
        pictures: 'picture',
        status: 'status',
        name: 'Clever owls'
      }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Rooms', null, {});

  }
};
