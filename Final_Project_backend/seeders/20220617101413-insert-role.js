"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Roles", [
      {
        id_role: "1",
        name: "seller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_role: "2",
        name: "buyer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_role: "3",
        name: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_role: "4",
        name: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
