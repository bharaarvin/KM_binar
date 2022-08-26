import axios from "axios";
import * as API from "./urlList";

export const getAllProduct = async () => {
  let config = {
    method: "get",
    url: API.BASE_URL + API.PATH_GET_ALL_PRODUCT,
    headers: {
      "Content-Type": "application/json",
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

export const addProduct = async (data, access_token) => {
  let config = {
    method: "post",
    credentials: "include",
    url: API.BASE_URL + API.PATH_POST_ADD_PRODUCT,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Credentials": true,
      "access-token": access_token,
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

export const editProduct = async (data, access_token, id) => {
  let config = {
    method: "put",
    credentials: "include",
    url: API.BASE_URL + API.PATH_PUT_EDIT_PRODUCT + id,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Credentials": true,
      "access-token": access_token,
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

export const getProductByIdUser = async (access_token) => {
  let config = {
    method: "get",
    url: API.BASE_URL + API.PATH_GET_PRODUCT_BY_ID_USER,
    headers: {
      "Content-Type": "application/json",
      "access-token": access_token,
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

export const getProductById = async (id) => {
  let config = {
    method: "get",
    url: API.BASE_URL + API.PATH_GET_PRODUCT_BY_ID + id,
    headers: {
      "Content-Type": "application/json",
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

export const getProductByCategory = async (category, access_token) => {
  let config = {
    method: "get",
    url: API.BASE_URL + API.PATH_GET_PRODUCT_BY_CATEGORY + category,
    headers: {
      "Content-Type": "application/json",
      "access-token": access_token,
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
