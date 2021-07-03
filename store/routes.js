const express = require("express");
const axios = require("axios");

const routes = express.Router({
  mergeParams: true,
});

const URL_API_STORE = (id, apiKey) => {
  const tabId = `/${id}/`;
  return `${
    process.env.URL + apiKey + tabId + process.env.FORMAT + process.env.EXT
  }`;
};

const URL_STORE_PRODUCTS = (apiKey) => URL_API_STORE(2, apiKey);

routes.post("/", async (req, res, next) => {
  const apiKey = req.body.storeId;

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

routes.use(function (req, res, next) {
  res.status(404).json({
    message: "Not Found",
  });
});

module.exports = {
  routes,
};
