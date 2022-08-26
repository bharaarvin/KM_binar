import axios from "axios";
import * as API from "./urlList";

export const loginAuth = async (data) => {
  let config = {
    method: "post",
    url: API.BASE_URL + API.PATH_LOGIN,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  let result;

  await axios(config)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error.response.data;
    });

  return result;
};

export const registerAuth = async (data) => {
  let config = {
    method: "post",
    url: API.BASE_URL + API.PATH_REGISTER,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  let result;

  await axios(config)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error.response.data;
    });

  return result;
};

export const verifyToken = async (token) => {
  let config = {
    method: "post",
    url: API.BASE_URL + API.PATH_VALIDATE_AUTH,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      token,
    },
  };
  let result;

  await axios(config)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error.response.data;
    });

  return result;
};

export const logout = async () => {
  let config = {
    method: "post",
    url: "/api/logout",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };
  let result;

  await axios(config)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error.response.data;
    });

  return result;
};
