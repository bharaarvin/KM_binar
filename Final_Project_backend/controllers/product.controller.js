const productService = require("../services/product.service.js");

exports.findAllProductsApi = async (request, response) => {
  const { httpCode, message, data } = await productService.findAllProduct();
  response.status(httpCode).json({ httpCode, data, message });
};

exports.createProduct = async (request, response) => {
  if (request.userLogged.id_role == 2)
    return response.status(403).json({
      httpCode: 403,
      message: "you dont have access for this feature!",
    });

  const { httpCode, message } = await productService.createProduct(request);
  return response.status(httpCode).json({ httpCode, message });
};

exports.findProductsByIdApi = async (request, response) => {
  const { httpCode, message, data } = await productService.findProductById(request);
  return response.status(httpCode).json({ httpCode, message, data });
};

exports.UpdateProductsApi = async (request, response) => {
  if (request.userLogged.id_role == 2)
    return response.status(403).json({
      httpCode: 403,
      message: "you dont have access for this feature!",
    });

  const { httpCode, message } = await productService.updateProduct(request);
  return response.status(httpCode).json({ httpCode, message });
};

exports.deleteProductsApi = async (request, response) => {
  if (request.userLogged.id_role == 2)
    return response.status(403).json({
      httpCode: 403,
      message: "you dont have access for this feature!",
    });

  const { httpCode, message } = await productService.deleteProduct(request);
  return response.status(httpCode).json({
    httpCode,
    message,
  });
};

exports.findProductsByCategoryApi = async (request, response) => {
  const { httpCode, message, data } = await productService.productByCategory(request);

  return response.status(httpCode).json({
    httpCode,
    message,
    data,
  });
};

exports.findProductsByCategoryApi = async (request, response) => {
  const { httpCode, message, data } = await productService.productByCategory(request);

  return response.status(httpCode).json({
    httpCode,
    message,
    data,
  });
};
