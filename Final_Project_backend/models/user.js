"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        as: "products",
        foreignKey: "id_user",
      });
      User.hasMany(models.Transaction, {
        as: "transactions",
        foreignKey: "id_user",
      });
      User.hasMany(models.Wishlist, {
        as: "wishlists",
        foreignKey: "id_user",
      });
      User.belongsTo(models.Role);
    }
  }
  User.init(
    {
      id_user: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      id_role: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: {
        // needs to be unique
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
