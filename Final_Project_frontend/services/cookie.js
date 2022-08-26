import axios from "axios";

export const set = async (name, token) => {
  let config = {
    method: "post",
    url: "/api/cookies",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      cookie_name: name,
      token,
    }),
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

export const get = async () => {
  let config = {
    method: "get",
    url: "/api/cookies",
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
      result = error;
    });

  return result;
};
