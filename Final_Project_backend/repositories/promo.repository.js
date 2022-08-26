const db = require("../models/index.js");
const Promo = db.promo;

exports.addPromo = async (data) => {
  return await Promo.create(data);
};

exports.findAll = async () => {
  return await Promo.findAll();
};

exports.update = async (promo, id_promo) => {
  return await Promo.update(promo, { where: { id_promo } });
};

exports.delete = async (promo) => {
  return await promo.destroy();
};

exports.findById = async (id) => {
  return await Promo.findByPk(id);
};

exports.restartIncrement = async () => {
  const getLastId = await Promo.findOne({ order: [["id_product", "DESC"]] });
  let last = getLastId ? getLastId.id_product + 1 : 1;
  await sequelize.query(`ALTER SEQUENCE "Promos_id_promo_seq" RESTART WITH ` + last);
};
