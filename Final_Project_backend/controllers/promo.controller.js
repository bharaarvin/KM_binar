const promoService = require("../services/promo.service.js");

exports.findAllPromosApi = async (request, response) => {
  const { httpCode, message, data } = await promoService.findAllPromo();
  response.status(httpCode).json({ httpCode, data, message });
};

exports.createPromo = async (request, response) => {
  const { httpCode, message } = await promoService.createPromo(request);

  return response.status(httpCode).json({ httpCode, message });
};

exports.findPromosByIdApi = async (request, response) => {
  const { httpCode, message, data } = await promoService.findPromoById(request.params.id);

  return response.status(httpCode).json({ httpCode, message, data });
};

exports.UpdatePromosApi = async (request, response) => {
  const { httpCode, message, data } = await promoService.updatePromo(request);

  return response.status(httpCode).json({ httpCode, message, data });
};

exports.deletePromosApi = async (request, response) => {
  const { httpCode, message } = await promoService.deletePromo(request.params.id);

  return response.status(httpCode).json({ httpCode, message });
};
