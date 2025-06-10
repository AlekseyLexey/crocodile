'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Words', [
        {
        name: "Драккар",
        theme_id: 1
      },
      {
        name: "Ступа",
        theme_id: 2
      },
      {
        name: "Миля",
        theme_id: 3
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Words', null, {});

  }
};
