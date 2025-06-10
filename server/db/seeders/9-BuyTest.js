'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Buys', [
      {
        product_id: 1,
        user_id: 1,
      },
      {
        product_id: 2,
        user_id: 2,
      },
      {
        product_id: 3,
        user_id: 3,
      }
    ], {});
 
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Buys', null, {});

  }
};
