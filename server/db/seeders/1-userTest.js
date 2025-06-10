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
      },
      {
        username: 'John',
        email: 'John@test.com',
        password: '456',
        point: 15
      },
      {
        username: 'Snow',
        email: 'Snow@test.com',
        password: '789',
        point: 20
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
  }
};
