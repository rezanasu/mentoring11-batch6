'use strict';

const fs = require("fs");

let data = fs.readFileSync("./games.json", "utf-8");


data = JSON.parse(data).map((element) => {
  return {
    title: element.title,
    categories: element.categories,
    year: element.year,
    platforms: element.platforms,
    createdAt: new Date(),
    updatedAt: new Date()
  }
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert("Games", data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
