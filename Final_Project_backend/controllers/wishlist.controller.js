const wishlistService = require("../services/wishlist.service.js");

exports.findAllWishlistsApi = async (request, response) => {
  const { httpCode, message, data } = await wishlistService.findAllWishlist();
  response.status(httpCode).json({ httpCode, data, message });
};

exports.createWishlistApi = async (request, response) => {
  const { httpCode, message } = await wishlistService.createWishlist(request);
  return response.status(httpCode).json({ httpCode, message });
};

exports.findWishlistByUserIdApi = async (request, response) => {
  const { httpCode, message, data } = await wishlistService.findWishlistUserId(request);
  return response.status(httpCode).json({ httpCode, message, data });
};