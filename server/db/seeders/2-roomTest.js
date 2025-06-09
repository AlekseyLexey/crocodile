'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.bulkInsert('Rooms', [
      {
        pictures: 'picture',
        status: 'status',
        name: 'Clever owls'
      },
      {
        pictures: 'Draw',
        status: 'GOOD',
        name: 'Отчаянные домохозяйки'
      },
      {
        pictures: 'Photo',
        status: 'BAD',
        name: 'Ходящие в бар'
      }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Rooms', null, {});

  }
};
