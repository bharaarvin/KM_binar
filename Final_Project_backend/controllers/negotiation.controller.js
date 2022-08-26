const negotiationService = require("../services/negotiation.service.js");

exports.findAllNegotiationsApi = async (request, response) => {
  const { httpCode, message, data } = await negotiationService.findAllNegotiation();
  response.status(httpCode).json({ httpCode, data, message });
};

exports.findNegotiationByIdApi = async (request, response) => {
  const { httpCode, message, data } = await negotiationService.findNegotiationById(request.params.id);
  return response.status(httpCode).json({ httpCode, message, data });
};

exports.createNegotiationApi = async (request, response) => {
  if (request.userLogged.id_role == 1)
    return response.status(403).json({
      httpCode: 403,
      message: "you dont have access for this feature!",
    });

  const { httpCode, message } = await negotiationService.createNegotiation(request);
  return response.status(httpCode).json({ httpCode, message });
};

exports.updateNegotiationApi = async (request, response) => {
  const { httpCode, message } = await negotiationService.updateNegotiation(request);
  return response.status(httpCode).json({ httpCode, message });
};

exports.deleteNegotiationByIdApi = async (request, response) => {
  const { httpCode, message } = await negotiationService.deleteNegotiation(request);
  return response.status(httpCode).json({ httpCode, message });
};
