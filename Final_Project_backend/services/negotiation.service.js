const negotiationRepository = require("../repositories/negotiation.repository.js");
const productRepository = require("../repositories/product.repository.js");

exports.findAllNegotiation = async () => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await negotiationRepository.findAll();

    if (!payload.length) {
      result.httpCode = 404;
      result.message = "No Negotiation Data";
      return result;
    }

    result.httpCode = 200;
    result.result = true;
    result.message = "Success Get Data";
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.findNegotiationById = async (id) => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await negotiationRepository.findById(id);

    if (!payload) {
      result.httpCode = 404;
      result.message = "negotiation not Found";
      return result;
    }

    result.httpCode = 200;
    result.result = true;
    result.message = "Success Get negotiation ";
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.createNegotiation = async (data) => {
  const { id_user } = data.userLogged;
  const { id_product, nego_price, has_nego, is_success, status } = data.fields;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const checkIfHasNegotiation = await negotiationRepository.findNegotiation(id_user, id_product);
    if (checkIfHasNegotiation) {
      result.httpCode = 404;
      result.message = "negotiation is exist";
      return result;
    }

    const product = await productRepository.findById(id_product);
    if (!product) {
      result.httpCode = 404;
      result.message = "Product Not Found";
      return result;
    }

    await negotiationRepository.restartIncrement();
    const payload = await negotiationRepository.addNegotiation({
      id_product,
      id_buyer: id_user,
      id_seller: product.id_user,
      nego_time: new Date(),
      nego_price,
      has_nego,
      is_success,
      status,
    });
    if (!payload) {
      result.httpCode = 300;
      result.message = "Add Negotiation Failed";
      return result;
    }

    result.httpCode = 200;
    result.message = "Negotiation add success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.updateNegotiation = async (data) => {
  const { nego_price, has_nego, is_success, status } = data.fields;
  const { id } = data.params;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const checkData = await negotiationRepository.findById(id);

    if (!checkData) {
      result.httpCode = 404;
      result.message = "Negotiation doesn't exist";
      return result;
    }

    const negotiation = {
      nego_price: nego_price ? nego_price : checkData.nego_price,
      has_nego: has_nego ? has_nego : checkData.has_nego,
      is_success: is_success ? is_success : checkData.is_success,
      status: status ? status : checkData.status,
    };

    const payload = await negotiationRepository.update(id, negotiation);

    if (!payload) {
      result.httpCode = 300;
      result.message = "Failed Update Data";
      return result;
    }

    result.httpCode = 200;
    result.message = "Update Negotiation Success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.deleteNegotiation = async (data) => {
  const { id } = data.params;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const checkData = await negotiationRepository.findById(id);

    if (!checkData) {
      result.httpCode = 404;
      result.message = "Negotiation doesn't exist";
      return result;
    }
    await negotiationRepository.delete(checkData);

    result.httpCode = 200;
    result.message = "Delete Negotiation Success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};
