"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Negotiation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Negotiation.belongsTo(models.Product);
    }
  }
  Negotiation.init(
    {
      id_nego: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_product: DataTypes.INTEGER,
      id_buyer: DataTypes.STRING,
      id_seller: DataTypes.STRING,
      nego_time: DataTypes.DATE,
      nego_price: DataTypes.INTEGER,
      has_nego: DataTypes.BOOLEAN,
      is_success: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Negotiation",
    }
  );
  return Negotiation;
};
