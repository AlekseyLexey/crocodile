'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Themes', [
      {
        name: 'Лапки и хвостики'
      },
      {
        name: 'Тайна холодильника'
      },
      {
        name: 'Поттериада'
      },
      {
        name: 'Безумный зоопарк'
      },
      {
        name: 'Мульт-кавардак'
      },
      {
        name: 'Гонки на диване'
      },
      {
        name: 'Игрушки-бунтари'
      },
      {
        name: 'Древний трэш'
      },
      {
        name: 'Монстры в тапках'
      },
      {
        name: 'Консольный бардак'
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Themes', null, {});

  }
};
