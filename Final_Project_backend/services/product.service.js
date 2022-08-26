const productRepository = require("../repositories/product.repository.js");
const cdn = require("../config/cloudinary.config.js");

exports.findAllProduct = async () => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await productRepository.findAll();

    result.httpCode = 200;
    result.result = true;
    result.message = payload.length > 0 ? "Success Get Data" : "No data product";
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.findProductById = async (data) => {
  const { id } = data.params;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await productRepository.findById(id);

    if (!payload) {
      result.httpCode = 404;
      result.message = "Product not Found";
      return result;
    }

    result.httpCode = 200;
    result.result = true;
    result.message = "Success Get Product";
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.createProduct = async (data) => {
  const { id_user } = data.userLogged;
  const { name, price, quantity, description, id_category, total_wishlist, total_sold } = data.fields;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    let product = {
      id_user,
      name,
      price,
      id_category,
      quantity: quantity ? quantity : 1,
      description,
      total_wishlist,
      total_sold,
      available: true,
    };

    if (data.files.photo?.path) {
      const uploadPhoto = await cdn.uploader.upload(data.files.photo.path);
      product.photo = uploadPhoto.secure_url;
    } else {
      product.photo = "";
    }

    await productRepository.restartIncrement();
    await productRepository.addProduct(product);

    result.httpCode = 200;
    result.message = "Product Ready to Sell";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.updateProduct = async (data) => {
  const { id_user } = data.userLogged;
  const { id } = data.params;
  const { name, price, quantity, description, id_category, isPhotoChange, available } = data.fields;
  let result = { httpCode: null, message: null, result: false, data: null };
  const theProduct = await productRepository.findById(id);
  if (!theProduct) {
    result.httpCode = 404;
    result.message = "Product not Found";
    return result;
  }

  const checkIsThisHisProduct = await productRepository.findIsThisHisProduct(id_user, id);
  if (!checkIsThisHisProduct.length) {
    result.httpCode = 403;
    result.message = "You Dont have to access this product!";
    result.result = true;
    return result;
  }

  try {
    let product = {
      name: name ? name : theProduct.name,
      price: price ? price : theProduct.price,
      quantity: quantity ? quantity : theProduct.quantity,
      description: description ? description : theProduct.description,
      id_category: id_category ? id_category : theProduct.id_category,
      available: available ? available : theProduct.available,
    };

    if (data.files.photo?.path && isPhotoChange) {
      const uploadPhoto = await cdn.uploader.upload(data.files.photo.path);
      product.photo = uploadPhoto.secure_url;
    }

    const payload = await productRepository.update(product, id);

    if (!payload) {
      result.httpCode = 300;
      result.message = "Failed to Update Data";
      return result;
    }
    result.httpCode = 200;
    result.message = "Update Product Success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.deleteProduct = async (data) => {
  const { id_user } = data.userLogged;
  const { id } = data.params;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const searchProduct = await productRepository.findBeforeDelete(id);

    const checkIsThisHisProduct = await productRepository.findIsThisHisProduct(id_user, id);
    if (!checkIsThisHisProduct.length) {
      result.httpCode = 403;
      result.message = "You Dont have to access this product!";
      result.result = true;
      return result;
    }

    if (!searchProduct) {
      result.httpCode = 404;
      result.message = "Product not Found";
      return result;
    }

    await productRepository.removeNegotiationBeforeDestroy(id);
    await productRepository.delete(searchProduct);
    result.httpCode = 200;
    result.message = "Delete Product Success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.productByCategory = async (data) => {
  const { category } = data.params;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await productRepository.findProductByCategory(category);

    result.httpCode = 200;
    result.result = true;
    result.message = !payload.length ? "Success Get Product" : "No Product at this Category";
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};
