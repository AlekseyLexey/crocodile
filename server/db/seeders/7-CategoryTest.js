'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Categories', [
      {
        name: 'Стикеры'
      },
      {
        name: 'Фон'
      },
      {
        name: 'Аватар'
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Categories', null, {});

  }
};
