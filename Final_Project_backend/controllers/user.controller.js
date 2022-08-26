const userService = require("../services/user.service.js");
const jwt = require("../util/jwt.util.js");

exports.login = async (request, response) => {
  const { result, httpCode, message, data } = await userService.login(request.fields);
  if (!result) return response.status(httpCode).json({ httpCode: httpCode, message: message });

  const token = await jwt.generateToken({
    id_user: data.id_user,
    email: data.email,
    id_role: data.id_role,
  });

  return response.status(httpCode).json({
    httpCode,
    message,
    token,
  });
};

exports.register = async (request, response) => {
  const { httpCode, message } = await userService.register(request.fields);

  return response.status(httpCode).json({
    httpCode,
    message,
  });
};

exports.validateAuth = async (request, response) => {
  const { httpCode, isValid, message, data } = await jwt.verifyToken(request.fields.token);

  return response.status(httpCode).json({
    httpCode,
    isValid,
    data,
    message,
  });
};
