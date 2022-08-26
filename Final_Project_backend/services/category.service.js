const categoryRepository = require("../repositories/category.repository.js");

exports.findAllCategory = async () => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await categoryRepository.findAll();

    if (!payload) {
      result.httpCode = 404;
      result.message = "No Data Category";
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

exports.findCategoryById = async (id) => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await categoryRepository.findById(id);

    if (!payload) {
      result.httpCode = 404;
      result.message = "Category not Found";
      return result;
    }

    result.httpCode = 200;
    result.result = true;
    result.message = "Success Get Category ";
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.createCategory = async (data) => {
  const { name } = data;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const findByname = await categoryRepository.findByName(name);

    if (findByname) {
      result.httpCode = 404;
      result.message = "Category is exist";
      return result;
    }

    await categoryRepository.restartIncrement();
    const payload = await categoryRepository.addCategory({
      name,
    });

    if (!payload) {
      result.httpCode = 400;
      result.message = "Add Category Failed";
      return result;
    }
    result.httpCode = 200;
    result.message = "Category add success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.updateCategory = async (data) => {
  const { id } = data.params;
  const { name } = data.fields;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const theCategory = await categoryRepository.findById(id);

    if (!theCategory) {
      result.httpCode = 404;
      result.message = "Category doesn't exist";
      return result;
    }

    const category = {
      name: name ? name : theCategory.name,
    };
    const payload = await categoryRepository.update(id, category);
    if (!payload) {
      result.httpCode = 404;
      result.message = "Failed Update Data";
      return result;
    }

    result.httpCode = 200;
    result.message = "Update Category Success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.deleteCategory = async (id) => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const theCategory = await categoryRepository.findById(id);
    if (!theCategory) {
      result.httpCode = 404;
      result.message = "Category not Found";
      return result;
    }

    await categoryRepository.delete(theCategory);

    result.httpCode = 200;
    result.message = "Delete Category Success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};
