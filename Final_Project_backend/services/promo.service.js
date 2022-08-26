const promoRepository = require("../repositories/promo.repository.js");
const cdn = require("../config/cloudinary.config.js");

exports.findAllPromo = async () => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await promoRepository.findAll();

    if (!payload) {
      result.httpCode = 400;
      result.message = "No Promo Data";
      return result;
    }

    result.httpCode = 200;
    result.result = true;
    result.message = "Success Get Data";
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 200;
    result.message = err;
    return result;
  }
};

exports.findPromoById = async (data) => {
  let result = { httpCode: null, message: null, result: false, data: null };
  const payload = await promoRepository.findById(Number(data));

  if (!payload) {
    result.httpCode = 404;
    result.message = "Promo not Found";
    return result;
  }

  result.httpCode = 200;
  result.result = true;
  result.message = "Success Get Promo";
  result.data = payload;
  return result;
};

exports.createPromo = async (data) => {
  const { url } = data.fields;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    let promo = {
      url,
    };
    if (data.files.photo?.path) {
      const uploadPhoto = await cdn.uploader.upload(data.files.photo.path);
      promo.photo = uploadPhoto.secure_url;
    }
    await promoRepository.addPromo(promo);
    result.httpCode = 200;
    result.message = "Promo Ready to Sell";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.updatePromo = async (data) => {
  const { id } = data.params;
  const { url, isPhotoChange } = data.fields;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const promoById = await promoRepository.findById(id);
    if (!promoById) {
      result.httpCode = 400;
      result.message = "Promo not Found";
      return result;
    }
    let promo = {
      photo: data.files?.photo ? "" : promoById.photo,
      url: url ? url : promoById.url,
    };

    if (data.files.photo?.path && isPhotoChange) {
      const uploadPhoto = await cdn.uploader.upload(data.files.photo.path);
      promo.photo = uploadPhoto.secure_url;
    }

    const payload = await promoRepository.update(promo, id);

    if (!payload) {
      result.httpCode = 300;
      result.message = "Failed to Update Data";
      return result;
    }
    result.httpCode = 200;
    result.message = "Update Promo Success";
    result.result = true;
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.deletePromo = async (id) => {
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const promoById = await promoRepository.findById(id);

    if (!promoById) {
      result.httpCode = 404;
      result.message = "Promo not Found";
      return result;
    }

    const payload = await promoRepository.delete(promoById);
    result.httpCode = 200;
    result.message = "Delete Promo Success";
    result.result = true;
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};
