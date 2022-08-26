"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        id_category: "1",
        name: "Semua",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: "2",
        name: "vehicle",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: "3",
        name: "cloth",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: "4",
        name: "electronic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: "5",
        name: "healthy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_category: "6",
        name: "hobby",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
