"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wishlists", {
      id_wishlist: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id_user",
        },
      },
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id_product",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Wishlists");
  },
};
