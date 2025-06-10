'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Themes', [
      {
        name: 'История'
      },
      {
        name: 'Всякая всячина'
      },
      {
        name: 'Кино'
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Themes', null, {});

  }
};
