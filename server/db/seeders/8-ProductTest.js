"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        //25
        { name: "Parrot", price: 25, category_id: 3 },
        { name: "Crocodile", price: 25, category_id: 3 },
        { name: "Whale", price: 25, category_id: 3 },
        { name: "Hedgehog", price: 25, category_id: 3 },
        { name: "Crab", price: 25, category_id: 3 },
        { name: "Camel", price: 25, category_id: 3 },
        { name: "Giraffe", price: 25, category_id: 3 },
        { name: "Turtle", price: 25, category_id: 3 },
        //50
        { name: "Deer", price: 50, category_id: 3 },
        { name: "Cow", price: 50, category_id: 3 },
        { name: "Swan", price: 50, category_id: 3 },
        { name: "Chick", price: 50, category_id: 3 },
        { name: "Chameleon", price: 50, category_id: 3 },
        { name: "Sloth", price: 50, category_id: 3 },
        { name: "Seal", price: 50, category_id: 3 },
        { name: "Elephant", price: 50, category_id: 3 },
        //75
        { name: "Koala", price: 75, category_id: 3 },
        { name: "Flamingo", price: 75, category_id: 3 },
        { name: "Lion", price: 75, category_id: 3 },
        { name: "PolarBear", price: 75, category_id: 3 },
        { name: "Chipmunk", price: 75, category_id: 3 },
        { name: "Raccoon", price: 75, category_id: 3 },
        { name: "Dolphin", price: 75, category_id: 3 },
        { name: "Dinosaur", price: 75, category_id: 3 },
        //100
        { name: "Panda", price: 100, category_id: 3 },
        { name: "Fox", price: 100, category_id: 3 },
        { name: "Corgi", price: 100, category_id: 3 },
        { name: "Bear", price: 100, category_id: 3 },
        { name: "Unicorn", price: 100, category_id: 3 },
        { name: "Penguin", price: 100, category_id: 3 },
        { name: "Owl", price: 100, category_id: 3 },
        { name: "Rabbit", price: 100, category_id: 3 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
