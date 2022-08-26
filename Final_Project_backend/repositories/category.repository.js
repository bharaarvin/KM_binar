const { sequelize } = require("../models/index.js");
const db = require("../models/index.js");
const Category = db.category;

exports.findAll = async () => {
  return await Category.findAll();
};

exports.findById = async (id) => {
  return await Category.findByPk(id);
};

exports.addCategory = async (data) => {
  return await Category.create(data);
};

exports.update = async (id_category, data) => {
  return await Category.update(data, { where: { id_category } });
};

exports.delete = async (data) => {
  return await data.destroy();
};

exports.findByName = async (name) => {
  return await Category.findOne({ where: { name } });
};

exports.restartIncrement = async () => {
  const getLastId = await Category.findOne({ order: [["id_category", "DESC"]] });
  let last = getLastId ? getLastId.id_category + 1 : 1;
  return await sequelize.query(`ALTER SEQUENCE "Categories_id_category_seq" RESTART WITH ` + last);
};
