import axios from "axios";
import * as API from "./urlList";

export const addNegotiation = async (id_product, nego_price, access_token) => {
  let config = {
    method: "post",
    credentials: "include",
    url: API.BASE_URL + API.PATH_POST_NEGOTIATION,
    headers: {
      "Content-Type": "application/json",
      "access-token": access_token,
    },
    data: {
      id_product,
      nego_price,
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

export const checkeHasNego = async (id_product, access_token) => {
  let config = {
    method: "post",
    url: API.BASE_URL + API.PATH_POST_CHECK_HAS_NEGOTIATION,
    headers: {
      "Content-Type": "application/json",
      "access-token": access_token,
    },
    data: {
      id_product,
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

export const getSellerOffers = async (access_token) => {
  let config = {
    method: "get",
    url: API.BASE_URL + API.PATH_GET_SELLER_OFFERS,
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
