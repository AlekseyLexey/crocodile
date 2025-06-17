"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = async (password) => {
      return await bcrypt.hash(password.toString(), 3);
    };
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Cooper",
          email: "Cooper@gmail.com",
          password: await hashPassword("123qwe"),
          point: 0,
        },
        {
          username: "John",
          email: "John@gmail.com",
          password: await hashPassword("123qwe"),
          point: 0,
        },
        {
          username: "Snow",
          email: "Snow@gmail.com",
          password: await hashPassword("123qwe"),
          point: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
