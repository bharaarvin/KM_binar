const { sequelize } = require("../models/index.js");
const db = require("../models/index.js");
const Negotiation = db.negotiation;
const { Op } = require("sequelize");

exports.findAll = async () => {
  return await Negotiation.findAll();
};

exports.findById = async (id) => {
  return await Negotiation.findByPk(id);
};

exports.addNegotiation = async (data) => {
  return await Negotiation.create(data);
};

exports.update = async (id_nego, data) => {
  return await Negotiation.update(data, { where: { id_nego } });
};

exports.delete = async (data) => {
  return await data.destroy();
};

exports.findAllDesc = async () => {
  return await Negotiation.findOne({ order: [["id_nego", "DESC"]] });
};

exports.findNegotiation = async (id_buyer, id_product) => {
  return await Negotiation.findOne({
    where: {
      [Op.and]: [{ id_buyer }, { id_product }, { has_nego: true }],
    },
  });
};

exports.restartIncrement = async () => {
  const getLastId = await Negotiation.findOne({ order: [["id_product", "DESC"]] });
  let last = getLastId ? getLastId.id_product + 1 : 1;
  await sequelize.query(`ALTER SEQUENCE "Negotiations_id_nego_seq" RESTART WITH ` + last);
};
