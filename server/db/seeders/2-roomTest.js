'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Rooms',
      [
        {
          pictures: 'picture',
          status: 'status',
          name: 'Clever owls',
          owner_id: 1,
        },
        {
          pictures: 'Draw',
          status: 'GOOD',
          name: 'Отчаянные домохозяйки',
          owner_id: 1,
        },
        {
          pictures: 'Photo',
          status: 'BAD',
          name: 'Ходящие в бар',
          owner_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {});
  },
};
