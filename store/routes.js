const express = require("express");
const axios = require("axios");
const _fn = require("./utils.js");
const routes = express.Router({
  mergeParams: true,
});

routes.post("/products", async (req, res, next) => {
  const apiKey = req.body.storeId;

  try {
    const response = await axios.get(_fn.URL_STORE_PRODUCTS(apiKey));
    res.status(200).json({
      products: _fn.getProducts(response.data.feed.entry),
    });
  } catch (error) {
    console.error(error);
  }
});

routes.post("/banners", async (req, res, next) => {
  const apiKey = req.body.storeId;

  try {
    const response = await axios.get(_fn.URL_STORE_BANNERS(apiKey));
    res.status(200).json({
      banners: _fn.getBanners(response.data.feed.entry),
    });
  } catch (error) {
    console.error(error);
  }
});

routes.post("/seo", async (req, res, next) => {
  const apiKey = req.body.storeId;

  try {
    const response = await axios.get(_fn.URL_STORE_SEO(apiKey));
    res.status(200).json({
      seo: _fn.getSeo(response.data.feed.entry),
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
