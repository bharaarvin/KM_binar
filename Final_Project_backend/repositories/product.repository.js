const db = require("../models/index.js");
const Product = db.product;
const Negotiation = db.negotiation;
const { Op } = require("sequelize");
const { sequelize } = require("../models/index.js");
const product = require("../models/product.js");

exports.addProduct = async (data) => {
  const [product, created] = await Product.findOrCreate({
    where: { id_user: data.id_user, name: data.name },
    defaults: data,
  });
  return product;
};

exports.findAll = async () => {
  return await Product.findAll({
    where: { available: true },
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT "Category"."name"
            FROM "Categories" AS "Category"
            WHERE "Category"."id_category" = "Product"."id_category"
          )`),
          "category_name",
        ],
      ],
    },
  });
};

exports.findById = async (id) => {
  return await Product.findByPk(id);
};

exports.findIsThisHisProduct = async (id_user, id_product) => {
  return await Product.findAll({
    where: {
      [Op.and]: [{ id_user }, { id_product }],
    },
  });
};

exports.update = async (product, id_product) => {
  return await Product.update(product, { where: { id_product } });
};

exports.findBeforeDelete = async (id_product) => {
  return await Product.findOne({ where: { id_product } });
};

exports.delete = async (product) => {
  return await product.destroy();
};

exports.findProductByCategory = async (id_category) => {
  return await Product.findAll({
    where: { id_category },
  });
};

exports.restartIncrement = async () => {
  const getLastId = await Product.findOne({ order: [["id_product", "DESC"]] });
  let last = getLastId ? getLastId.id_product + 1 : 1;
  await sequelize.query(`ALTER SEQUENCE "Products_id_product_seq" RESTART WITH ` + last);
};

exports.removeNegotiationBeforeDestroy = async (id_product) => {
  return await Negotiation.destroy({ where: { id_product } });
};

exports.addTotalWishlist = async(product) => {
  return await product.save();
};
