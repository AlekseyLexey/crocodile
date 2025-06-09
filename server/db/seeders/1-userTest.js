'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Cooper',
        email: 'Cooper@test.com',
        password: '123',
        point: 10
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
  }
};
