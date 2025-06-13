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
          email: "Cooper@test.com",
          password: await hashPassword("1234"),
          point: 10,
        },
        {
          username: "John",
          email: "John@test.com",
          password: await hashPassword("1234"),
          point: 15,
        },
        {
          username: "Snow",
          email: "Snow@test.com",
          password: await hashPassword("1234"),
          point: 20,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
