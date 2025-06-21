'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Hello kitty',
          price: 10,
          category_id: 1,
        },
        {
          name: 'Pumpkin',
          price: 15,
          category_id: 2,
        },
        {
          name: 'Ava1',
          price: 12,
          category_id: 3,
        },
        {
          name: 'Ava2',
          price: 12,
          category_id: 3,
        },
        {
          name: 'Ava3',
          price: 12,
          category_id: 3,
        },
        {
          name: 'Ava4',
          price: 12,
          category_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
