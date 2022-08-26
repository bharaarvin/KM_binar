const categoryService = require("../services/category.service.js");

exports.findAllCategorysApi = async (request, response) => {
  const { httpCode, message, data } = await categoryService.findAllCategory();
  response.status(httpCode).json({ httpCode, data, message });
};

exports.findCategoryByIdApi = async (request, response) => {
  const { httpCode, message, data } = await categoryService.findCategoryById(request.params.id);
  return response.status(httpCode).json({ httpCode, message, data });
};

exports.createCategoryApi = async (request, response) => {
  const { httpCode, message } = await categoryService.createCategory(request.fields);
  return response.status(httpCode).json({ httpCode, message });
};

exports.updateCategoryApi = async (request, response) => {
  const { httpCode, message } = await categoryService.updateCategory(request);
  return response.status(httpCode).json({ httpCode, message });
};

exports.deleteCategoryByIdApi = async (request, response) => {
  const { httpCode, message } = await categoryService.deleteCategory(request.params.id);
  return response.status(httpCode).json({ httpCode, message });
};
