const express = require("express");
const axios = require("axios");

const routes = express.Router();

const URL_API_STORE = (id, apiKey) => {
  const tabId = `/${id}/`;
  return `${
    process.env.URL + apiKey + tabId + process.env.FORMAT + process.env.EXT
  }`;
};

const URL_STORE_PRODUCTS = (apiKey) => URL_API_STORE(2, apiKey);

routes.get("/", async (req, res, next) => {
  const apiKey = "1PGFAohDcXpnEar_mCoTLHXuLISmAvziR_UYSHd-GWWg";

  try {
    const response = await axios.get(URL_STORE_PRODUCTS(apiKey));
    res.status(200).json({
      products: response.data.feed.entry,
    });
  } catch (error) {
    console.error(error);
  }
});

routes.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

module.exports = {
  routes,
};
