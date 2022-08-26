const db = require("../models/index.js");
const Wishlist = db.wishlist;
const Product = db.product;
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index.js");

exports.findByUserId = async (id_user) => {
  return await sequelize.query(`select * from "Wishlists" w 
where w.id_user = :id_user`,{
    type: QueryTypes.SELECT, 
    replacements: {
      id_user: id_user
    }
  });
};

exports.addWishlist = async (data) => {
    return await Wishlist.create(data);
}

exports.findAll = async () => {
  return await Wishlist.findAll();
};
