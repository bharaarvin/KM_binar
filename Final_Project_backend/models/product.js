'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category);
      Product.belongsTo(models.User);
      Product.hasMany(models.Transaction);
      Product.hasMany(models.Wishlist);
      Product.hasMany(models.Negotiation);
    }
  }
  Product.init(
    {
      id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      id_category: DataTypes.INTEGER,
      total_wishlist: DataTypes.INTEGER,
      total_sold: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      photo: {
        type: DataTypes.STRING,
        get() {
          const foto = this.getDataValue("photo")?.split(";");
          return foto?.filter((item) => item !== "");
        },
        set(val) {
          this.setDataValue("photo", (val += ";"));
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
