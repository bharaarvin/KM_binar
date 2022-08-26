const wishlistRepository = require("../repositories/wishlist.repository.js");
const productRepository = require("../repositories/product.repository.js");

exports.findAllWishlist = async () => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await wishlistRepository.findAll();

    if (!payload.length) {
      result.httpCode = 404;
      result.message = "No Wishlist";
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

exports.findWishlistUserId = async (data) => {
  const {id_user} = data.fields;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await wishlistRepository.findByUserId(id_user);

    if (!payload) {
      result.httpCode = 404;
      result.message = "Wishlist not Found";
      return result;
    }

    result.httpCode = 200;
    result.result = true;
    result.message = "Success Get Wishlist";
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.createWishlist = async (data) => {
  const { id_user } = data.userLogged;
  const { id_product } = data.fields;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const product = await productRepository.findById(id_product);
    if (!product) {
      result.httpCode = 404;
      result.message = "Product Not Found";
      return result;
    }

    const payload = await wishlistRepository.addWishlist({
        id_user: id_user,
        id_product,
    });
    if (!payload) {
      result.httpCode = 300;
      result.message = "Add Wishlist Failed";
      return result;
    }

    product.total_wishlist += 1;
    productRepository.addTotalWishlist(product);
    result.httpCode = 200;
    result.message = "Add Wishlist success";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

