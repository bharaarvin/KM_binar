const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository.js");

exports.login = async (data) => {
  const payload = await userRepository.findByEmail(data.email);
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    if (!payload) {
      (result.httpCode = 404), (result.message = `User ${data.email} doesn't exist`);
      return result;
    }

    const checkPassword = await bcrypt.compare(data.password, payload.password);
    if (!checkPassword) {
      (result.httpCode = 403), (result.message = "Wrong Password");
      return result;
    }

    result.httpCode = 200;
    result.message = "Login Succesfully";
    result.result = true;
    result.data = payload;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};

exports.register = async (data) => {
  const { email, name, password, id_role } = data;
  let result = { httpCode: null, message: null, result: false, data: null };
  try {
    const payload = await userRepository.findByEmail(email);
    if (payload) {
      (result.httpCode = 403), (result.message = `User ${email} exist`);
      return result;
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const uniqueId = Math.floor(Math.random() * 100) + Number(Date.now());
    const user = {
      name,
      email,
      password: encryptedPassword,
      id_role,
      id_user: uniqueId,
    };

    await userRepository.addUser(user);

    result.httpCode = 200;
    result.message = "Register Succesfully";
    result.result = true;
    return result;
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    return result;
  }
};
