import axios from "axios";
import * as API from "./urlList";

export const getAllPromo = async () => {
  let config = {
    method: "get",
    url: API.BASE_URL + API.PATH_GET_ALL_PROMO,
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
