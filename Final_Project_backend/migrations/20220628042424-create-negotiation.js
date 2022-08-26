"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Negotiations", {
      id_nego: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id_product",
        },
      },
      id_buyer: {
        type: Sequelize.STRING,
      },
      id_seller: {
        type: Sequelize.STRING,
      },
      nego_time: {
        type: Sequelize.DATE,
      },
      nego_price: {
        type: Sequelize.INTEGER,
      },
      has_nego: {
        type: Sequelize.BOOLEAN,
      },
      is_success: {
        type: Sequelize.BOOLEAN,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Negotiations");
  },
};
